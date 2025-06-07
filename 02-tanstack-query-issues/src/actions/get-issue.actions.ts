import { githubApi } from "../api/github.api";
import { sleep } from "../helpers/sleep";
import { GithubIssue } from "../interfaces/isssue.interface";

export const getIssue = async (isssueNumber: number): Promise<GithubIssue> => {
  await sleep(2000);
  const { data } = await githubApi.get<GithubIssue>(`/issues/${isssueNumber}`);
  console.log(data);
  return data;
};
