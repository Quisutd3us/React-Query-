import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";
import { sleep } from "../helpers/sleep";

import { Issue } from "../issues/interfaces";

const getIssuesAPI = async():Promise<Issue[]>=>{
    await sleep(3);
    const {data} = await githubAPI.get<Issue[]>("/issues")
    console.log(data)
    return data;
  };

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssuesAPI);
  return { issuesQuery };
};
  