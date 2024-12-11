import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { convertTimeStamp } from "../utils/others";
import { LoadingBox, CompleteInput, ModalOptions } from "../components";

import {
  useAddPackageMutation,
  useGetPackagesQuery,
} from "../redux/slice/packages";

const packageTableHead = [
  "",
  "Title",
  "zone",
  "continent",
  "date",
  "status",
  "action",
];

const Packages = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data: packageData, isLoading: packageLoad } =
  //   useGetPackagesQuery();
  // console.log(packageData);
  const [search, setSearch] = useState("");
  const [packageForm, setPackageForm] = useState({
    continent: "",
    countries: "",
    title: "",
    zone: "",
    description: "",
  });
  const [loadingPackage, setLoadingPackage] = useState(false);
  const [file, setFile] = useState("");

  //get user profile or staff profile
  const myProfile = useSelector((state) => state?.auth?.profile);

  const initialValues = {
    page: 1,
    limit: 20,
    search: "",
    category: "",
    sort: "sales",
    zone: "",
    continent: "",
    rate: "",
    description: "",
    countries: "",
    minWeight: "",
    maxWeight: "",
    title: "",
    status: "active",
  };
  const initialPagination = {
    next: ">",
    prev: "<",
    first: "<<<",
    last: ">>>",
  };
  const [formPagination, setFormPagination] = useState(initialPagination);
  // const [formData, setFormData] = useState(initialValues);
  // const [openFilter, setOpenFilter] = useState(false);
  // // const [LoadProducts, setLoadProducts] = useState([]);
  // const minRef = useRef();
  // const maxRef = useRef();
  const [addPackage] = useAddPackageMutation();
  const {
    data: packagesData,
    isLoading: packageLoad,
    isSuccess: packageSuccess,
    refetch,
  } = useGetPackagesQuery();
  // {
  //   search: formData.search,
  //   page: formData.page,
  //   limit: formData.limit,
  //   sort: formData.sort,
  //   category: formData.category,
  //   zone: formData.zone,
  //   platform: formData.platform,
  //   min: minRef?.current?.value,
  //   max: maxRef?.current?.value,
  // },
  //   [packageForm, minRef, maxRef]
  // );
  // const allPackages = []; // useSelector((state) => state.packages.packages);
  // console.log(packagesData);

  const handleInputPackageChange = (e) => {
    const { name, value } = e.target;
    setPackageForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePackage = (id) => {
    //navigate to Package
    navigate("/mypackages/" + id);
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      setLoadingPackage(true);

      let payload = {
        title: packageForm?.title,
        description: packageForm?.description,
        zone: packageForm?.zone,
        countries: packageForm?.countries,
        continent: packageForm?.continent,
        status: "active",
      };
      const addpack = await addPackage(payload).unwrap();
      // fetchPackages();
      if (addpack?.success) {
        refetch();
        setPackageForm(initialValues);
        setOpenModal(!openModal);
        setLoadingPackage(false);
        toast.success("Package Created Success");
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingPackage(false);
    }
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="pointer" onClick={() => handlePackage(item?.id)}>
          {item?.title}
        </div>
      </td>
      <td>{item?.zone}</td>
      <td>{item?.continent}</td>
      <td>{convertTimeStamp(item?.createdAt)}</td>
      <td>
        <div
          className={
            item?.status === "active"
              ? "status_green pointer"
              : "status_blue pointer"
          }
          onClick={() => handlePackage(item?.id)}
        >
          {item?.status}
        </div>
      </td>
      <td>
        <button
          onClick={() => handlePackage(item?.id)}
          className="card__button"
        >
          View
        </button>
      </td>
    </tr>
  );

  let filteredItems = packagesData?.packages
    ? packagesData?.packages?.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.zone?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.countries?.toLowerCase()?.includes(search?.toLowerCase())
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

  return (
    <div className="containerr" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">Packages</h2>

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
          title={"Create Package"}
          btnText={"Save"}
          cancel={"Cancel"}
          handleOption={handleAddPackage}
          loading={loadingPackage}
        >
          <div className="flexx">
            {/* <span className="desc">Access to unlimited Possibilities</span> */}
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="title"
                  title={"Title"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.title}
                  value={packageForm?.title}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="zone"
                  title={"Zone"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.zone}
                  value={packageForm?.zone}
                  cancel=""
                />
              </div>
              {/* 
              <div className="coll-6">
                <CompleteInput
                  name="minWeight"
                  title={"MinWeight"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.minWeight}
                  value={packageForm?.minWeight}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="maxWeight"
                  title={"MaxWeight"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.maxWeight}
                  value={packageForm?.maxWeight}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="rate"
                  title={"Rate"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.rate}
                  value={packageForm?.rate}
                  cancel=""
                />
              </div> */}
              <div className="coll-6">
                <CompleteInput
                  name="description"
                  title={"description"}
                  textarea
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.description}
                  value={packageForm?.description}
                  cancel=""
                />
              </div>

              {/* {(myProfile?.role === "admin" ||
                myProfile?.role === "superAdmin") && ( */}
              <div className="coll-6">
                <CompleteInput
                  name="continent"
                  title={"Continent"}
                  onChange={handleInputPackageChange}
                  // select={true}
                  // data={nationData}
                  dataLabel={packageForm?.continent}
                  value={packageForm?.continent}
                  cancel=""
                />
              </div>
              {/* )} */}
              <div className="coll-6">
                <CompleteInput
                  name="countries"
                  title={"Countries"}
                  type="text"
                  onChange={handleInputPackageChange}
                  dataLabel={packageForm?.countries}
                  value={packageForm?.countries}
                  cancel=""
                />
              </div>
            </div>
            <span className="small">Use comma to seperate each countries</span>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {packageLoad ? (
                <div className="flexx">
                  <LoadingBox circle={true} />
                </div>
              ) : // ) : packagesData?.packages?.length <= 0 ? (
              !packageSuccess ? (
                <div>No Packages available yet...</div>
              ) : (
                <div>
                  <div className="table-wrapper">
                    <table>
                      {packageTableHead && renderHead ? (
                        <thead>
                          <tr>
                            {packageTableHead.map((item, index) =>
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

export default Packages;
