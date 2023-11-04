import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";

import { Issue, State } from "../issues/interfaces";
import { sleep } from "../helpers/sleep";
import { useState } from "react";

interface Props {
  labels: string[];
  state?: State;
  page?:number
}

const getIssuesAPI = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }
  params.append("page", page.toString());
  params.append("per_page", "5");
  sleep(2);
  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1);
  const issuesQuery = useQuery(["issues", { labels, state }, page], () =>
    getIssuesAPI({ labels, state, page })
  );
  // pagination nextPage
  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };
  // pagination previousPage
  const previousPage = (): void => {
    if (page > 1) setPage(page - 1);
    return;
  };

  return {
    //properties
    issuesQuery,
    page,
    //methods
    nextPage,
    previousPage,
  };
};
