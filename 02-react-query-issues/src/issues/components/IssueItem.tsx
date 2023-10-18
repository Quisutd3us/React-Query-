import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";

import { Issue, State } from "../interfaces";
import { getcommentsAPI, getissueAPI } from "../../hooks/useIssue";
interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const { title, number, user, state, comments,labels } = issue;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // preFetchData hace el llamado http una vez se dispara el evento 

  const preFetchData = () => {
    queryClient.prefetchQuery(["issue", issue.number], () =>
      getissueAPI(issue.number)
    );
    queryClient.prefetchQuery(["issue", issue.number, "comments"], () =>
      getcommentsAPI(issue.number)
    );
  };

  // setQueryData me carga la info en el cache sin llamados http solo cuando realmente se pide hace un llamado para ver si esta actualizado
  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue);
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      // onMouseEnter={preFetchData}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo
            size={30}
            color="red"
          />
        ) : (
          <FiCheckCircle
            size={30}
            color="green"
          />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            {`#${number} opened 2 days ago by `}
            <span className="fw-bold">{user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="avatar"
          />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
      <div className="card-body d-flex flex-row  gap-2 p-2 bg-black">
        {labels.map((label) => (
          <span
            key={label.id}
            className="badge rounded-pill"
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
};
