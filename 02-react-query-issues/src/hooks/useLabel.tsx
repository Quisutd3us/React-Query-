import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "../API/githubAPI";
import { Label } from "../issues/interfaces/label";
import { sleep } from "../helpers/sleep";

const getLabelsAPI = async (): Promise<Label[]> => {
  await sleep(3);
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const useLabel = () => {
  const labelsQuery = useQuery(["labels"], getLabelsAPI, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 71502270,
        node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
        name: "Component: Build Infrastructure",
        color: "f9d0c4",
        default: false,
        description: 'this a description' 
      },
      {
        id: 71504452270,
        node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
        name: "Component: Build Infrastructure",
        color: "ccd0c4",
        default: false,
        description: 'loading..',
      }
    ],
  });
  return labelsQuery;
};
