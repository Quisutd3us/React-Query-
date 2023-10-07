import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../API/githubAPI";
import { Label } from "../interfaces/label";

const getLabelsAPI = async (): Promise<Label[]> => {
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const LabelPicker = () => {
  const labelsQuery = useQuery(["labels"], getLabelsAPI, {
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <span
        className="badge rounded-pill m-1 label-picker"
        style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}
      >
        Primary
      </span>
    </>
  );
};
