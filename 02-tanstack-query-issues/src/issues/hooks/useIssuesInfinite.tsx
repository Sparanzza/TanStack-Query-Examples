import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../../actions/get-issues.actions";
import { State } from "../../interfaces/isssue.interface";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabels: string[];
}
export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      console.log("Fetching issues for page:", pageParam);
      console.log("Query key:", queryKey);


      return getIssues(state, selectedLabels, pageParam || 1);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 60,
  });

  return {
    issuesQuery,
  };
};
