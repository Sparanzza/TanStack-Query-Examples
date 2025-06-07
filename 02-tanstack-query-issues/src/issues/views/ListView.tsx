import { useState } from "react";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../../interfaces/isssue.interface";

export const ListView = () => {
  const [state, setState] = useState(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssues({ state, selectedLabels });

  const onLabelSelected = (newLabels: string) => {
    if (selectedLabels.includes(newLabels)) {
      const updatedLabels = selectedLabels.filter(
        (label) => label !== newLabels
      );
      setSelectedLabels(updatedLabels);
    } else {
      setSelectedLabels([...selectedLabels, newLabels]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <IssueList
            issues={issuesQuery.data!}
            onStateChange={setState}
            state={state}
          />
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabel={selectedLabels}
        />
      </div>
    </div>
  );
};
