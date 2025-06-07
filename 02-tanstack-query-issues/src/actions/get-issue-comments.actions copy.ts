import { githubApi } from "../api/github.api";
import { GithubIssue } from "../interfaces/isssue.interface";

export const getIssueComments = async (isssueNumber: number): Promise<GithubIssue[]> => {
  const { data } = await githubApi.get<GithubIssue[]>(`/issues/${isssueNumber}/comments`);
  return data;
};
