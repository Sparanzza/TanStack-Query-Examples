import { githubApi } from "../api/github.api";
import { sleep } from "../helpers/sleep";
import { GithubIssue, State } from "../interfaces/isssue.interface";

export const getIssues = async (
  state: State,
  selectedLabels: string[],
  page: number
): Promise<GithubIssue[]> => {
  await sleep(2000);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (selectedLabels.length > 0) {
    params.append("labels", selectedLabels.join(","));
  }

  params.append("page", `${page}`);
  params.append("per_page", "5");

  console.log(
    "getIssues called with state:",
    state,
    "and selectedLabels:",
    selectedLabels
  );

  const { data } = await githubApi.get<GithubIssue[]>("/issues", { params });
  return data;
};
