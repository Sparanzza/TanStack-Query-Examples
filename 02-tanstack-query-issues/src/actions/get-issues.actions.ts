import { useSearchParams } from "react-router-dom";
import { githubApi } from "../api/github.api";
import { sleep } from "../helpers/sleep";
import { GithubIssue, State } from "../interfaces/isssue.interface";

export const getIssues = async (state: State): Promise<GithubIssue[]> => {
  await sleep(2000);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  const { data } = await githubApi.get<GithubIssue[]>("/issues", { params });
  return data;
};
