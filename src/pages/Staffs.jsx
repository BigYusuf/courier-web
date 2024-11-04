import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

import { fetchManagers } from "../utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { CompleteInput, ModalOptions } from "../components";

const staffTableHead = [
  "",
  "name",
  "role",
  "feedbacks",
  "events created",
  "nation",
  "action",
];

const Staffs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const managerProfile = useSelector((state) => state?.auth?.manager);

  const allManagers = useSelector((state) => state?.auth?.managers);
  const fetchManager = () => {
    fetchManagers(dispatch, managerProfile);
  };

  useEffect(() => {
    setLoading(true);
    fetchManager();
    setLoading(false);
  }, []);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const handleLink = (item) => {
    navigate(`/managers/${item?.id}`);
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="pointer" onClick={() => handleLink(item)}>
          {item?.name}
        </div>
      </td>
      <td>
        <div className="pointer" onClick={() => handleLink(item)}>
          {item?.role}
        </div>
      </td>
      <td>{item?.feedbacksAdded}</td>
      <td>{item?.eventsAdded}</td>
      <td>
        <div className="pointer" onClick={() => handleLink(item)}>
          {item?.nation}
        </div>
      </td>
      <td>
        <button onClick={() => handleLink(item)} className="card__button">
          View
        </button>
      </td>
    </tr>
  );

  const [newManager, setNewManager] = useState({});

  let filteredItems = allManagers?.filter(
    (item) =>
      item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      item?.nation?.toLowerCase()?.includes(search?.toLowerCase()) ||
      item?.role?.toLowerCase()?.includes(search?.toLowerCase())
  );

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
    <div className="container" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">staffs</h2>

        <div className="page-options">
          <div className="page-search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here..."
            />
            <i className="bx bx-search"></i>
          </div>
          <div className="page-filter">
            <CSVLink data={filteredItems}>
              <i className="bx bx-filter"></i>
            </CSVLink>
          </div>
          <div className="page-filter" onClick={() => setOpenModal(true)}>
            <i className="bx bx-plus"></i>
          </div>
        </div>
      </div>
      <div className="table-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search here..."
        />
        <i className="bx bx-search"></i>
      </div>
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Create Manager"}
          btnText={"Save"}
          cancel
          handleOption={() => setOpenModal(!openModal)}
        >
          <div className="flexx">
            <span className="desc">Access to unlimited Possibilities</span>
            {!newManager ? (
              <>
                <div className="row1">
                  <div className="coll-6">
                    <CompleteInput name="Name" title={"Name"} />
                  </div>
                  <div className="coll-6">
                    <CompleteInput name="Region" title={"Region"} select />
                  </div>
                  <div className="coll-6">
                    <CompleteInput name="Name" title={"Name"} />
                  </div>
                </div>

                <span className="small">Region Cannot be changed</span>
              </>
            ) : (
              <div className="managerList">
                {allManagers.map((item) => (
                  <div className="managerItem">{item.name}</div>
                ))}
              </div>
            )}
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {loading ? (
                <div>Loading, Please Wait </div>
              ) : allManagers.length <= 0 ? (
                <div>No Staff </div>
              ) : (
                <div>
                  <div className="table-wrapper">
                    <table>
                      {staffTableHead && renderHead ? (
                        <thead>
                          <tr>
                            {staffTableHead.map((item, index) =>
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
