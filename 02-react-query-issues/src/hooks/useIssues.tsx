import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";

import { Issue, State } from "../issues/interfaces";
import { sleep } from "../helpers/sleep";

interface Props {
  labels: string[];
  state?: State;
}

const getIssuesAPI = async (
  labels: string[] = [],
  state?: State
): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }
  sleep(2);
  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const issuesQuery = useQuery(["issues", { labels, state }], () =>
    getIssuesAPI(labels, state)
  );
  return { issuesQuery };
};
