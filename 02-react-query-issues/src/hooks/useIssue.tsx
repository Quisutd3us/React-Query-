import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";
import { Issue } from "../issues/interfaces";

const getissueAPI = async (issueId: number): Promise<Issue> => {
  const { data } = await githubAPI.get<Issue>(`/issues/${issueId}`);
 
  return data;
};


export const useIssue =(issueNumber:number)=>{
    const issueQuery =useQuery(
        ["issue",issueNumber],
        ()=>getissueAPI(issueNumber)
    )
    return { issueQuery };
}