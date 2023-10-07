import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";
import { Label } from "../issues/interfaces/label";

const getLabelsAPI = async (): Promise<Label[]> => {
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const useLabel = () => {
  const labelsQuery = useQuery(["labels"], getLabelsAPI);
  return labelsQuery;
};
