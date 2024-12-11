import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge, LoadingBox, CompleteInput, ModalOptions } from "../components";
import { useGetStaffsQuery } from "../redux/slice/user";
import { useRegisterStaffMutation } from "../redux/slice/auth";

const customerTableHead = [
  "",
  "name",
  "email",
  "role",
  "country",
  "status",
  "action",
];

const Staffs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    country: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: staffData,
    isFetching: staffLoading,
    refetch,
  } = useGetStaffsQuery();

  const [registerStaff] = useRegisterStaffMutation();
  // console.log(staffData?.data);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData?.firstName === "") {
        toast.error("First Name is required");
        setLoading(false);
        return;
      } else if (formData?.lastName === "") {
        toast.error("Last Name is required");
        setLoading(false);
        return;
      } else if (formData?.email === "") {
        toast.error("Email is required");
        setLoading(false);
        return;
      } else if (formData?.password === "") {
        toast.error("Password is required");
        setLoading(false);
        return;
      } else if (formData?.role === "") {
        toast.error("Role is required");
        setLoading(false);
        return;
      }

      const regStaff = await registerStaff(formData).unwrap();

      // console.log(regStaff);
      if (regStaff?.success) {
        toast.success("Staff added");
      } else {
        toast.error(regStaff?.error?.message);
      }
      refetch();
      setLoading(false);
      setFormData(initialData);
      setOpenModal(!openModal);
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
      setOpenModal(!openModal);
    }
  };
  const handleCancel = () => {
    setFormData(initialData);
    setOpenModal(!openModal);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td className="pointer">{index + 1}</td>
      <td className="pointer" onClick={() => navigate(`/staffs/${item?.id}`)}>
        {item?.lastName + " " + item?.firstName}
      </td>
      <td className="pointer" onClick={() => navigate(`/staffs/${item?.id}`)}>
        {item?.email}
      </td>
      <td className="pointer" onClick={() => navigate(`/staffs/${item?.id}`)}>
        {item?.role}
      </td>

      <td className="pointer" onClick={() => navigate(`/staffs/${item?.id}`)}>
        {item?.country}
      </td>
      <td className="pointer" onClick={() => navigate(`/staffs/${item?.id}`)}>
        <Badge
          type={
            item.status === true || item.status === "active"
              ? "success"
              : "warning"
          }
          content={
            item.status === true || item.status === "active"
              ? "active"
              : "disabled"
          }
        />
      </td>
      <td>
        <button
          onClick={() => navigate(`/staffs/${item?.id}`)}
          className="card__button "
        >
          View
        </button>
      </td>
    </tr>
  );

  // let filteredItems = [];
  let filteredItems = staffData?.staffs
    ? staffData?.staffs?.filter(
        (item) =>
          item?.firstName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.lastName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(search?.toLowerCase())
      )
    : [];
  const limit = "10";
  const initDataShow =
    limit && filteredItems
      ? filteredItems?.slice(0, Number(limit))
      : filteredItems;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range = [];

  if (limit !== undefined) {
    let page = Math.floor(filteredItems?.length / Number(limit));
    pages = filteredItems?.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(filteredItems?.slice(start, end));

    setCurrPage(page);
  };

  const handleInputStaffChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="containerr" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">Staffs</h2>

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

          {/* <div className="page-filter">
            <CSVLink data={filteredItems}>
              <i className="bx bx-filter"></i>
            </CSVLink>
          </div> */}
          <div className="page-filter" onClick={() => setOpenModal(true)}>
            <i className="bx bx-plus"></i>
          </div>
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
          title={"Create Staff/ Admin"}
          btnText={"Save"}
          cancel
          handleOption={handleSubmit}
        >
          <div className="flexx">
            {/* <span className="desc">
              Make {selectedUser?.firstName + " "} a staff
            </span> */}
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="firstName"
                  title={"First Name"}
                  cancel={""}
                  type="text"
                  value={formData?.firstName}
                  dataLabel={formData?.firstName}
                  onChange={handleInputStaffChange}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="lastName"
                  title={"Last Name"}
                  cancel={""}
                  type="text"
                  value={formData?.lastName}
                  dataLabel={formData?.lastName}
                  onChange={handleInputStaffChange}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="email"
                  title={"Email"}
                  cancel={""}
                  type="text"
                  value={formData?.email}
                  dataLabel={formData?.email}
                  onChange={handleInputStaffChange}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="password"
                  title={"Password"}
                  cancel={""}
                  type="text"
                  value={formData?.password}
                  dataLabel={formData?.password}
                  onChange={handleInputStaffChange}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="role"
                  title={"New Role"}
                  select
                  data={[
                    { id: 1, value: "admin", label: "Admin" },
                    { id: 2, value: "staff", label: "Staff" },
                  ]}
                  dataLabel={formData?.role}
                  cancel={""}
                  value={formData?.role}
                  type="text"
                  onChange={handleInputStaffChange}
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
              {staffLoading ? (
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

export default Staffs;
