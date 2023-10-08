import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";
import { Label } from "../issues/interfaces/label";
import { sleep } from "../helpers/sleep";

const getLabelsAPI = async (): Promise<Label[]> => {
  await sleep(5);
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const useLabel = () => {
  const labelsQuery = useQuery(["labels"], getLabelsAPI, {
    staleTime: 1000 * 60 * 60,
  });
  return labelsQuery;
};
