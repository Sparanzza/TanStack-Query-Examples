import { GithubIssue, State } from "../../interfaces/isssue.interface";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: GithubIssue[];
  onStateChange: (newState: State) => void;
  state: State;
}

export const IssueList: React.FC<Props> = ({
  issues,
  onStateChange,
  state,
}: Props) => {
  return (
    <>
      <div className="flex gap-4">
        <button onClick={() => onStateChange(State.All)} className={`btn ${state === State.All ? "active" : ""}`}>
          All
        </button>
        <button onClick={() => onStateChange(State.Close)} className={`btn ${state === State.Close ? "active" : ""}`}>
          Closed
        </button>
        <button onClick={() => onStateChange(State.Open)} className={`btn ${state === State.Open ? "active" : ""}`}>
          Open
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
