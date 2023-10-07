import { useLabel } from "../../hooks/useLabel";


export const LabelPicker = () => {
  const labels = useLabel();
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
