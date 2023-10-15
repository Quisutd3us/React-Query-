import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";

import { Issue } from "../issues/interfaces";

const getIssuesAPI = async():Promise<Issue[]>=>{
   
    const {data} = await githubAPI.get<Issue[]>("/issues")
    return data;
  };

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssuesAPI);
  return { issuesQuery };
};
  