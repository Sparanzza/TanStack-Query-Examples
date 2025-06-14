import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { FiSkipBack } from "react-icons/fi";
import { useIssue } from "../hooks/useIssue";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { GithubIssue } from "../../interfaces/isssue.interface";

interface Props {
  issue?: GithubIssue;
}

export const IssueView = ({ issue }: Props) => {
  const navigate = useNavigate();

  const params = useParams();
  const issueNumber = Number(params.issueNumber);

  const { issueQuery, commentsQuery } = useIssue(issueNumber);

  if (issueQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-52">
        <div className="loading">
          <div className="flex w-full h-52 items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (!issueQuery.data) {
    return <Navigate to="404" />;
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data!} />

      {
        commentsQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          commentsQuery.data?.map((comment) => (
            <IssueComment key={comment.id} issue={comment} />
          ))
        )
      }
    </div>
  );
};
