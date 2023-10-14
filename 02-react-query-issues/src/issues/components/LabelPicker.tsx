import { FC } from "react";
import { useLabel } from "../../hooks/useLabel";

import { LoadingIcon } from "../../shared/components/LoadingIcon";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker:FC<Props> = ({onChange, selectedLabels}) => {
  const labels = useLabel();
  if (labels.isLoading) return <LoadingIcon/>;
  return (
    <>
      {labels.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "active-label" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
