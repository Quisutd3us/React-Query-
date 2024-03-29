import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";

import { Issue } from "../issues/interfaces";
import { sleep } from "../helpers/sleep";

export const getissueAPI = async (issueId: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubAPI.get<Issue>(`/issues/${issueId}`);
  return data;
};

export const getcommentsAPI = async(issueId: number):Promise<Issue[]>=>{
  await sleep(2);
  const {data} = await githubAPI.get<Issue []>(`/issues/${issueId}/comments`);
  return data
};

export const useIssue =(issueNumber:number)=>{
    const issueQuery = useQuery(["issue", issueNumber], () =>
      getissueAPI(issueNumber)
    );
    const commentsQuery = useQuery(
      ["issues", issueNumber, "comments"], 
      () =>
      getcommentsAPI(issueNumber),
      {
        enabled: issueQuery.data !== undefined,
      }
    );
    return { issueQuery, commentsQuery };
}