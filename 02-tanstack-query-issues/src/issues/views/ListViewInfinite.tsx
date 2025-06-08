import { useState } from "react";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../../interfaces/isssue.interface";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {
  const [state, setState] = useState(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels,
  });

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
          <div className="flex flex-col justify-center items-center mb-4">
            <IssueList
              issues={issuesQuery.data?.pages.flat() ?? []}
              onStateChange={setState}
              state={state}
            />
            <div className="flex justify-between items-center">
        
              <button
                onClick={() => issuesQuery.fetchNextPage()}
                disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {issuesQuery.isFetchingNextPage ? "Loading..." : "Load More" }
              </button>
            </div>
          </div>
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
