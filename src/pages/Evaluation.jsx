import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeStamp } from "../utils/others";
import Table from "../components/table/Table";
import { useNavigate } from "react-router-dom";
import { setEvalUser } from "../redux/slice/auth";

const latestOrders = {
  head: ["user", " nation", "date"],
};

const Evaluation = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [selectEvaluate, setSelectEvaluate] = useState("");
  // const Users = useSelector((state) => state?.auth?.users);

  // const allUsers = Users.filter((item) => item?.role === "user");

  // const EvalCard = ({ active, icon, subTitle, title, onClick }) => {
  //   return (
  //     <div
  //       className={active ? "evaluationCard active" : "evaluationCard"}
  //       onClick={onClick}
  //     >
  //       <div className="evaluationCardIcon">
  //         <i className={icon}></i>
  //       </div>
  //       <div className="evaluationCardInfo">
  //         <h4>{title}</h4>
  //         <span>{subTitle}</span>
  //       </div>
  //     </div>
  //   );
  // };
  // const evalData = [
  //   {
  //     id: 1,
  //     title: "house Info",
  //     icon: "bx bx-home",
  //     subTitle: "Collect house hold information",
  //   },
  //   {
  //     id: 2,
  //     title: "family Info",
  //     icon: "bx bx-user",
  //     subTitle: "Collect Family related Information",
  //   },
  //   {
  //     id: 3,
  //     title: "support Info",
  //     icon: "bx bx-support",
  //     subTitle: "Collect Support and help related information",
  //   },
  // ];

  // const renderNewUserHead = (item, index) => <th key={index}>{item}</th>;

  // const handleEval = (item) => {
  //   dispatch(setEvalUser(item));
  //   navigate(`/evaluations/${item?.id}`);
  // };
  // const renderNewUserBody = (item, index) => (
  //   <tr key={index} className="pointer" onClick={() => handleEval(item)}>
  //     <td>{item?.lastName + " " + item?.firstName}</td>
  //     <td>{item?.nation}</td>
  //     <td>{convertTimeStamp(item?.createdAt)}</td>
  //   </tr>
  // );
  // return (
  //   <div className="evaluationContainer">
  //     <div className={selectEvaluate ? "coll-4 hide" : "coll-4"}>
  //       {evalData.map((item) => (
  //         <EvalCard
  //           key={item?.id}
  //           title={item?.title}
  //           icon={item?.icon}
  //           active={selectEvaluate === item?.title ? true : false}
  //           subTitle={item?.subTitle}
  //           onClick={() => setSelectEvaluate(item?.title)}
  //         />
  //       ))}
  //     </div>
  //     {selectEvaluate && (
  //       <div className="coll-8">
  //         <button className="card__back" onClick={() => setSelectEvaluate("")}>
  //           Back
  //         </button>
  //         <div className="card">
  //           <div className="card__header">
  //             <h3>Select a user</h3>
  //             <h3>{selectEvaluate}</h3>
  //           </div>
  //           <div className="card__body">
  //             {allUsers.length <= 0 ? (
  //               <>No User ... </>
  //             ) : (
  //               <Table
  //                 headData={latestOrders.head}
  //                 renderHead={(item, index) => renderNewUserHead(item, index)}
  //                 bodyData={allUsers}
  //                 renderBody={(item, index) => renderNewUserBody(item, index)}
  //               />
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return(
    <div>qqqqq</div>
  )
};

export default Evaluation;
