import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions/get-issues.actions";
import { State } from "../../interfaces/isssue.interface";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabels: string[];
}
export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState<number | null>(null);

  useEffect(() => {
    // Reset page to 1 when state or selectedLabels change
    setPage(1);
  }, [state, selectedLabels]);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page || 1),
    staleTime: 1000 * 60 * 60,
  });

  const nextPage = () => {
    if (issuesQuery.data && issuesQuery.data.length > 0) {
      setPage((prevPage) => (prevPage !== null ? prevPage + 1 : 2));
    }
  };

  const previousPage = () => {
    if (page && page > 1) {
      setPage(page - 1);
    }
  };

  return {
    issuesQuery,

    // actions
    nextPage,
    previousPage,

    // Getters
    page,
  };
};
