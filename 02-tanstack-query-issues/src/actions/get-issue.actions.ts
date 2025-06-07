import { githubApi } from "../api/github.api";
import { GithubIssue } from "../interfaces/isssue.interface";

export const getIssue = async (isssueNumber: number): Promise<GithubIssue> => {
  // await sleep(2000);
  const { data } = await githubApi.get<GithubIssue>(`/issues/${isssueNumber}`);
  return data;
};
