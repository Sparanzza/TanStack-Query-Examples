import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {

  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <div className="flex justify-center items-center">
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className="animate-fadeIn flex flex-wrap gap-2">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          style={{ border: `1px solid #${label.color}`, color: "#ffccd3" }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
