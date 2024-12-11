import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import CompleteInput from "../components/completeInput";
import ModalOptions from "../components/modalOption";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp, getCountry, nairaSymbol } from "../utils/others";
import { Button, QuestionAns } from "../components";
import {
  useGetOrderQuery,
  useGetTrackItemQuery,
  useUpdateOrderMutation,
  useUpdateTrackerMutation,
} from "../redux/slice/orders";

const initTracker = {
  description: "",
  status: "",
  realTracker: "",
};

const initError = {
  title: "",
  err: "",
};

const ManageOrder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const orderId = pathname.slice(8);

  const {
    data: orderData,
    isFetching: fetchorder,
    refetch: refetchOrder,
  } = useGetOrderQuery(orderId);

  const [orderForm, setOrderForm] = useState(
    orderData?.success ? orderData?.data : null
  );
  const [openModal, setOpenModal] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingTracker, setLoadingTracker] = useState(false);
  const [error, setError] = useState(initError);
  const { data: trackedItem, refetch } = useGetTrackItemQuery(
    orderData?.data?.tracker
  );
  // console.log("trackedItem", trackedItem);
  const [trackerForm, setTrackerForm] = useState(
    trackedItem ? trackedItem?.item : initTracker
  );

  useEffect(() => {
    setTrackerForm(trackedItem?.item);
  }, []);

  const [updateOrder] = useUpdateOrderMutation();

  //get user profile & manager profile
  const myProfile = useSelector((state) => state?.auth?.profile);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setOrderForm((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const [updateTracker] = useUpdateTrackerMutation();

  const handleUpdateTracker = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        id: orderData?.data?.tracker,
        description: trackerForm?.description,
        status: trackerForm?.status,
        realTracker: trackerForm?.realTracker,
      };
      setLoadingTracker(true);

      const upTrack = await updateTracker(payload).unwrap();
      refetch();
      // console.log(upTrack);
      if (upTrack?.success) {
        toast.success("Tracker updated");
        setLoadingTracker(false);
      }
      setOpenModal(false);
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingTracker(false);
      setOpenModal(false);
    }
  };
  const [loadingTrack, setloadingTrack] = useState(false);
  const [trackedGoods, setTrackedGoods] = useState(null);

  const trackGoods = async () => {
    try {
      if (trackedItem?.item?.realTracker) {
        setloadingTrack(true);
        const trackedItems = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/track/${orderData?.data?.tracker}`
        );
        if (trackedItems?.data?.data) {
          setTrackedGoods(trackedItems?.data?.data);
          // setTrackedItems(trackedItems?.data?.item);
          setloadingTrack(false);
          toast.success("Goods tracked successfully");
        } else {
          setloadingTrack(false);
          // setTrackedItems(true);
          toast.success("Goods tracked successfully");
        }
      } else {
        toast.success("Goods tracked");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error occured, retry again");
      setloadingTrack(false);
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    let payload = {
      status: orderForm?.status,
      updatedAt: Date.now(),
    };
    try {
      setLoadingOrder(true);
      const updatepack = await updateOrder({ ...payload, id: orderId });
      //  setOpenModal(!openModal);
      console.log(updatepack);
      if (updatepack?.success || updatepack?.data?.success) {
        refetchOrder();
        setLoadingOrder(false);
        toast.success(updatepack?.data?.message);
      }
    } catch (error) {
      setLoadingOrder(false);
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

  const handleInputTrackChange = (e) => {
    const { name, value } = e.target;
    setTrackerForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("trackedItem?.item", trackedItem?.item);

  return (
    <div className="containerr" onClick={closeModal}>
      {loadingOrder ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <h2>{myProfile?.role === "user" ? "View Order" : "Manage Order"}</h2>
          <div className="flexx">
            <span className="desc">
              Order was created on{" "}
              {" " + convertTimeStamp(orderData?.data?.createdAt)}{" "}
              {!orderData?.data?.updatedAt
                ? " has never been modified"
                : " and updated on " + convertTimeStamp(orderForm?.updatedAt)}
            </span>
            <div className="row1">
              <div className="coll-6">
                <div className="card">
                  <div className="card__body">
                    <div className="flex flex-col gap-3">
                      <span className="text-xl font-semibold text-center">
                        Order details
                      </span>
                      <QuestionAns
                        question={"Items"}
                        ans={orderData?.data?.items}
                      />
                      {orderData?.data?.description && (
                        <QuestionAns
                          question={"Items"}
                          ans={orderData?.data?.description}
                        />
                      )}
                      <QuestionAns
                        question={"Weight"}
                        ans={`${orderData?.data?.weight} kg`}
                      />
                      {orderData?.data?.rate && (
                        <QuestionAns
                          question={"Rate"}
                          ans={`${orderData?.data?.rate} per kg`}
                        />
                      )}
                      <QuestionAns
                        question={"Price"}
                        ans={nairaSymbol(orderData?.data?.price, 2)}
                      />{" "}
                      <QuestionAns
                        question={"Status"}
                        ans={orderData?.data?.status}
                      />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card__body">
                    <span className="text-xl font-semibold text-center mb-4">
                      Other details
                    </span>
                    <div className="row1">
                      <div className="coll-6">
                        <div className="flexx gap-3">
                          <QuestionAns
                            question={"Receiver Name"}
                            ans={orderData?.data?.destName}
                          />
                          <QuestionAns
                            question={"Receiver Email"}
                            ans={orderData?.data?.destEmail}
                          />
                          <QuestionAns
                            question={"Receiver Phone"}
                            ans={orderData?.data?.destPhone}
                          />
                          <QuestionAns
                            question={"Receiver Address"}
                            ans={orderData?.data?.destAddress}
                          />
                          <QuestionAns
                            question={"Receiver city"}
                            ans={orderData?.data?.destCity}
                          />
                          <QuestionAns
                            question={"Receiver State"}
                            ans={orderData?.data?.destState}
                          />
                          <QuestionAns
                            question={"Receiver Country"}
                            ans={orderData?.data?.destCountry}
                          />
                        </div>
                      </div>
                      <div className="coll-6">
                        <div className="flexx gap-3">
                          <QuestionAns
                            question={"Sender Name"}
                            ans={orderData?.data?.senderName}
                          />
                          <QuestionAns
                            question={"Sender Email"}
                            ans={orderData?.data?.senderEmail}
                          />
                          <QuestionAns
                            question={"Sender Phone"}
                            ans={orderData?.data?.senderPhone}
                          />
                          <QuestionAns
                            question={"Sender Address"}
                            ans={orderData?.data?.senderAddress}
                          />
                          <QuestionAns
                            question={"Sender city"}
                            ans={orderData?.data?.senderCity}
                          />
                          <QuestionAns
                            question={"Sender State"}
                            ans={orderData?.data?.senderState}
                          />
                          <QuestionAns
                            question={"Sender Country"}
                            ans={orderData?.data?.senderCountry}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll-6">
                <div className="card">
                  <div className="card__body">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <span className="text-xl font-semibold text-center">
                          Tracker Summary
                        </span>
                        {myProfile?.role !== "user" && (
                          <Button
                            type={1}
                            title="Edit Tracker"
                            loading={loadingTrack}
                            onClick={() => setOpenModal(!openModal)}
                          />
                        )}
                      </div>
                      <Button
                        title="Track"
                        loading={loadingTrack}
                        onClick={trackGoods}
                      />

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <QuestionAns
                          question={"Tracking ID"}
                          ans={orderData?.data?.tracker}
                        />
                        {myProfile?.role !== "user" && (
                          <QuestionAns
                            question={"Real Tracking ID"}
                            ans={
                              trackedItem?.item?.realTracker
                                ? trackedItem?.item?.realTracker
                                : "No Real Tracking ID"
                            }
                          />
                        )}
                      </div>
                      {trackedItem?.item?.realTracker !== "" ? (
                        <>
                          {trackedGoods?.shipments?.map((item, index) => (
                            <div className="flex flex-col gap-3" key={item?.id}>
                              <QuestionAns
                                question={"Status"}
                                ans={item?.status?.statusCode}
                              />
                              <QuestionAns
                                question={"Description"}
                                ans={item?.status?.description}
                              />
                              <QuestionAns
                                question={"Date"}
                                ans={convertTimeStamp(
                                  item?.status?.timestamp,
                                  true
                                )}
                              />
                              <QuestionAns
                                question={"Location"}
                                ans={
                                  item?.destination?.address?.addressLocality
                                }
                              />
                              <QuestionAns
                                question={"Country"}
                                ans={getCountry(
                                  item?.destination?.address?.countryCode
                                )}
                              />
                              <span className="text-xl font-semibold text-center mt-3">
                                History of Item
                              </span>

                              {item?.events.map((x, index) => (
                                <div
                                  className="gap-3 p-3 bg-slate-300"
                                  key={index}
                                >
                                  <span>Step {index + 1}</span>
                                  <QuestionAns
                                    question={"Description"}
                                    ans={x?.description}
                                  />

                                  <QuestionAns
                                    question={"Status"}
                                    ans={x?.statusCode}
                                  />
                                  <QuestionAns
                                    question={"Address"}
                                    ans={`${
                                      x?.location?.address?.addressLocality
                                    }, ${getCountry(
                                      x?.location?.address?.countryCode
                                    )}`}
                                  />
                                  <QuestionAns
                                    question={"Date"}
                                    ans={convertTimeStamp(x?.timestamp, true)}
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <QuestionAns
                            question={"Status"}
                            ans={trackedItem?.item?.status}
                          />
                          <QuestionAns
                            question={"Description"}
                            ans={trackedItem?.item?.description}
                          />
                          <QuestionAns
                            question={"Date"}
                            ans={convertTimeStamp(trackedItem?.item?.createdAt)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="small">Order can only be managed by staff</span>
            {/* <span className="small status_green pad">
              This Order is available for {" " + orderForm?.zone}
            </span> */}
          </div>

          <div className="modalFooter">
            {myProfile?.role !== "user" && (
              <Button
                type={1}
                onClick={handleUpdateOrder}
                title={"Update"}
                loading={loadingOrder}
              />
            )}
            {/* <Button
              type={2}
              onClick={() => setOpenModal(!openModal)}
              title={"Delete"}
            /> */}

            <Button
              type={2}
              onClick={() => navigate("/orders")}
              title={"Back"}
            />
          </div>
        </div>
      )}
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Update Tracker"}
          btnText={"Update"}
          cancel={"Cancel"}
          handleOption={handleUpdateTracker}
          loading={loadingTracker}
          top={250}
        >
          <div className="w-full">
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="status"
                  title={"status"}
                  type="text"
                  // select
                  // data={statusData}
                  onChange={handleInputTrackChange}
                  dataLabel={trackerForm?.status}
                  value={trackerForm?.status}
                  cancel={trackedItem?.item?.status}
                />
              </div>

              <div className="coll-6">
                <CompleteInput
                  name="realTracker"
                  title={"Real Tracker ID"}
                  type="text"
                  onChange={handleInputTrackChange}
                  dataLabel={trackerForm?.realTracker}
                  value={trackerForm?.realTracker}
                  cancel={trackedItem?.item?.realTracker}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="description"
                  title={"description"}
                  type="text"
                  textarea
                  onChange={handleInputTrackChange}
                  dataLabel={trackerForm?.description}
                  value={trackerForm?.description}
                  cancel={trackedItem?.item?.description}
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

export default ManageOrder;
