import { useQuery } from "@tanstack/react-query";
import { getIssue } from "../../actions/get-issue.actions";
import { getIssueComments } from "../../actions/get-issue-comments.actions copy";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });

  const commentsQuery = useQuery({
    queryKey: ["issues", issueQuery.data?.number, "comments"],
    queryFn: () => getIssueComments(issueQuery.data?.number || 0),
    staleTime: 1000 * 60 * 60,
    retry: 2,
    enabled: issueQuery.isSuccess && issueQuery.data?.comments > 0
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
