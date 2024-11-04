import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Lottie from "lottie-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { serverTimestamp, Timestamp } from "firebase/firestore";

import animation8 from "../assets/animations/animation8.json"; // no data 2 cirlce
import animation12 from "../assets/animations/animation12.json"; // loading 2 cirlce
import ProjectDataService from "../utils/firebaseUtils";
import { CompleteInput, LoadingBox ,ModalOptions} from "../components";
import { reserveData } from "../data/registerData";
import { locationData } from "../data/locationData";
import {
  coldLakeData,
  lloydministerData,
  meadowLakeData,
  northBattlefordData,
  princeAlbertaData,
  reginaData,
  saskatoonData,
} from "../data/motelData";
import { familyData, genderData } from "../data/genderData";
import {
  damageData,
  eventData,
  serviceData,
  supportData,
  yesOrNoData,
} from "../data/supportData";
import { convertTimeStamp, getPercentage } from "../utils/others";

const Evaluations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const profile = useSelector((state) => state?.auth?.evalUser);

  const [housePercentage, setHousePercentage] = useState(0);
  const [supportPercentage, setSupportPercentage] = useState(0);
  const [familyPercentage, setFamilyPercentage] = useState(0);
  const [dobH, setDobH] = useState("");
  const [dobF, setDobF] = useState("");

  const activeStyle = (buttonIndex) => {
    if (activeIndex === buttonIndex) return "tab active";
    return "tab";
  };
  const handleActiveButton = (index) => {
    setActiveIndex(index);
  };

  const initialDataS = {
    userId: id,
    altAccomodation: "",
    insured: "",
    asstMeals: "",
    asstCloths: "",
    driveVehicle: "",
    pressMedication: "",
    pharmacy: "",
    mobileEquipment: "",
    visualHearingAids: "",
    aidPresent: "",
    additionalSupport: "",
    contactConsent: "",
    supportId: "",
    supportType: "",
    idCard: "",
    eventOther: "",
    damage: "",
    eventType: "",
    service: [],
    serviceOther: "",
    updatedAt: "",
    createdAt: serverTimestamp(),
  };
  const initialDataH = {
    firstName: "",
    lastName: "",
    email: "",
    userId: id,
    preferName: "",
    dob: "",
    gender: "",
    treatyCard: "",
    cellPhone: "",
    homePhone: "",
    street: "",
    house: "",
    city: "",
    location: "",
    motelOther: "",
    motel: "",
    poBox: "",
    indigenousID: "",
    regLocation: "",
    reserve: "",
    room: "",
    updatedAt: "",
    createdAt: serverTimestamp(),
  };

  const initialDataF = {
    dob: "",
    firstName: "",
    lastName: "",
    gender: "",
    middleName: "",
    createdAt: "",
    updatedAt: "",
    userId: id,
    id: "",
  };
  const [loading, setLoading] = useState(false);
  const [houseloading, setHouseLoading] = useState(false);
  const [familyLoading, setFamilyLoading] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);
  const [error, setError] = useState("");
  const [houseQue, setHouseQue] = useState([]);
  const [supportQue, setSupportQue] = useState([]);
  const [formData, setFormData] = useState(initialDataH);
  const [formDataSupport, setFormDataSupport] = useState(initialDataS);
  const [formDataFamily, setFormDataFamily] = useState(initialDataF);
  const [file, setFile] = useState("");
  const [fileS, setFileS] = useState("");
  //  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const managerProfile = useSelector((state) => state?.auth?.manager);
  const themeReducer = useSelector((state) => state.theme.mode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputSChange = (e) => {
    const { name, value } = e.target;
    setFormDataSupport((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let hdate = new Date(dobH);
  let fdate = new Date(dobF);

  const handleInputFChange = (e) => {
    const { name, value } = e.target;
    setFormDataFamily((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };
  const handleImgS = (e) => {
    setFileS(e.target.files[0]);
  };

  const handleUpload = async () => {
    let url = ""; //await uploadFile(file);

    setFormData((prevData) => ({
      ...prevData,
      image: url,
    }));
    setFile("");
  };

  const motelData =
    formData?.location === "Saskatoon"
      ? saskatoonData
      : formData?.location === "Lloydminster"
      ? lloydministerData
      : formData?.location === "Regina"
      ? reginaData
      : formData?.location === "Meadow Lake"
      ? meadowLakeData
      : formData?.location === "Prince Albert"
      ? princeAlbertaData
      : formData?.location === "Cold Lake"
      ? coldLakeData
      : formData?.location === "North Battleford"
      ? northBattlefordData
      : [];

  const GetHouseQuesData = async () => {
    try {
      const getHouseSnap = await ProjectDataService?.gethouseQuestion(
        profile?.houseQuestionId
      );

      setHouseQue(getHouseSnap?.data());
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    setHouseLoading(true);
    GetHouseQuesData();
    setHouseLoading(false);
  }, []);

  const GetSupportQuesData = async () => {
    try {
      const getSupportSnap = await ProjectDataService?.getsupportQuestion(
        profile?.supportQuestionId
      );

      setSupportQue(getSupportSnap?.data());
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    setSupportLoading(true);
    GetSupportQuesData();
    setSupportLoading(false);
  }, []);

  useEffect(() => {
    if (profile?.houseQuestionId) {
      setFormData(houseQue);
    }
  }, [profile?.houseQuestionId, houseQue]);

  useEffect(() => {
    if (profile?.supportQuestionId) {
      setFormDataSupport(supportQue);
    }
  }, [profile?.supportQuestionId, supportQue]);

  const handleSaveHouse = async () => {
    if (formData?.lastName === "") {
      setError("Last Name is required");
      toast.error("Last Name is required");
      return;
    } else if (formData?.lastName?.length < 3) {
      setError("Enter a valid Last Name");
      toast.error("Enter a valid Last Name");
      return;
    } else if (formData?.firstName === "") {
      setError("First Name is required");
      toast.error("First Name is required");
      return;
    } else if (formData?.firstName?.length < 3) {
      setError("Enter a valid First Name");
      toast.error("Enter a valid First Name");
      return;
    } else if (formData?.gender === "") {
      setError("Gender is required");
      toast.error("Select Gender");
      return;
    }
    setLoading(true);
    try {
      if (profile?.houseQuestionId === "" || !profile?.houseQuestionId) {
        let payload = {
          lastName: formData?.lastName,
          firstName: formData?.firstName,
          email: formData?.email,
          dob: Timestamp.fromDate(hdate),
          cellPhone: formData?.cellPhone,
          homePhone: formData?.homePhone,
          poBox: formData?.poBox,
          city: formData?.city,
          gender: formData?.gender,
          street: formData?.street,
          house: formData?.house,
          reserve: formData?.reserve,
          preferName: formData?.preferName,
          indigenousID: formData?.indigenousID,
          location: formData?.location,
          motel: formData?.motel,
          motelOther: formData?.motel === "Others" ? formData?.motelOther : "",
          room: formData?.room,
          treatyCard: formData?.treatyCard,
          userId: id,
          createdAt: serverTimestamp(),
          updatedAt: "",
        };
        const newhouseQuestion = await ProjectDataService.addhouseQuestion(
          payload
        );
        await ProjectDataService.updateUser(id, {
          houseQuestionId: newhouseQuestion?.id,
        });
        GetHouseQuesData();
        toast.success("House Data Added successfully");
        setLoading(false);
      } else {
        let payload = {
          lastName: formData?.lastName,
          firstName: formData?.firstName,
          email: formData?.email,
          dob: dobH ? Timestamp.fromDate(hdate) : formData?.dob,
          cellPhone: formData?.cellPhone,
          homePhone: formData?.homePhone,
          poBox: formData?.poBox,
          city: formData?.city,
          gender: formData?.gender,
          street: formData?.street,
          house: formData?.house,
          reserve: formData?.reserve,
          preferName: formData?.preferName,
          indigenousID: formData?.indigenousID,
          location: formData?.location,
          motel: formData?.motel,
          motelOther: formData?.motel === "Others" ? formData?.motelOther : "",
          room: formData?.room,
          treatyCard: formData?.treatyCard,
          updatedAt: serverTimestamp(),
        };
        //get
        await ProjectDataService.updatehouseQuestion(
          profile?.houseQuestionId,
          payload
        );
        // get profile with new data
        GetHouseQuesData();
        toast.success("House-hold Updated successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error Occured");
      setLoading(false);
    }
  };

  const handleSaveSupport = async () => {
    setLoading(true);
    try {
      if (profile?.supportQuestionId === "" || !profile?.supportQuestionId) {
        let payload = {
          insured: formDataSupport?.insured,
          altAccomodation: formDataSupport?.altAccomodation,
          asstMeals: formDataSupport?.asstMeals,
          asstCloths: formDataSupport?.asstCloths,
          driveVehicle: formDataSupport?.driveVehicle,
          pressMedication: formDataSupport?.pressMedication,
          pharmacy: formDataSupport?.pharmacy,
          mobileEquipment: formDataSupport?.mobileEquipment,
          visualHearingAids: formDataSupport?.visualHearingAids,
          aidPresent: formDataSupport?.aidPresent,
          additionalSupport: formDataSupport?.additionalSupport,
          supportType: formDataSupport?.supportType,
          supportId: formDataSupport?.supportId,
          service: formDataSupport?.service,
          damage: formDataSupport?.damage,
          eventType: formDataSupport?.eventType,
          eventOther: formDataSupport?.eventOther,
          serviceOther: formDataSupport?.serviceOther,
          contactConsent: formDataSupport?.contactConsent,
          idCard: fileS ? fileS?.imageUrl : formDataSupport?.idCard,
          userId: id,
          createdAt: serverTimestamp(),
          updatedAt: "",
        };
        const newSupportQuestion = await ProjectDataService.addsupportQuestion(
          payload
        );
        await ProjectDataService.updateUser(id, {
          supportQuestionId: newSupportQuestion?.id,
        });
        GetSupportQuesData();
        toast.success("Support Data Added successfully");
        setLoading(false);
      } else {
        let payload = {
          insured: formDataSupport?.insured,
          altAccomodation: formDataSupport?.altAccomodation,
          asstMeals: formDataSupport?.asstMeals,
          asstCloths: formDataSupport?.asstCloths,
          driveVehicle: formDataSupport?.driveVehicle,
          pressMedication: formDataSupport?.pressMedication,
          pharmacy: formDataSupport?.pharmacy,
          mobileEquipment: formDataSupport?.mobileEquipment,
          visualHearingAids: formDataSupport?.visualHearingAids,
          aidPresent: formDataSupport?.aidPresent,
          additionalSupport: formDataSupport?.additionalSupport,
          supportType: formDataSupport?.supportType,
          supportId: formDataSupport?.supportId,
          service: formDataSupport?.service,
          damage: formDataSupport?.damage,
          eventType: formDataSupport?.eventType,
          eventOther: formDataSupport?.eventOther,
          serviceOther: formDataSupport?.serviceOther,
          contactConsent: formDataSupport?.contactConsent,
          idCard: fileS ? fileS?.imageUrl : formDataSupport?.idCard,
          updatedAt: serverTimestamp(),
        };
        //get
        await ProjectDataService.updatesupportQuestion(
          profile?.supportQuestionId,
          payload
        );
        // get profile with new data
        GetSupportQuesData();
        toast.success("Support Updated successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error Occured");
      setLoading(false);
    }
  };

  function handleKeyDown(e) {
    const { value } = e.target;
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setFormDataSupport((prevData) => ({
      ...prevData,
      service: [...prevData.service, value],
    }));

    // Clear the input
    e.target.value = "";
  }
  function removeTag(index) {
    setFormDataSupport((prevData) => ({
      ...prevData,
      service: prevData.service.filter((el, i) => i !== index),
    }));
  }
  const InputDataFamInfo = [
    {
      id: 1,
      title: "First Name*",
      placeholder: "Input Your FirstName",
      name: "firstName",
      onChange: handleInputFChange,
      dataLabel: formDataFamily?.firstName,
      value: formDataFamily?.firstName,
      cancel: "",
    },
    {
      id: 2,
      title: "Last Name*",
      placeholder: "Input Your Family Name",
      name: "lastName",
      onChange: handleInputFChange,
      dataLabel: formDataFamily?.lastName,
      value: formDataFamily?.lastName,
      cancel: "",
    },

    {
      id: 3,
      title: "Middle Name",
      placeholder: "Input Other Name",
      name: "middleName",
      onChange: handleInputFChange,
      dataLabel: formDataFamily?.middleName,
      value: formDataFamily?.middleName,
      cancel: "",
    },
    {
      id: 4,
      title: "Family Relationship*",
      placeholder: "Select Family Role",
      name: "gender",
      data: familyData,
      onChange: handleInputFChange,
      dataLabel: formDataFamily?.gender,
      value: formDataFamily?.gender,
      cancel: "",
      select: true,
    },
    {
      id: 5,
      title: "Date Of Birth",
      placeholder: "Select Date Of Birth",
      name: "dob",
      onChange: setDobF,
      dataLabel: dobF
        ? fdate?.toDateString()
        : formDataFamily?.dob
        ? convertTimeStamp(formDataFamily?.dob)
        : formDataFamily?.dob,
      value: formDataFamily?.dob
        ? convertTimeStamp(formDataFamily?.dob)
        : formDataFamily?.dob,
      cancel: "",
    },
  ];

  const InputDataInfoSupport = [
    {
      id: 1,
      title: "Is your home privately insured for content coverage?",
      placeholder: "Is your home privately insured for content coverage?",
      name: "insured",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.insured,
      value: formDataSupport?.insured,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 2,
      title:
        "Are any of the following support required? Alternative Accomodations?",
      placeholder: "Are any of the following support required? ",
      name: "lastName",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.altAccomodation,
      value: formDataSupport?.altAccomodation,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 3,
      title: "Assistance with meals?",
      placeholder: "Assistance with meals?",
      name: "asstMeals",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.asstMeals,
      value: formDataSupport?.asstMeals,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 4,
      title: "Assistance with clothing and toiletries?",
      placeholder: "Assistance with clothing and toiletries?",
      name: "indigenousID",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.asstCloths,
      value: formDataSupport?.asstCloths,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 5,
      title:
        "Did you drive your own vehicle out of the evacuation, travel by bus, or catch a ride with friends/ family (other)?",
      placeholder: "input mode of transportation",
      name: "driveVehicle",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.driveVehicle,
      value: formDataSupport?.driveVehicle,
      cancel: houseQue?.driveVehicle || "",
    },
    {
      id: 6,
      title: "Do you have your prescription medication?",
      placeholder: "Input Prescription",
      name: "pressMedication",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.pressMedication,
      value: formDataSupport?.pressMedication,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 7,
      title: "Please provide the name of your regular pharmacy",
      placeholder: "Input Pharmacy",
      name: "pharmacy",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.pharmacy,
      value: formDataSupport?.pharmacy,
      cancel: "",
    },
    {
      id: 8,
      title: "Do you require personal mobility equipment/devices?",
      placeholder: "Do you require personal mobility equipment/devices?",
      name: "visualHearingAids",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.visualHearingAids,
      value: formDataSupport?.visualHearingAids,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 9,
      title: "Do you have those aids with you?",
      placeholder: "Do you have those aids with you?",
      name: "aidPresent",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.aidPresent,
      value: formDataSupport?.aidPresent,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 10,
      title:
        "Does any one in your household need additional support to cope emotionally with disaster impacts?( i.e. support groups/ counselling)",
      placeholder: "Input Additonal support",
      name: "additionalSupport",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.additionalSupport,
      value: formDataSupport?.additionalSupport,
      cancel: "",
      select: true,
      data: yesOrNoData,
    },
    {
      id: 11,
      title: "What Service(s) may help the household/ individual?",
      placeholder: "Choose Service",
      name: "service",
      data: serviceData,
      features: true,
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.service,
      value: formDataSupport?.service,
      cancel: [],
      removeTag: removeTag,
      handleKeyDown: handleKeyDown,
    },
    {
      id: 12,
      title:
        "Can other members of your household who inquire about you be given your contact information?",
      placeholder: "Select Consent",
      name: "contactConsent",
      data: yesOrNoData,
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.contactConsent,
      value: formDataSupport?.contactConsent,
      cancel: "",
      select: true,
    },
    {
      id: 13,
      title: "How would like to receive the support?",
      placeholder: "How would like to receive the support?",
      name: "supportType",
      data: supportData,
      select: true,
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.supportType,
      value: formDataSupport?.supportType,
      cancel: "",
    },
    {
      id: 14,
      title: "Damage Classification?",
      placeholder: "Select Damage Classification",
      name: "damage",
      data: damageData,
      select: true,
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.damage,
      value: formDataSupport?.damage,
      cancel: "",
    },
    {
      id: 15,
      title: "Type Of Event",
      placeholder: "Select Event Type",
      name: "eventType",
      data: eventData,
      select: true,
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.eventType,
      value: formDataSupport?.eventType,
      cancel: "",
    },
    {
      id: 16,
      title: `What is your ${
        formDataSupport?.supportType
          ? formDataSupport?.supportType
          : "supportType"
      }  id`,
      placeholder: "Select Support Type",
      name: "supportId",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.supportId,
      value: formDataSupport?.supportId,
      cancel: "",
    },
    {
      id: 17,
      title: "ID Card",
      file,
      singleImage: true,
      name: "idCard",
      onChange: handleInputSChange,
      dataLabel: formDataSupport?.idCard,
      value: formDataSupport?.idCard,
      onChangeFile: handleImgS,
      cancel: "",
    },
  ];

  const InputDataInfo = [
    {
      id: 1,
      title: "First Name*",
      placeholder: "Input Your FirstName",
      name: "firstName",
      onChange: handleInputChange,
      dataLabel: formData?.firstName,
      value: formData?.firstName,
      cancel: "",
    },
    {
      id: 2,
      title: "Last Name*",
      placeholder: "Input Your Family Name",
      name: "lastName",
      onChange: handleInputChange,
      dataLabel: formData?.lastName,
      value: formData?.lastName,
      cancel: "",
    },
    {
      id: 3,
      title: "Email*",
      placeholder: "Input Your Email",
      name: "email",
      onChange: handleInputChange,
      dataLabel: formData?.email,
      value: formData?.email,
      cancel: "",
    },
    {
      id: 4,
      title: "indigeous ID",
      placeholder: "Input Your Indegenuous ID",
      name: "indigenousID",
      onChange: handleInputChange,
      dataLabel: formData?.indigenousID,
      value: formData?.indigenousID,
      cancel: "",
    },
    {
      id: 5,
      title: "Cell Number*",
      placeholder: "Input Your Phone Number 1",
      name: "cellPhone",
      onChange: handleInputChange,
      dataLabel: formData?.cellPhone,
      value: formData?.cellPhone,
      cancel: "",
    },
    {
      id: 6,
      title: "Phone Number",
      placeholder: "Input Your Phone Number",
      name: "homePhone",
      onChange: handleInputChange,
      dataLabel: formData?.homePhone,
      value: formData?.homePhone,
      cancel: "",
    },
    {
      id: 7,
      title: "reserve*",
      placeholder: "Select Reserve",
      name: "reserve",
      data: reserveData,
      onChange: handleInputChange,
      dataLabel: formData?.reserve,
      value: formData?.reserve,
      cancel: "",
      select: true,
    },
    {
      id: 8,
      title: "Address",
      placeholder: "Input Your Address",
      name: "address",
      onChange: handleInputChange,
      dataLabel: formData?.address,
      value: formData?.address,
      cancel: "",
    },
    {
      id: 9,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: handleInputChange,
      dataLabel: formData?.street,
      value: formData?.street,
      cancel: "",
    },
    {
      id: 10,
      title: "Treaty Card",
      placeholder: "Input Your Treaty Card",
      name: "treatyCard",
      onChange: handleInputChange,
      dataLabel: formData?.treatyCard,
      value: formData?.treatyCard,
      cancel: "",
    },
    {
      id: 11,
      title: "Preferred Name*",
      placeholder: "Preferred Name",
      name: "preferName",
      onChange: handleInputChange,
      dataLabel: formData?.preferName,
      value: formData?.preferName,
      cancel: "",
    },
    {
      id: 12,
      title: "City*",
      placeholder: "Input Your City",
      name: "city",
      onChange: handleInputChange,
      dataLabel: formData?.city,
      value: formData?.city,
      cancel: "",
    },
    {
      id: 13,
      title: "Location*",
      placeholder: "Select Location",
      name: "location",
      data: locationData,
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.location,
      value: formData?.location,
      cancel: "",
    },
    {
      id: 14,
      title: "Shelter/ Hotel/ Motel*",
      placeholder: "Select Motel",
      name: "motel",
      data: motelData,
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.motel,
      value: formData?.motel,
      cancel: "",
    },

    {
      id: 15,
      title: "Room*",
      placeholder: "Please enter room",
      name: "room",

      onChange: handleInputChange,
      dataLabel: formData?.room,
      value: formData?.room,
      cancel: "",
    },
    {
      id: 16,
      title: "PO Box",
      placeholder: "Input PO Box",
      name: "poBox",
      onChange: handleInputChange,
      dataLabel: formData?.poBox,
      value: formData?.poBox,
      cancel: "",
    },
    {
      id: 17,
      title: "House Number",
      placeholder: "Input House Number",
      name: "house",
      onChange: handleInputChange,
      dataLabel: formData?.house,
      value: formData?.house,
      cancel: "",
    },
    {
      id: 18,
      title: "Date Of Birth",
      placeholder: "Select Date Of Birth",
      name: "dob",
      onChange: setDobH,
      dataLabel: dobH
        ? hdate?.toDateString()
        : formData?.dob
        ? convertTimeStamp(formData?.dob)
        : formData?.dob,
      value: formData?.dob ? convertTimeStamp(formData?.dob) : formData?.dob,
      date: true,
      cancel: "",
    },
    {
      id: 19,
      title: "Gender*",
      placeholder: "Select Gender",
      name: "gender",
      data: genderData,
      onChange: handleInputChange,
      dataLabel: formData?.gender,
      value: formData?.gender,
      cancel: "",
      select: true,
    },
  ];

  const chartOptions = {
    seriesH: [45],
    series: [45],
    seriesS: [85],
    options: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "transparent",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: themeReducer === "theme-mode-dark" ? "#2d2d2d" : "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -20,
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              formatter: function (val) {
                return val;
              },
              // color: "#111",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  };

  const [familyId, setFamilyId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showFamily, setShowFamily] = useState(
    profile?.familyQuestionId === undefined ||
      profile?.familyQuestionId === "" ||
      profile?.familyQuestionId === 0
      ? false
      : true
  );

  useEffect(() => {
    if (familyMembers?.length === 0) {
      setShowFamily(false);
    }
  }, [familyMembers.length]);

  const [refreshActive, setRefreshActive] = useState(false);

  const handleAddFamily = () => {
    //  setShowFamily(!showFamily);
    setFamilyId("");
    setRefreshActive(true);
    setFormDataFamily({
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      dob: "",
    });

    setTimeout(() => {
      setRefreshActive(false);
    }, 2000);
  };

  const getFamFunc = async () => {
    setFamilyLoading(true);
    const getFamilySnap = await ProjectDataService.getfamilyQuestionsByUserId(
      id
    );

    setFamilyMembers(
      getFamilySnap.docs.map((doc) => ({
        ...doc?.data(),
        id: doc?.id,
      }))
    );
    setFamilyLoading(false);
  };

  const deleteFamModal = (item) => {
    setFamilyId(item?.id);
    if (!item?.id) {
      toast.error("Add Family and Select to delete");
      return;
    }
    setShowModal(true);
  };

  const handleDeleteFamily = async () => {
    setLoading(true);
    try {
      if (familyId.length > 3) {
        await ProjectDataService.deletefamilyQuestion(familyId);
        getFamFunc();
        const getFamilySnap =
          await ProjectDataService.getfamilyQuestionsByUserId(id);
        let num =
          profile?.familyQuestionId === ""
            ? 0
            : profile?.familyQuestionId === undefined
            ? 0
            : profile?.familyQuestionId;
        await ProjectDataService.updateUser(id, {
          familyQuestionId: num + 1,
        });
        setFamilyMembers(
          getFamilySnap.docs.map((doc) => ({
            ...doc?.data(),
            id: doc?.id,
          }))
        );
        toast.success("Family Deleted successfully");
        setFamilyId("");
        setShowModal(!showModal);
        setLoading(false);
      }
    } catch (error) {
      setFamilyId("");
      toast.error(error?.message ? error?.message : "Error Occured");
      setLoading(false);
    }
  };

  const handleEditFamily = (item) => {
    setFormDataFamily(item);
    setFamilyId(item?.id);
  };

  useEffect(() => {
    getFamFunc();
  }, []);

  const handleSaveFam = async () => {
    if (formDataFamily?.lastName === "") {
      setError("Last Name is required");
      toast.error("Last Name is required");
      return;
    } else if (formDataFamily?.lastName?.length < 3) {
      setError("Enter a valid Last Name");
      toast.error("Enter a valid Last Name");
      return;
    } else if (formDataFamily?.firstName === "") {
      setError("First Name is required");
      toast.error("First Name is required");
      return;
    } else if (formDataFamily?.firstName?.length < 3) {
      setError("Enter a valid First Name");
      toast.error("Enter a valid First Name");
      return;
    } else if (formDataFamily?.gender === "") {
      setError("Family relationship is required");
      toast.error("Select Family relationship");
      return;
    }
    try {
      setLoading(true);

      if (familyId === "") {
        let payload = {
          lastName: formDataFamily?.lastName,
          firstName: formDataFamily?.firstName,
          middleName: formDataFamily?.middleName,
          gender: formDataFamily?.gender,
          dob: Timestamp.fromDate(fdate),
          userId: id,
          createdAt: serverTimestamp(),
          updatedAt: "",
        };

        await ProjectDataService.addfamilyQuestion(payload);
        // update user
        let num =
          profile?.familyQuestionId === ""
            ? 0
            : profile?.familyQuestionId === undefined
            ? 0
            : profile?.familyQuestionId;
        await ProjectDataService.updateUser(id, {
          familyQuestionId: num + 1,
        });
        // get profile with new data

        const getFamilySnap =
          await ProjectDataService.getfamilyQuestionsByUserId(id);

        setFamilyMembers(
          getFamilySnap.docs.map((doc) => ({
            ...doc?.data(),
            id: doc?.id,
          }))
        );

        toast.success("Family Added successfully");
        // setShowFamily(true);
        setFormDataFamily({
          firstName: "",
          lastName: "",
          middleName: "",
          gender: "",
          dob: "",
        });
        setLoading(false);
      } else {
        let payload = {
          lastName: formDataFamily?.lastName,
          firstName: formDataFamily?.firstName,
          middleName: formDataFamily?.middleName,
          dob: dobF ? Timestamp.fromDate(fdate) : formDataFamily?.dob,
          gender: formDataFamily?.gender,
          updatedAt: serverTimestamp(),
        };
        //get

        await ProjectDataService.updatefamilyQuestion(familyId, payload);
        // get profile with new data

        const getFamilySnap =
          await ProjectDataService.getfamilyQuestionsByUserId(id);

        setFamilyMembers(
          getFamilySnap.docs.map((doc) => ({
            ...doc?.data(),
            id: doc?.id,
          }))
        );
        toast.success("Family Updated successfully");
        setFormDataFamily({
          firstName: "",
          lastName: "",
          middleName: "",
          gender: "",
          dob: "",
        });
        // setShowFamily(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error Occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError("");
      }
    }, 2500);
  }, [error]);

  useEffect(() => {
    if (
      profile?.houseQuestionId === "" ||
      profile?.houseQuestionId === undefined
    ) {
      setHousePercentage(0);
    } else {
      if (houseQue === undefined || houseQue === null) {
        setHousePercentage(0);
      } else {
        const percent = getPercentage(houseQue);
        setHousePercentage(percent);
      }
    }
  }, [houseQue, profile?.houseQuestionId]);

  useEffect(() => {
    if (
      profile?.supportQuestionId === "" ||
      profile?.supportQuestionId === undefined
    ) {
      setSupportPercentage(0);
    } else {
      if (supportQue === undefined || supportQue === null) {
        setSupportPercentage(0);
      } else {
        const percent = getPercentage(supportQue);
        setSupportPercentage(percent);
      }
    }
  }, [supportQue, profile?.supportQuestionId]);

  useEffect(() => {
    if (familyMembers?.length < 1) {
      setFamilyPercentage(0);
    } else {
      if (familyMembers === undefined || familyMembers === null) {
        setFamilyPercentage(0);
      } else {
        const percent = getPercentage(familyMembers[0]);
        setFamilyPercentage(percent);
      }
    }
  }, [familyMembers, profile?.familyQuestionId]);

  return (
    <div className="evaluations">
      <h2>Evaluation for {" " + profile?.firstName}</h2>
      <div className="tabControl">
        <hr className="divider" />
        <div onClick={() => handleActiveButton(0)} className={activeStyle(0)}>
          <i className="bx bx-home"></i>
          <span>House-Hold</span>
        </div>
        <div onClick={() => handleActiveButton(1)} className={activeStyle(1)}>
          <i className="bx bx-user"></i>
          <span>Family Info</span>
        </div>
        <div onClick={() => handleActiveButton(2)} className={activeStyle(2)}>
          <i className="bx bx-support"></i>
          <span>Support Info</span>
        </div>
        <hr className="divider" />
      </div>

      <div className="row1">
        <div className="coll-9">
          {activeIndex === 0 ? (
            <div className="">
              {houseloading ? (
                <LoadingBox />
              ) : (
                <>
                  <div className="">
                    <div className="note">
                      <span>
                        Please note that, this is House Representative
                        Information
                      </span>
                    </div>
                    <span className="smallInfoText">
                      {!houseQue?.createdAt
                        ? "No data created, Be the first to create this evaluation "
                        : `Data was created at ${convertTimeStamp(
                            houseQue?.createdAt
                          )} and `}
                      {!houseQue?.updatedAt
                        ? "No data updated yet"
                        : `Data was updated on ${convertTimeStamp(
                            houseQue?.updatedAt
                          )}`}
                    </span>
                    <div className="row1">
                      {InputDataInfo.map((val) => (
                        <div className="coll-6" key={val.id}>
                          <CompleteInput
                            title={val.title}
                            placeholder={val.placeholder}
                            name={val.name}
                            onChange={val.onChange}
                            dataLabel={val.dataLabel}
                            value={val.value}
                            cancel={val.cancel}
                            select={val.select}
                            features={val.features}
                            checkbox={val.checkbox}
                            data={val.data}
                            date={val.date}
                            singleImage={val.singleImage}
                            multipleImages={val.multipleImages}
                            textarea={val.textarea}
                            type={val.type}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {error && (
                    <div className="note">
                      <span className="error">{error}</span>
                    </div>
                  )}
                  <div className="buttonContainer1">
                    <button
                      className="modalFooterBtn2"
                      onClick={() => navigate("/evaluation")}
                    >
                      Back
                    </button>
                    <button
                      disabled={loading}
                      className="modalFooterBtn1"
                      onClick={handleSaveHouse}
                    >
                      {loading ? (
                        <Lottie
                          width={35}
                          height={35}
                          className="lottieBtn"
                          animationData={animation12}
                        />
                      ) : formData?.firstName === "" ? (
                        "Add Data"
                      ) : (
                        "Update "
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : activeIndex === 1 ? (
            <div className="">
              {familyLoading ? (
                <LoadingBox />
              ) : (
                <>
                  <div className="">
                    <div className="note">
                      <span>Add Family and manage Family</span>
                    </div>

                    <div className="evaluationFamily">
                      <div className="coll-6">
                        <div className="evaluationViewFamily">
                          {familyMembers.length === 0 || !familyMembers ? (
                            <div>
                              <h2 className="evaluateTitleFam">
                                No Family Added Yet
                              </h2>
                              <Lottie animationData={animation8} />
                            </div>
                          ) : (
                            <div>
                              <div className="evaluateFamView">
                                <h2 className="">Family Members</h2>
                                <i
                                  className={
                                    refreshActive
                                      ? "bx bx-refresh refresh-active"
                                      : "bx bx-refresh"
                                  }
                                  onClick={handleAddFamily}
                                ></i>
                              </div>

                              {familyMembers.map((item) => (
                                <div key={item?.id} className="evaluationCard1">
                                  <div className="evaluationTitleRow">
                                    <div className="evaluateFamContent">
                                      <h3>
                                        {item?.firstName + " " + item?.lastName}
                                      </h3>
                                      <span>{item?.gender}</span>
                                    </div>
                                    <div>
                                      <i
                                        className="bx bx-edit"
                                        onClick={() => handleEditFamily(item)}
                                      ></i>
                                      <i
                                        className="bx bx-trash"
                                        onClick={() => deleteFamModal(item)}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="coll-6">
                        <h2 className="evaluateTitleFam">
                          {familyId === ""
                            ? "Add Family Member"
                            : "Edit " +
                              formDataFamily?.firstName +
                              " " +
                              formDataFamily?.lastName}
                        </h2>
                        <div className="row1">
                          {InputDataFamInfo.map((val) => (
                            <div className="coll-12" key={val.id}>
                              <CompleteInput
                                title={val.title}
                                placeholder={val.placeholder}
                                name={val.name}
                                onChange={val.onChange}
                                dataLabel={val.dataLabel}
                                value={val.value}
                                date={val.date}
                                cancel={val.cancel}
                                select={val.select}
                                features={val.features}
                                checkbox={val.checkbox}
                                data={val.data}
                                singleImage={val.singleImage}
                                multipleImages={val.multipleImages}
                                textarea={val.textarea}
                                type={val.type}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {error && (
                      <div className="note">
                        <span className="error">{error}</span>
                      </div>
                    )}
                    <div className="buttonContainer1">
                      <button
                        className="modalFooterBtn2"
                        onClick={() => setActiveIndex(0)}
                      >
                        Back
                      </button>
                      <button
                        disabled={loading}
                        className="modalFooterBtn1"
                        onClick={handleSaveFam}
                      >
                        {loading ? (
                          <Lottie
                            width={35}
                            height={35}
                            className="lottieBtn"
                            animationData={animation12}
                          />
                        ) : familyId === "" ? (
                          "Add Family"
                        ) : (
                          "Update " + formDataFamily?.firstName
                        )}
                      </button>
                    </div>
                  </div>
                  {showModal && (
                    <ModalOptions
                      handleCancel={() => setShowModal(!showModal)}
                      title={"Delete Family "}
                      btnText={"Delete"}
                      cancel={"Cancel"}
                      loading={loading}
                      handleOption={handleDeleteFamily}
                    >
                      <div className="flexx">
                        <span className="desc">This is Irreversible</span>
                        <div className="row1"></div>
                        <span className="small">
                          Event created by Manager will only be visible to that
                          region
                        </span>
                      </div>
                    </ModalOptions>
                  )}
                </>
              )}
            </div>
          ) : activeIndex === 2 ? (
            <div className="">
              {supportLoading ? (
                <LoadingBox />
              ) : (
                <>
                  <div className="">
                    <div className="note">
                      <span>
                        This Section comprises of Damages, Support and Incentive
                        Information
                      </span>
                    </div>
                    <span className="smallInfoText">
                      {!supportQue?.createdAt
                        ? "No data created, Be the first to create this evaluation "
                        : `Data was created at ${convertTimeStamp(
                            supportQue?.createdAt
                          )} and `}
                      {!supportQue?.updatedAt
                        ? "No data updated yet"
                        : `Data was updated on ${convertTimeStamp(
                            supportQue?.updatedAt
                          )}`}
                    </span>
                    <div className="row1">
                      {InputDataInfoSupport.map((val) => (
                        <div className="coll-6" key={val.id}>
                          <CompleteInput
                            title={val.title}
                            placeholder={val.placeholder}
                            name={val.name}
                            onChange={val.onChange}
                            dataLabel={val.dataLabel}
                            value={val.value}
                            cancel={val.cancel}
                            select={val.select}
                            features={val.features}
                            checkbox={val.checkbox}
                            data={val.data}
                            date={val.date}
                            singleImage={val.singleImage}
                            multipleImages={val.multipleImages}
                            textarea={val.textarea}
                            type={val.type}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {error && (
                    <div className="note">
                      <span className="error">{error}</span>
                    </div>
                  )}
                  <div className="buttonContainer1">
                    <button
                      className="modalFooterBtn2"
                      onClick={() => setActiveIndex(1)}
                    >
                      Back
                    </button>
                    <button
                      disabled={loading}
                      className="modalFooterBtn1"
                      onClick={handleSaveSupport}
                    >
                      {loading ? (
                        <Lottie
                          width={35}
                          height={35}
                          className="lottieBtn"
                          animationData={animation12}
                        />
                      ) : !formDataSupport.createdAt ? (
                        "Add Data"
                      ) : (
                        "Update Data"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
        <div className="coll-3">
          <div className="evaluationCard">
            <div>
              <h2 className="evaluateTitleFam"> House Evaluation</h2>
              {houseloading ? (
                <LoadingBox />
              ) : (
                <Chart
                  options={
                    themeReducer === "theme-mode-dark"
                      ? {
                          ...chartOptions.options,
                          theme: { mode: "dark" },
                        }
                      : {
                          ...chartOptions.options,
                          theme: { mode: "light" },
                        }
                  }
                  title="House Hold Percentage"
                  series={[housePercentage]}
                  type="radialBar"
                  height="100%"
                />
              )}
            </div>
          </div>
          <div className="evaluationCard">
            <div>
              <h2 className="evaluateTitleFam"> Family Evaluation</h2>
              {familyLoading ? (
                <LoadingBox />
              ) : (
                <Chart
                  options={
                    themeReducer === "theme-mode-dark"
                      ? {
                          ...chartOptions.options,
                          theme: { mode: "dark" },
                        }
                      : {
                          ...chartOptions.options,
                          theme: { mode: "light" },
                        }
                  }
                  series={[familyPercentage]}
                  //colors={["pink", "green"]}
                  //labels={["House", "Empty"]}
                  // type="donut"
                  type="radialBar"
                  height="100%"
                />
              )}
            </div>
          </div>
          <div className="evaluationCard">
            <div>
              <h2 className="evaluateTitleFam"> Support Evaluation</h2>
              {supportLoading ? (
                <LoadingBox />
              ) : (
                <Chart
                  options={
                    themeReducer === "theme-mode-dark"
                      ? {
                          ...chartOptions.options,
                          theme: { mode: "dark" },
                        }
                      : {
                          ...chartOptions.options,
                          theme: { mode: "light" },
                        }
                  }
                  series={[supportPercentage]}
                  //type="donut"
                  height="100%"
                  type="radialBar"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
