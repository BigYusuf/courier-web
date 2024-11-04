import React from "react";
import { Link } from "react-router-dom";
import Table from "../table/Table";
import { convertTimeStamp } from "../../utils/others";
import Badge from "../badge/Badge";

const feedbackHeads = ["Date Created", "title", "Status"];

const orderStatus = {
  unanswered: "primary",
  pending: "warning",
  answered: "success",
  inactive: "danger",
};
const renderFeedbackHead = (item, index) => <th key={index}>{item}</th>;

const FeedBackByUserId = ({ feedbacks, handleFeedback, loadingFeedback }) => {
  const renderFeedbackBody = (item, index) => (
    <tr key={index}>
      <td>{convertTimeStamp(item?.createdAt)}</td>
      <td>
        <div className="pointer" onClick={() => handleFeedback(item?.id)}>
          {item?.feedbackTitle?.length > 18
            ? item?.feedbackTitle.substring(0, 18) + "..."
            : item?.feedbackTitle}
        </div>
      </td>
      <td>
        <Badge
          type={orderStatus[item.status === "pending" ? "pending" : "answered"]}
          content={item.status === "pending" ? "pending" : "answered"}
        />
      </td>
    </tr>
  );
  return (
    <div>
      <div className="card">
        <div className="card__header">
          <h3>Latest Feedback</h3>
        </div>
        <div className="card__body">
          {loadingFeedback ? (
            <>Loading Feedbacks, Please wait</>
          ) : feedbacks.length <= 0 ? (
            <>No Feedbacks from this User Yet</>
          ) : (
            <Table
              headData={feedbackHeads}
              renderHead={(item, index) => renderFeedbackHead(item, index)}
              bodyData={feedbacks}
              renderBody={(item, index) => renderFeedbackBody(item, index)}
            />
          )}
        </div>
        <div className="card__footer">
          <Link to="/feedbacks">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default FeedBackByUserId;
