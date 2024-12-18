import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Badge, LoadingBox, CompleteInput, ModalOptions } from "../components";
import { useGetUsersQuery } from "../redux/slice/user";

const customerTableHead = ["", "name", "email", "country", "status", "action"];

const Customers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  //const [allUsers, setAllUsers] = useState([]);
  const [role, setRole] = useState("");
  const [nation, setNation] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: customerData, isLoading: userLoading } = useGetUsersQuery();

  // console.log(customerData?.data);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // if (role === "") {
      //   toast.error("Role is required");
      //   setLoading(false);
      //   return;
      // } else if (nation === "") {
      //   toast.error("Nation is required");
      //   setLoading(false);
      //   return;
      // }
      // //create new Manager
      // const newManager = await ProjectDataService.addManager({
      //   name: selectedUser?.firstName + " " + selectedUser?.lastName,
      //   userId: selectedUser?.id,
      //   nation: nation,
      //   role: role,
      //   lastEvent: "",
      //   lastFeedback: "",
      //   feedbacksAdded: 0,
      //   eventsAdded: 0,
      //   usersAdded: 0,
      //   managersAdded: 0,
      //   createdBy: managerProfile?.id,
      //   createdAt: serverTimestamp(),
      //   updatedAt: "",
      // });
      // //update user role to staff
      // if (newManager) {
      //   await ProjectDataService.updateUser(selectedUser?.id, {
      //     role: "staff",
      //     updatedAt: serverTimestamp(),
      //   });
      // }
      // if (newManager) {
      //   //update creator profile
      //   await ProjectDataService.updateManager(managerProfile?.id, {
      //     managersAdded: managerProfile?.managersAdded + 1,
      //     updatedAt: serverTimestamp(),
      //   });
      // }
      // setLoading(false);
      // setNation("");
      // setRole("");
      // setOpenModal(!openModal);
      // toast.success("New " + role + " added");
    } catch (error) {
      setNation("");
      setRole("");
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
      setOpenModal(!openModal);
    }
  };
  const handleCancel = () => {
    setRole("");
    setNation("");
    setOpenModal(!openModal);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td className="pointer">{index + 1}</td>
      <td className="pointer" onClick={() => navigate(`/users/${item?.id}`)}>
        {item?.lastName + " " + item?.firstName}
      </td>
      <td className="pointer" onClick={() => navigate(`/users/${item?.id}`)}>
        {item?.email}
      </td>

      <td className="pointer" onClick={() => navigate(`/users/${item?.id}`)}>
        {item?.country}
      </td>
      <td className="pointer" onClick={() => navigate(`/users/${item?.id}`)}>
        <Badge
          type={
            item.status === true || item.status === "active"
              ? "success"
              : "warning"
          }
          content={
            item.status === true || item.status === "active"
              ? "verified"
              : "unverified"
          }
        />
      </td>
      <td>
        <button
          onClick={() => navigate(`/users/${item?.id}`)}
          className="card__button "
        >
          View
        </button>
      </td>
    </tr>
  );

  // let filteredItems = [];
  let filteredItems = customerData?.data
    ? customerData?.data?.filter(
        (item) =>
          item?.firstName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.lastName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(search?.toLowerCase())
      )
    : [];
  const limit = "10";
  const initDataShow =
    limit && filteredItems
      ? filteredItems.slice(0, Number(limit))
      : filteredItems;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range = [];

  if (limit !== undefined) {
    let page = Math.floor(filteredItems.length / Number(limit));
    pages = filteredItems.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(filteredItems.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div className="containerr" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">users</h2>

        <div className="page-options">
          <div className="page-search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
            />
            <i className="bx bx-search"></i>
          </div>
          {/* 
          <div className="page-filter">
            <CSVLink data={filteredItems}>
              <i className="bx bx-filter"></i>
            </CSVLink>
          </div>
          <div className="page-filter" onClick={() => navigate("/adduser")}>
            <i className="bx bx-plus"></i>
          </div> */}
        </div>
      </div>
      <div className="table-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
        />
        <i className="bx bx-search"></i>
      </div>

      {openModal && (
        <ModalOptions
          handleCancel={handleCancel}
          title={"Create Manager/ Admin"}
          btnText={"Save"}
          cancel
          handleOption={handleSubmit}
        >
          <div className="flexx">
            <span className="desc">
              Make {selectedUser?.firstName + " "} a staff
            </span>
            <div className="row1">
              <div className="coll-12">
                <CompleteInput
                  name="Role"
                  title={"New Role"}
                  select
                  data={[
                    { id: 1, value: "admin", label: "Admin" },
                    { id: 2, value: "staff", label: "Staff" },
                  ]}
                  dataLabel={role}
                  cancel={""}
                  value={role}
                  type="text"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <span className="small">Welcome aboard</span>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {userLoading ? (
                <div>
                  <LoadingBox circle={true} />
                </div>
              ) : (
                // ) : allUsers.length <= 0 ? (
                //   <div>No Users</div>
                <div>
                  <div className="table-wrapper">
                    <table>
                      {customerTableHead && renderHead ? (
                        <thead>
                          <tr>
                            {customerTableHead.map((item, index) =>
                              renderHead(item, index)
                            )}
                          </tr>
                        </thead>
                      ) : null}
                      {filteredItems && renderBody ? (
                        <tbody>
                          {filteredItems?.map((item, index) =>
                            renderBody(item, index)
                          )}
                        </tbody>
                      ) : null}
                    </table>
                  </div>
                  {pages > 1 ? (
                    <div className="table__pagination">
                      {range.map((item, index) => (
                        <div
                          key={index}
                          className={`table__pagination-item ${
                            currPage === index ? "active" : ""
                          }`}
                          onClick={() => selectPage(index)}
                        >
                          {item + 1}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
