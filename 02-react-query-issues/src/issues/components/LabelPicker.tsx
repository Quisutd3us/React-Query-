import { useLabel } from "../../hooks/useLabel";

export const LabelPicker = () => {
  const labels = useLabel();
  if (labels.isLoading) return <h1>Is loading....</h1>;
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
