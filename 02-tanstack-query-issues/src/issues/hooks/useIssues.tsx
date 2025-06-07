import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions/get-issues.actions";
import { State } from "../../interfaces/isssue.interface";

interface Props {
  state: State;
  selectedLabels: string[];
}
export const useIssues = ({ state, selectedLabels }: Props) => {
  console.log("useIssues called with state:", state);
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels }],
    queryFn: () => getIssues(state, selectedLabels),
    staleTime: 1000 * 60 * 60,
  });

  return {
    issuesQuery,
  };
};
