import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CompleteInput from "../components/completeInput";
import ModalOptions from "../components/modalOption";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp, nairaSymbol } from "../utils/others";
import {
  useAddRateMutation,
  useDeletePackageMutation,
  useDeleteRateMutation,
  useGetPackageQuery,
  useGetRatesQuery,
  useUpdatePackageMutation,
  useUpdateRatesMutation,
} from "../redux/slice/packages";
import { toast } from "react-toastify";
import { Button, QuestionAns } from "../components";
const initError = {
  title: "",
  err: "",
};
const EditPackage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const packageId = pathname.slice(12);
  // console.log("packageId", packageId);

  const {
    data: packageData,
    isFetching: fetchpackage,
    refetch: refetchPackage,
  } = useGetPackageQuery(packageId);

  // console.log(packageData);

  const [packageForm, setPackageForm] = useState(
    packageData?.success ? packageData?.package : null
  );
  const [openModal, setOpenModal] = useState(false);
  const [addRateModal, setAddRateModal] = useState(false);
  const [delRateModal, setDelRateModal] = useState(false);
  const [loadingPackage, setLoadingPackage] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [error, setError] = useState(initError);

  const [deleteRate, { isSuccess: delRateSuccess }] = useDeleteRateMutation();
  const [deletePackage, { isSuccess: delPackSuccess }] =
    useDeletePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();

  //get user profile & manager profile
  // const myProfile = useSelector((state) => state?.auth?.profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteRate = async (e) => {
    e.preventDefault();
    try {
      setLoadingRate(true);
      const delrate = await deleteRate(rateForm?.id);

      if (delRateSuccess || delrate?.data?.success) {
        setRateForm(initialRate);
        setLoadingRate(false);
        setDelRateModal(false);
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingRate(false);
    }
  };
  const handleDeletePackage = async (e) => {
    e.preventDefault();
    try {
      setLoadingPackage(true);
      const delpac = await deletePackage({ id: packageId });
      if (delPackSuccess || delpac?.data?.success) {
        setPackageForm(null);
        setLoadingPackage(false);
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingPackage(false);
    }
  };
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    let payload = {
      title: packageForm?.title,
      description: packageForm?.description,
      zone: packageForm?.zone,
      countries: packageForm?.countries,
      continent: packageForm?.continent,
      status: packageForm?.status,
      updatedAt: Date.now(),
    };
    try {
      setLoadingPackage(true);
      const updatepack = await updatePackage({ ...payload, id: packageId });
      //  setOpenModal(!openModal);
      console.log(updatepack);
      if (updatepack?.success || updatepack?.data?.success) {
        refetchPackage();
        setLoadingPackage(false);
        toast.success(updatepack?.data?.message);
      }
    } catch (error) {
      setLoadingPackage(false);
      toast.error(
        error?.message
          ? error?.message
          : error?.data?.message
          ? error?.data?.message
          : "Error occured"
      );
    }
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const handleRate = (item) => {
    setAddRateModal(!addRateModal);
    setRateForm(item);
  };
  const handleDelRate = (item) => {
    setDelRateModal(!delRateModal);
    setRateForm(item);
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item?.minWeight}</td>
      <td>{item?.maxWeight}</td>
      <td>
        <div className="pointer" onClick={() => handleRate(item)}>
          {nairaSymbol(item?.rate, 2)}
        </div>
      </td>

      <td>
        <div
          className={
            item?.status === "active"
              ? "status_green pointer"
              : "status_blue pointer"
          }
          onClick={() => handleRate(item)}
        >
          {item?.status}
        </div>
      </td>
      <td className="flex gap-3">
        <button onClick={() => handleRate(item)} className="card__button">
          <i className="bx bx-pen"></i>
        </button>

        <button onClick={() => handleDelRate(item)} className="card__button">
          <i className="bx bx-trash"></i>
        </button>
      </td>
    </tr>
  );
  const rateTableHead = [
    "",
    "Min Weight",
    "Max Weight",
    "Rate (Kg)",
    "status",
    "action",
  ];

  const [addRate] = useAddRateMutation();
  const [updateRates] = useUpdateRatesMutation();
  const {
    data: ratesData,
    isFetching: rateFetch,
    isLoading: rateLoad,
    isSuccess: rateSuccess,
    refetch,
  } = useGetRatesQuery(
    {
      packageId,
    },
    []
  );
  // console.log("rateLoad", rateLoad);
  // console.log("rateFetch", rateFetch);
  // console.log("rateSuccess", rateSuccess);
  const initialRate = {
    rate: "",
    minWeight: "",
    maxWeight: "",
    description: "",
    status: "",
  };
  const [rateForm, setRateForm] = useState(
    ratesData?.success ? ratesData?.data : initialRate
  );
  let filteredItems = ratesData?.data ? ratesData?.data : [];
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

  const handleInputRateChange = (e) => {
    const { name, value } = e.target;
    setRateForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRate = async (e) => {
    e.preventDefault();
    try {
      if (!rateForm?.rate) {
        toast.error("Rate required");
        setError({
          title: "Invalid Input",
          err: "Rate required",
        });
        return;
      }
      if (!rateForm?.minWeight) {
        setError({
          title: "Invalid Input",
          err: "Min Weight required",
        });
        toast.error("Min Weight required");
        return;
      }
      if (rateForm?.minWeight < 10) {
        setError({
          title: "Invalid Input",
          err: "Min Weight must be above 10",
        });
        toast.error("Min Weight must be above 10");
        return;
      }
      if (!rateForm?.maxWeight) {
        setError({
          title: "Invalid Input",
          err: "Max Weight required",
        });
        toast.error("Max Weight required");
        return;
      }
      if (rateForm?.maxWeight < 10) {
        setError({
          title: "Invalid Input",
          err: "Max Weight must be above 10",
        });
        toast.error("Max Weight must be above 10");
        return;
      }
      if (rateForm?.maxWeight <= rateForm?.minWeight) {
        setError({
          title: "Invalid Input",
          err: "Max Weight must be greater than Min Weight",
        });
        toast.error("Max Weight must be greater than Min Weight");
        return;
      }
      setLoadingRate(true);

      let payload = {
        rate: rateForm?.rate,
        minWeight: rateForm?.minWeight,
        maxWeight: rateForm?.maxWeight,
        description: rateForm?.description,
        packageId,
        status: rateForm?.status ? rateForm?.status : "active",
      };
      const addrate = rateForm?.status
        ? await updateRates({ ...payload, id: rateForm?.id })
        : await addRate(payload).unwrap();
      // fetchPackages();
      // console.log(addrate);
      if (addrate?.success || addrate?.data?.success) {
        refetch();
        setRateForm(initialRate);
        setAddRateModal(!addRateModal);
        setLoadingRate(false);
        toast.success(addrate?.message);
      }
    } catch (error) {
      toast.error(
        error?.message
          ? error?.message
          : error?.data?.message
          ? error?.data?.message
          : "Error occured"
      );
      setAddRateModal(false);
      setLoadingRate(false);
    }
  };
  return (
    <div className="containerr" onClick={closeModal}>
      {loadingPackage ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <h2>{"Manage Package"}</h2>
          <div className="flexx">
            <span className="desc">
              Package was created on{" "}
              {" " + convertTimeStamp(packageForm?.createdAt)}{" "}
              {packageForm?.updatedAt === ""
                ? " has never been modified"
                : " and updated on " + convertTimeStamp(packageForm?.updatedAt)}
            </span>
            <div className="row1">
              <div className="coll-6">
                <div className="row1">
                  <div className="coll-6">
                    <CompleteInput
                      name="Name"
                      title={"Title"}
                      type="text"
                      onChange={handleInputChange}
                      dataLabel={packageForm?.title}
                      value={packageForm?.title}
                      cancel={packageForm?.title}
                    />
                  </div>
                  <div className="coll-6">
                    <CompleteInput
                      name="continent"
                      title={"Continent"}
                      type="text"
                      onChange={handleInputChange}
                      dataLabel={packageForm?.continent}
                      value={packageForm?.continent}
                      cancel={packageForm?.continent}
                    />
                  </div>
                  <div className="coll-6">
                    <CompleteInput
                      name="status"
                      title={"Status"}
                      type="text"
                      onChange={handleInputChange}
                      select
                      data={[
                        { id: 1, label: "Active", value: "active" },
                        { id: 2, label: "Disabled", value: "disable" },
                      ]}
                      dataLabel={packageForm?.status}
                      value={packageForm?.status}
                      cancel={packageForm?.status}
                    />
                  </div>
                  <div className="coll-6">
                    <CompleteInput
                      name="description"
                      title={"description"}
                      textarea
                      type="text"
                      onChange={handleInputChange}
                      dataLabel={packageForm?.description}
                      value={packageForm?.description}
                      cancel={packageForm?.description}
                    />
                  </div>
                  <div className="coll-12">
                    <CompleteInput
                      name="countries"
                      title={"countries"}
                      textarea={true}
                      type="text"
                      placeholder={"Input all countries"}
                      onChange={handleInputChange}
                      dataLabel={packageForm?.countries}
                      value={packageForm?.countries}
                      cancel={packageForm?.countries}
                    />
                  </div>
                </div>
              </div>
              <div className="coll-6">
                <div className="flex items-center justify-between my-2">
                  <span className="text-xl text-black">Rate Table</span>

                  <div
                    className="flex items-center gap-2"
                    onClick={() => setAddRateModal(true)}
                  >
                    <div className="page-filter">
                      <i className="bx bx-plus"></i>
                    </div>
                    <span className="text-xl hidden lg:flex">Add Rate</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card__body">
                    {rateFetch ? (
                      <div className="flexx">
                        <LoadingBox circle={true} />
                      </div>
                    ) : filteredItems?.length < 1 ? (
                      <>No rate data</>
                    ) : (
                      <div>
                        <div className="table-wrapper">
                          <table>
                            {rateTableHead && renderHead ? (
                              <thead>
                                <tr>
                                  {rateTableHead.map((item, index) =>
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

            <span className="small">Package can only be created by Staff</span>
            {/* <span className="small status_green pad">
              This package is available for {" " + packageForm?.zone}
            </span> */}
          </div>

          <div className="modalFooter">
            <Button
              type={1}
              onClick={handleUpdatePackage}
              title={"Update"}
              loading={loadingPackage}
            />
            <Button
              type={2}
              onClick={() => setOpenModal(!openModal)}
              title={"Delete"}
            />

            <Button
              type={1}
              onClick={() => navigate("/mypackages")}
              title={"Back"}
            />
          </div>
        </div>
      )}
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Delete this Package"}
          btnText={"Delete"}
          cancel={"Cancel"}
          handleOption={handleDeletePackage}
          loading={loadingPackage}
        >
          <div className="flexx">
            <span className="desc">Package {packageId}</span>
            <span className="small">Package will be permanently deleted</span>
          </div>
        </ModalOptions>
      )}
      {delRateModal && (
        <ModalOptions
          handleCancel={() => setDelRateModal(!delRateModal)}
          title={"Delete this Rate"}
          btnText={"Delete"}
          cancel={"Cancel"}
          handleOption={handleDeleteRate}
          loading={loadingRate}
        >
          <div className="flexx">
            <span className="desc">
              Selected Rate ({nairaSymbol(rateForm?.rate, 2)})
            </span>
            <span className="small">Rate will be permanently deleted</span>
          </div>
        </ModalOptions>
      )}
      {addRateModal && (
        <ModalOptions
          handleCancel={() => setAddRateModal(!addRateModal)}
          title={
            rateForm?.status ? "Update Rate & Weight" : "Add Rate & Weight"
          }
          btnText={rateForm?.status ? "Update Rate" : "Add Rate"}
          cancel={"Cancel"}
          handleOption={handleAddRate}
          loading={loadingRate}
        >
          <div className="w-full">
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="minWeight"
                  title={"Min Weight"}
                  type="number"
                  onChange={handleInputRateChange}
                  dataLabel={rateForm?.minWeight}
                  value={rateForm?.minWeight}
                  cancel={rateForm?.minWeight}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="maxWeight"
                  title={"Max Weight"}
                  type="number"
                  onChange={handleInputRateChange}
                  dataLabel={rateForm?.maxWeight}
                  value={rateForm?.maxWeight}
                  cancel={rateForm?.maxWeight}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="rate"
                  title={"rate"}
                  type="number"
                  onChange={handleInputRateChange}
                  dataLabel={rateForm?.rate}
                  value={rateForm?.rate}
                  cancel={rateForm?.rate}
                />
              </div>
              {rateForm?.status && (
                <div className="coll-6">
                  <CompleteInput
                    name="status"
                    title={"status"}
                    type="text"
                    select
                    data={[
                      { id: 1, label: "Active", value: "active" },
                      { id: 2, label: "Disable", value: "disable" },
                    ]}
                    onChange={handleInputRateChange}
                    dataLabel={rateForm?.status}
                    value={rateForm?.status}
                    cancel={rateForm?.status}
                  />
                </div>
              )}
              <div className="coll-6">
                <CompleteInput
                  name="description"
                  title={"description"}
                  type="text"
                  textarea
                  onChange={handleInputRateChange}
                  dataLabel={rateForm?.description}
                  value={rateForm?.description}
                  cancel={rateForm?.description}
                />
              </div>
            </div>

            {error?.title && (
              <QuestionAns question={error?.title} err ans={error?.err} />
            )}
          </div>
        </ModalOptions>
      )}
    </div>
  );
};

export default EditPackage;
