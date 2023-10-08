import { useLabel } from "../../hooks/useLabel";

import { LoadingIcon } from "../../shared/components/LoadingIcon";

export const LabelPicker = () => {
  const labels = useLabel();
  if (labels.isLoading) return <LoadingIcon/>;
  return (
    <>
      {labels.data?.map((label) => (
        <span
          key={label.id}
          className="badge rounded-pill m-1 label-picker"
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
