import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithubIssue, State } from "../../interfaces/isssue.interface";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue } from "../../actions/get-issue.actions";
import { getIssueComments } from "../../actions/get-issue-comments.actions copy";
import { timeSince } from "../../helpers/time-since";

interface Props {
  issue: GithubIssue;
}
export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    console.log("Prefetching data for issue:", issue.number);
    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: 2,
    });

    queryClient.prefetchQuery({
      queryKey: ["issues", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: 2,
    });
  };

  const presetData = () => {
    console.log("Prefetching data for issue:", issue.number);
    queryClient.setQueryData(["issues", issue.number], issue, {
      // updatedAt: Date.now() + 1000 * 60, // 1 hour
    });
  };

  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Close ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="gray" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #{issue.number} {timeSince(issue.created_at)} ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{
                border: `1px solid #${label.color}`,
                color: "#ffccd3",
                backgroundColor: `#${label.color}33`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
