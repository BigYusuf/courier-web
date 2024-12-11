import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { LoadingBox, CompleteInput, ModalOptions } from "../components";
import {
  useAddContactMutation,
  useGetContactsQuery,
} from "../redux/slice/contact";
import { countryData } from "../data/countries";

const customerTableHead = ["", "name", "email", "state", "country", "action"];

const Contacts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [selectedUser, setSelectedUser] = useState({});

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: contactData,
    isFetching: contactLoading,
    refetch,
  } = useGetContactsQuery();

  const [addContact] = useAddContactMutation();
  const initialValues = {
    name: "",
    email: "",
    country: "",
    continent: "",
    address: "",
    state: "",
    city: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = {
        name: formData?.name,
        email: formData?.email,
        city: formData?.city,
        state: formData?.state,
        country: formData?.country,
        continent: formData?.continent,
        phone: formData?.phone,
        address: formData?.address,
        status: "active",
      };
      if (!formData?.name) {
        toast.error("Contact Name/ Username is required");
        return;
      }
      // console.log(payload);
      const addcont = await addContact(payload).unwrap();

      if (addcont?.success) {
        refetch();
        setFormData(initialValues);
        setOpenModal(!openModal);
        setLoading(false);
        toast.success("Contact Created Success");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message ? error?.message : "Error occured");
      setLoading(false);
    }
  };
  const handleInputContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialValues);

    setOpenModal(!openModal);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td className="pointer">{index + 1}</td>
      <td className="pointer" onClick={() => navigate(`/contacts/${item?.id}`)}>
        {item?.name}
      </td>
      <td className="pointer" onClick={() => navigate(`/contacts/${item?.id}`)}>
        {item?.email}
      </td>

      <td className="pointer" onClick={() => navigate(`/contacts/${item?.id}`)}>
        {item?.state}
      </td>
      <td className="pointer" onClick={() => navigate(`/contacts/${item?.id}`)}>
        {item?.country}
      </td>

      <td>
        <button
          onClick={() => navigate(`/contacts/${item?.id}`)}
          className="card__button "
        >
          View
        </button>
      </td>
    </tr>
  );

  // let filteredItems = [];
  let filteredItems = contactData?.contacts
    ? contactData?.contacts?.filter(
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
            */}
          <div className="page-filter" onClick={() => setOpenModal(!openModal)}>
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
          title={"Create Contact"}
          btnText={"Save"}
          cancel
          loading={loading}
          handleOption={handleAddContact}
        >
          <div className="flexx">
            <div className="row1">
              <div className="coll-12">
                <CompleteInput
                  name="email"
                  title={"Email"}
                  cancel={""}
                  type="text"
                  value={formData?.email}
                  dataLabel={formData?.email}
                  onChange={handleInputContactChange}
                />
              </div>
              <div className="coll-12">
                <CompleteInput
                  name="country"
                  title={"Country"}
                  select
                  data={countryData}
                  dataLabel={formData?.country}
                  value={formData?.country}
                  cancel={""}
                  type="text"
                  onChange={handleInputContactChange}
                />
              </div>
              <div className="coll-12">
                <CompleteInput
                  name="name"
                  title={"Name"}
                  cancel={""}
                  type="text"
                  value={formData?.name}
                  dataLabel={formData?.name}
                  onChange={handleInputContactChange}
                />
              </div>
              <div className="coll-12">
                <CompleteInput
                  name="phone"
                  title={"Phone"}
                  dataLabel={formData?.phone}
                  cancel={""}
                  type="text"
                  value={formData?.phone}
                  onChange={handleInputContactChange}
                />
              </div>
              <div className="coll-12">
                <CompleteInput
                  name="address"
                  title={"Address"}
                  dataLabel={formData?.address}
                  cancel={""}
                  type="text"
                  value={formData?.address}
                  onChange={handleInputContactChange}
                />
              </div>
              <div className="coll-12">
                <CompleteInput
                  name="state"
                  title={"State"}
                  dataLabel={formData?.state}
                  cancel={""}
                  type="text"
                  value={formData?.state}
                  onChange={handleInputContactChange}
                />
              </div>
            </div>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {contactLoading ? (
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

export default Contacts;
