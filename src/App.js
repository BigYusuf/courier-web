import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import About from "./frontend/about";
import Home from "./frontend/home";
import Contact from "./frontend/contact";
import Services from "./frontend/services";
import logo from "./assets/images/logo.png";
import Header from "./components/header";
import Footer from "./components/footer";
import { RedirectIfAuthenticated, RequireAuth, RolePermit } from "./middleware";
import {
  Customers,
  Dashboard,
  EditContact,
  EditPackage,
  EditStaff,
  EditUser,
  ManageOrder,
  Orders,
  Packages,
  PassReset,
  Profile,
  SignIn,
  SignUp,
  Staffs,
} from "./pages";
import {
  Button,
  CompleteInput,
  ModalOptions,
  QuestionAns,
  Sidebar,
  Topnav,
} from "./components";
import Messages from "./pages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { setMakeOrder } from "./redux/slice/orders/orderSlice";
import { useGetPackagesQuery, useGetRatesQuery } from "./redux/slice/packages";
import Contacts from "./pages/Contacts";
import { countryData } from "./data/countries";
import { useGetContactsQuery } from "./redux/slice/contact";
import { nairaSymbol } from "./utils/others";
import { useCreateOrderMutation } from "./redux/slice/orders";

const SimpleInput = ({
  name,
  value,
  label,
  onChange,
  selectPlaceholder,
  select,
  data,
}) => {
  return (
    <div className="">
      <label className="text-[14px] mb-2">{label}</label>
      {!select ? (
        <input
          type="text"
          name={name}
          onChange={onChange}
          value={value}
          className="px-4 h-14 w-full border border-blue-300 focus:outline-none focus:ring-0  focus:border-yellow-500 rounded-2xl shadow-md"
        />
      ) : (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="px-4 h-14 w-full border border-blue-300 focus:outline-none focus:ring-0  focus:border-yellow-500 rounded-2xl shadow-md"
        >
          <option value={""}>{selectPlaceholder}</option>
          {data?.map((item) => (
            <option key={item?.iso2} value={item?.label}>
              {item?.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const initError = {
  title: "",
  err: "",
};

const initValues = {
  continent: "",
  weight: 0,
  items: "",
  description: "",
  senderId: "",
  senderName: "",
  senderEmail: "",
  senderPhone: "",
  senderAddress: "",
  senderCity: "",
  senderState: "",
  senderCountry: "",
  destId: "",
  destName: "",
  destAddress: "",
  destPhone: "",
  destEmail: "",
  destCity: "",
  destState: "",
  destCountry: "",
};
function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const PrivateRoutes = () => {
    const makeOrder = useSelector((state) => state?.order?.makeOrder);
    const dispatch = useDispatch();
    const myProfile = useSelector((state) => state?.auth?.profile);

    // const user = useSelector((state) => state?.auth?.user);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [error, setError] = useState(initError);
    const [stage, setStage] = useState(0);

    const [formContactData, setFormContactData] = useState(initValues);

    const handleNext = async (item) => {
      if (stage === 0) {
        if (formContactData?.items === "") {
          setError({
            title: "Items can not be empty",
            err: "Items can not be empty",
          });
          toast.error("Items can not be empty");
          return;
        } else if (formContactData?.weight < 10) {
          setError({
            title: "Invalid Weight",
            err: "Weight must be 10 kg and above",
          });
          toast.error("Weight must be above 9.9kg");
          return;
        }
      }
      //Receiver's
      if (stage === 1) {
        if (formContactData?.destName === "") {
          setError({
            title: "Reciever name can not be empty",
            err: "Reciever name not be empty",
          });
          toast.error("Reciever name can not be empty");
          return;
        } else if (formContactData?.destAddress === "") {
          setError({
            title: "Dest. address can not be empty",
            err: "Dest. address can not be empty",
          });
          toast.error("Dest. address can not be empty");
          return;
        } else if (formContactData?.destPhone === "") {
          setError({
            title: "Dest. phone can not be empty",
            err: "Dest. phone can not be empty",
          });
          toast.error("Dest. phone can not be empty");
          return;
        } else if (formContactData?.destEmail === "") {
          setError({
            title: "Dest. email can not be empty",
            err: "Dest. email can not be empty",
          });
          toast.error("Dest. email can not be empty");
          return;
        } else if (formContactData?.destCity === "") {
          setError({
            title: "Dest. city can not be empty",
            err: "Dest. city can not be empty",
          });
          toast.error("Dest. city can not be empty");
          return;
        } else if (formContactData?.destState === "") {
          setError({
            title: "Dest. state can not be empty",
            err: "Dest. state can not be empty",
          });
          toast.error("Dest. state can not be empty");
          return;
        } else if (formContactData?.destCountry === "") {
          setError({
            title: "Dest. country can not be empty",
            err: "Dest. country can not be empty",
          });
          toast.error("Dest. country can not be empty");
          return;
        }
      }
      //sender
      if (stage === 2) {
        if (formContactData?.senderName === "") {
          setError({
            title: "Contact name can not be empty",
            err: "Contact name not be empty",
          });
          toast.error("Contact name can not be empty");
          return;
        } else if (formContactData?.senderAddress === "") {
          setError({
            title: "Contact address can not be empty",
            err: "Contact address can not be empty",
          });
          toast.error("Contact address can not be empty");
          return;
        } else if (formContactData?.senderPhone === "") {
          setError({
            title: "Contact phone can not be empty",
            err: "Contact phone can not be empty",
          });
          toast.error("Contact phone can not be empty");
          return;
        } else if (formContactData?.senderEmail === "") {
          setError({
            title: "Contact email can not be empty",
            err: "Contact email can not be empty",
          });
          toast.error("Contact email can not be empty");
          return;
        } else if (formContactData?.senderCity === "") {
          setError({
            title: "Contact city can not be empty",
            err: "Contact city can not be empty",
          });
          toast.error("Contact city can not be empty");
          return;
        } else if (formContactData?.senderState === "") {
          setError({
            title: "Contact state can not be empty",
            err: "Contact state can not be empty",
          });
          toast.error("Contact state can not be empty");
          return;
        } else if (formContactData?.senderCountry === "") {
          setError({
            title: "Contact country can not be empty",
            err: "Contact country can not be empty",
          });
          toast.error("Contact country can not be empty");
          return;
        }
      }
      try {
        if (stage < 3) {
          setStage(item + 1);
          setError(initError);
        } else {
          setLoadingOrder(true);
          const addpack = await createOrder({
            ...formContactData,
            packageId: selectedRate[0]?.packageId,
            price: selectedRate[0]?.rate * formContactData?.weight,
          }).unwrap();
          console.log(addpack);
          // fetchPackages();
          if (addpack?.success) {
            setFormContactData(initValues);
            dispatch(setMakeOrder(false));
            setLoadingOrder(false);
            toast.success("Order Created Success");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message ? error?.message : "Error occured");
        setLoadingOrder(false);
      }
    };

    const handlePrev = (item) => {
      if (item > 0) {
        setStage(item - 1);
      } else {
        setStage(0);
      }
    };

    const { data: packageData } = useGetPackagesQuery();
    const { data: contactData } = useGetContactsQuery();
    const [activeIndex, setActiveIndex] = useState({});

    const selectedPackage = packageData?.packages
      ? packageData?.packages?.filter((item) =>
          item?.countries
            ?.toLowerCase()
            ?.includes(formContactData?.destCountry?.toLowerCase())
        )
      : [];
    const { data: rateData } = useGetRatesQuery({
      packageId: selectedPackage?.[0]?.id,
    });

    const selectedRate = rateData?.data
      ? rateData?.data?.filter(
          (item) =>
            item?.packageId
              ?.toLowerCase()
              ?.includes(selectedPackage[0]?.id?.toLowerCase()) &&
            formContactData?.weight > item?.minWeight &&
            formContactData?.weight < item?.maxWeight
        )
      : [];

    // console.log("rateData", rateData);
    // console.log("selectedPackage", selectedPackage);
    // console.log("selectedRate", selectedRate);

    const handleSelect = (item) => {
      setActiveIndex(item);
      setFormContactData({
        ...formContactData,
        destId: item?.id,
        destAddress: item?.address,
        destEmail: item?.email,
        destPhone: item?.phone,
        destName: item?.name,
        destCity: item?.city,
        destState: item?.state,
        destCountry: item?.country,
      });
    };

    const handleSelectProfile = (item) => {
      setFormContactData({
        ...formContactData,
        senderId: item?.id,
        senderAddress: item?.address,
        senderEmail: item?.email,
        senderPhone: item?.phone,
        senderName: item?.firstName + " " + item?.lastName,
        senderCity: item?.city,
        senderState: item?.state,
        senderCountry: item?.country,
      });
    };

    const handleInputContactChange = (e) => {
      const { name, value } = e.target;
      setFormContactData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const [createOrder] = useCreateOrderMutation();

    const handleAddOrder = async () => {
      // e.preventDefault();
      try {
        setLoadingOrder(true);

        // let payload = {
        //   title: packageForm?.title,
        //   description: packageForm?.description,
        //   zone: packageForm?.zone,
        //   countries: packageForm?.countries,
        //   continent: packageForm?.continent,
        //   status: "active",
        // };

        const addpack = await createOrder({
          ...formContactData,
          price: selectedRate[0]?.rate * formContactData?.weight,
        }).unwrap();
        console.log(addpack);
        // fetchPackages();
        if (addpack?.success) {
          setFormContactData(initValues);
          dispatch(setMakeOrder(false));
          setLoadingOrder(false);
          toast.success("Order Created Success");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message ? error?.message : "Error occured");
        setLoadingOrder(false);
      }
    };

    if (!myProfile) {
      return <Navigate to="/" />;
    } else {
      return (
        <div className={`layoutt`}>
          {myProfile?.role === "user" && makeOrder && (
            <ModalOptions handleCancel={() => dispatch(setMakeOrder(false))} bg>
              <div className="w-full relative">
                <div className="">
                  <img
                    src={logo}
                    style={{ width: 120, height: 100, position: "absolute" }}
                    alt="company logo"
                  />
                </div>
                <div className="flex items-center justify-center mb-4 mt-2">
                  <div className="w-12 h-12 object-contain flex items-center justify-center rounded-[50%] border-black border">
                    <i
                      className={`bx bx-cart text-2xl ${
                        stage === 0 ? "text-green-400" : "text-blue-400"
                      }`}
                    ></i>
                  </div>
                  <div className="w-[10%] text-black bg-black h-[1px]"></div>
                  <div className="w-12 h-12 object-contain flex items-center justify-center rounded-[50%] border-black border">
                    <i
                      className={`bx bx-walk text-2xl ${
                        stage === 1 ? "text-green-400" : "text-blue-400"
                      }`}
                    ></i>
                  </div>
                  <div className="w-[10%] text-black bg-black h-[1px]"></div>
                  <div className="w-12 h-12 object-contain flex items-center justify-center rounded-[50%] border-black border">
                    <i
                      className={`bx bx-car text-2xl ${
                        stage === 2 ? "text-green-400" : "text-blue-400"
                      }`}
                    ></i>
                  </div>
                  <div className="w-[10%] text-black bg-black h-[1px]"></div>
                  <div className="w-12 h-12 object-contain flex items-center justify-center rounded-[50%] border-black border">
                    <i
                      className={`bx bxs-dashboard text-2xl ${
                        stage === 3 ? "text-green-400" : "text-blue-400"
                      }`}
                    ></i>
                  </div>
                </div>
                {stage === 0 ? (
                  <>
                    <h1 className="text-2xl font-semibold text-center">
                      Deliver Goods Now
                    </h1>

                    <div className="my-4 row1">
                      <div className="coll-6">
                        <CompleteInput
                          type={"text"}
                          title={`Items`}
                          dataLabel={formContactData?.items}
                          value={formContactData?.items}
                          cancel={""}
                          name={"items"}
                          onChange={handleInputContactChange}
                        />
                      </div>
                      <div className="coll-6">
                        <CompleteInput
                          type={"text"}
                          title={"Description (Optional)"}
                          dataLabel={formContactData?.description}
                          value={formContactData?.description}
                          cancel={""}
                          name={"description"}
                          onChange={handleInputContactChange}
                        />
                      </div>

                      <div className="coll-6">
                        <CompleteInput
                          title={"Weight per kg"}
                          dataLabel={formContactData?.weight}
                          value={formContactData?.weight}
                          cancel={""}
                          type="number"
                          name={"weight"}
                          onChange={handleInputContactChange}
                        />
                      </div>
                    </div>

                    {error?.title && (
                      <div className="coll-6">
                        <QuestionAns
                          question={error?.title}
                          err
                          ans={error?.err}
                        />
                      </div>
                    )}
                  </>
                ) : stage === 1 ? (
                  <>
                    <h1 className="text-2xl font-semibold text-center">
                      Select Address
                    </h1>
                    <div className="my-4 flex">
                      <div className="coll-6 gap-[16px]">
                        {contactData?.contacts ? (
                          contactData?.contacts?.map((item) => (
                            <div
                              onClick={() => handleSelect(item)}
                              className={`h-[130px] p-4 rounded-2xl w-full my-4 shadow-lg ${
                                activeIndex?.id === item?.id
                                  ? "bg-blue-400 text-white"
                                  : "bg-white"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span
                                  className={`text-xl font-semibold ${
                                    activeIndex?.id === item?.id
                                      ? "bg-blue-400 text-white"
                                      : "bg-white"
                                  }`}
                                >
                                  {item?.name}
                                </span>
                                <i
                                  class={`text-3xl bx ${
                                    activeIndex?.id === item?.id
                                      ? "bx-radio-circle-marked text-yellow-500"
                                      : "bx-radio-circle"
                                  }`}
                                ></i>
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className={`text-base ${
                                    activeIndex?.id === item?.id
                                      ? "text-white"
                                      : ""
                                  }`}
                                >
                                  {item?.address}
                                </span>
                                <span
                                  className={`text-base ${
                                    activeIndex?.id === item?.id
                                      ? "text-white"
                                      : ""
                                  }`}
                                >
                                  {item?.email}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <>No Contact Address Found</>
                        )}
                      </div>
                      <div className="coll-6 gap-2 flex flex-col">
                        <SimpleInput
                          name="destName"
                          label="Receiver's Name"
                          value={formContactData?.destName}
                          onChange={handleInputContactChange}
                        />
                        <div className="w-full flex flex-row items-center gap-3">
                          <div className="w-1/2">
                            <SimpleInput
                              name="destEmail"
                              label="Receiver's Email"
                              value={formContactData?.destEmail}
                              onChange={handleInputContactChange}
                            />
                          </div>
                          <div className="w-1/2">
                            <SimpleInput
                              name="destPhone"
                              label="Receiver's Phone number"
                              value={formContactData?.destPhone}
                              onChange={handleInputContactChange}
                            />
                          </div>
                        </div>
                        <SimpleInput
                          name="destAddress"
                          label="Receiver's Address"
                          value={formContactData?.destAddress}
                          onChange={handleInputContactChange}
                        />
                        <div className="w-full flex flex-row items-center gap-3">
                          <div className="w-1/2">
                            <SimpleInput
                              name="destCity"
                              label="Receiver's City"
                              value={formContactData?.destCity}
                              onChange={handleInputContactChange}
                            />
                          </div>
                          <div className="w-1/2">
                            <SimpleInput
                              name="destState"
                              label="Receiver's State"
                              value={formContactData?.destState}
                              onChange={handleInputContactChange}
                            />
                          </div>
                        </div>
                        <SimpleInput
                          name="destCountry"
                          label="Receiver's Country"
                          selectPlaceholder="Select Country"
                          data={countryData}
                          select
                          value={formContactData?.destCountry}
                          onChange={handleInputContactChange}
                        />
                      </div>
                    </div>
                  </>
                ) : stage === 2 ? (
                  <>
                    <h1 className="text-2xl font-semibold text-center">
                      Sender details
                    </h1>
                    <div className="my-4 flex">
                      <div className="coll-6 gap-[16px]">
                        {myProfile ? (
                          <div
                            onClick={() => handleSelectProfile(myProfile)}
                            className={`h-[130px] p-4 rounded-2xl w-full my-4 shadow-lg ${
                              myProfile?.id === formContactData?.senderId
                                ? "bg-blue-400 text-white"
                                : "bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={`text-xl font-semibold ${
                                  myProfile?.id === formContactData?.senderId
                                    ? "bg-blue-400 text-white"
                                    : "bg-white"
                                }`}
                              >
                                {myProfile?.firstName +
                                  " " +
                                  myProfile?.lastName}
                              </span>
                              <i
                                class={`text-3xl bx ${
                                  myProfile?.id === formContactData?.senderId
                                    ? "bx-radio-circle-marked text-yellow-500"
                                    : "bx-radio-circle"
                                }`}
                              ></i>
                            </div>
                            <div className="flex flex-col">
                              <span
                                className={`text-base ${
                                  myProfile?.id === formContactData?.senderId
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {myProfile?.address}
                              </span>
                              <span
                                className={`text-base ${
                                  myProfile?.id === formContactData?.senderId
                                    ? "text-white"
                                    : ""
                                }`}
                              >
                                {myProfile?.email}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>No Profile Found</>
                        )}
                      </div>
                      <div className="coll-6 gap-2 flex flex-col">
                        <SimpleInput
                          name="senderName"
                          label="Sender Name"
                          value={formContactData?.senderName}
                          onChange={handleInputContactChange}
                        />
                        <div className="w-full flex flex-row items-center gap-3">
                          <div className="w-1/2">
                            <SimpleInput
                              name="senderEmail"
                              label="Sender Email"
                              value={formContactData?.senderEmail}
                              onChange={handleInputContactChange}
                            />
                          </div>
                          <div className="w-1/2">
                            <SimpleInput
                              name="senderPhone"
                              label="Sender Phone"
                              value={formContactData?.senderPhone}
                              onChange={handleInputContactChange}
                            />
                          </div>
                        </div>
                        <SimpleInput
                          name="senderAddress"
                          label="Sender Address"
                          value={formContactData?.senderAddress}
                          onChange={handleInputContactChange}
                        />
                        <div className="w-full flex flex-row items-center gap-3">
                          <div className="w-1/2">
                            <SimpleInput
                              name="senderCity"
                              label="Sender City"
                              value={formContactData?.senderCity}
                              onChange={handleInputContactChange}
                            />
                          </div>
                          <div className="w-1/2">
                            <SimpleInput
                              name="senderState"
                              label="Sender State"
                              value={formContactData?.senderState}
                              onChange={handleInputContactChange}
                            />
                          </div>
                        </div>
                        <SimpleInput
                          name="senderCountry"
                          label="Sender Country"
                          value={formContactData?.senderCountry}
                          selectPlaceholder="Select Country"
                          select
                          data={countryData}
                          onChange={handleInputContactChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-semibold text-center">
                      View details
                    </h1>
                    <div className="my-4 row1">
                      <div className="coll-4">
                        <div className="mainBackground">
                          <span className="text-xl font-semibold text-center">
                            Package details
                          </span>
                          <QuestionAns
                            question={"Items"}
                            ans={formContactData?.items}
                          />
                          {formContactData?.description && (
                            <QuestionAns
                              question={"Description"}
                              ans={formContactData?.description}
                            />
                          )}
                          <QuestionAns
                            question={"Weight"}
                            ans={`${formContactData?.weight}kg`}
                          />
                          <QuestionAns
                            question={"Rate"}
                            ans={`₦${selectedRate[0]?.rate} per kg`}
                          />
                          <QuestionAns
                            question={"Price charged"}
                            ans={`${nairaSymbol(
                              selectedRate[0]?.rate * formContactData?.weight,
                              2
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="coll-4">
                        <div className="mainBackground">
                          <span className="text-xl font-semibold text-center">
                            Receiver's details
                          </span>
                          <QuestionAns
                            question={"Dest. Name"}
                            ans={formContactData?.destName}
                          />
                          <QuestionAns
                            question={"Dest. Phone"}
                            ans={formContactData?.destPhone}
                          />
                          <QuestionAns
                            question={"Dest. Email"}
                            ans={formContactData?.destEmail}
                          />
                          <QuestionAns
                            question={"Dest. Address"}
                            ans={formContactData?.destAddress}
                          />
                          <QuestionAns
                            question={"Dest. City"}
                            ans={formContactData?.destCity}
                          />
                          <QuestionAns
                            question={"Dest. State"}
                            ans={formContactData?.destState}
                          />
                          <QuestionAns
                            question={"Dest. Country"}
                            ans={formContactData?.destCountry}
                          />
                        </div>
                      </div>
                      <div className="coll-4">
                        <div className="mainBackground">
                          <span className="text-xl font-semibold text-center">
                            Sender's details
                          </span>
                          <QuestionAns
                            question={"Sender Name"}
                            ans={formContactData?.senderName}
                          />
                          <QuestionAns
                            question={"Sender Phone"}
                            ans={formContactData?.senderPhone}
                          />
                          <QuestionAns
                            question={"Sender Email"}
                            ans={formContactData?.senderEmail}
                          />
                          <QuestionAns
                            question={"Sender Address"}
                            ans={formContactData?.senderAddress}
                          />
                          <QuestionAns
                            question={"Sender City"}
                            ans={formContactData?.senderCity}
                          />
                          <QuestionAns
                            question={"Sender State"}
                            ans={formContactData?.senderState}
                          />
                          <QuestionAns
                            question={"Sender Country"}
                            ans={formContactData?.senderCountry}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="modalFooter">
                  <Button
                    title={"Back"}
                    type={2}
                    onClick={() => handlePrev(stage)}
                  />
                  <Button
                    title={stage < 3 ? "Next" : "Order Now"}
                    type={1}
                    onClick={() => handleNext(stage)}
                  />
                </div>
              </div>
            </ModalOptions>
          )}
          <Sidebar />
          <div className="layoutt__content">
            <Topnav />
            <div className="layoutt__content-main">
              <Outlet />
            </div>
          </div>
        </div>
      );
    }
  };
  const router = createBrowserRouter([
    {
      element: <RequireAuth Component={PrivateRoutes} />,
      // element: <PrivateRoutes />,
      children: [
        //     {
        //       path: "/addpackage", element: <RolePermit Component={AddPackage} />
        //     },

        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/contacts",
          element: <Contacts />,
        },
        {
          path: "/contacts/:id",
          element: <EditContact />,
        },
        {
          path: "/orders/:id",
          element: <ManageOrder />,
        },
        {
          path: "/mypackages",
          element: <RolePermit Component={Packages} />,
        },
        {
          path: "/mypackages/:id",
          element: <RolePermit Component={EditPackage} />,
        },
        {
          path: "/users",
          element: <RolePermit Component={Customers} />,
        },
        {
          path: "/users/:id",
          element: <RolePermit Component={EditUser} />,
        },
        {
          path: "/staffs",
          element: <RolePermit Component={Staffs} />,
        },
        {
          path: "/staffs/:id",
          element: <RolePermit Component={EditStaff} />,
        },
        //     {
        //       path: "/messages", element: <Messages />
        //     },
        {
          path: "/profile",
          element: <Profile />,
        },
        //     {
        //       path: "/message/:id", element: <Message />
        //     },
        {
          path: "/dashboard",
          element: <Dashboard />,
          // element: <RolePermit Component={Dashboard} />,
        },
        //     {
        //       path: "/analytics", element: <RolePermit Component={Analytics} />
        //     },
      ],
    },
    {
      path: "/new",
      element: <RedirectIfAuthenticated Component={SignUp} />,
    },
    {
      path: "/signin",
      element: <RedirectIfAuthenticated Component={SignIn} />,
    },
    {
      path: "/passreset",
      element: <RedirectIfAuthenticated Component={PassReset} />,
    },
    // {
    //   path: "register", element: <RedirectIfAuthenticated Component={Register} />
    // },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/services",
          element: <Services />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
