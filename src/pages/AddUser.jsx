import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { handleUploadImg } from "../utils/others";
import { Button, CompleteInput } from "../components";

const AddUser = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    isVerified: false,
    verifiedBy: "",
    dob: "",
    gender: "",
    treatyCard: "",
    phone1: "",
    phone2: "",
    street: "",
    house: "",
    city: "",
    image: "",
    town: "",
    country: "",
    poBox: "",
    indigenousId: "",
    regLocation: "",
    nation: "",
    reserve: "",
    tribalCouncil: "MLTC",
    createdAt: Date.now(),
  };
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // let url = await handleUploadImg(file, formData?.firstName);

    setFormData((prevData) => ({
      ...prevData,
      // image: url,
    }));
    setFile("");
  };

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
      id: 20,
      title: "Email*",
      placeholder: "Input Your Email",
      name: "email",
      onChange: handleInputChange,
      dataLabel: formData?.email,
      value: formData?.email,
      cancel: "",
    },
    {
      id: 21,
      title: "Password*",
      placeholder: "Input Your Password",
      name: "password",
      onChange: (e) => setPassword(e.target.value),
      dataLabel: password,
      value: password,
      cancel: "",
    },
    {
      id: 3,
      title: "Cell Number*",
      placeholder: "Input Your Phone Number 1",
      name: "phone1",
      onChange: handleInputChange,
      dataLabel: formData?.phone1,
      value: formData?.phone1,
      cancel: "",
    },
    {
      id: 4,
      title: "Phone Number",
      placeholder: "Input Your Phone Number 2",
      name: "phone1",
      onChange: handleInputChange,
      dataLabel: formData?.phone2,
      value: formData?.phone2,
      cancel: "",
    },

    {
      id: 5,
      title: "Address",
      placeholder: "Input Your Address",
      name: "address",
      onChange: handleInputChange,
      dataLabel: formData?.address,
      value: formData?.address,
      cancel: "",
    },
    {
      id: 6,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: handleInputChange,
      dataLabel: formData?.street,
      value: formData?.street,
      cancel: "",
    },
    {
      id: 7,
      title: "Town",
      placeholder: "Input Your Town",
      name: "town",
      onChange: handleInputChange,
      dataLabel: formData?.town,
      value: formData?.town,
      cancel: "",
    },
    {
      id: 9,
      title: "City*",
      placeholder: "Input Your City",
      name: "city",
      onChange: handleInputChange,
      dataLabel: formData?.city,
      value: formData?.city,
      cancel: "",
    },
    {
      id: 10,
      title: "Country*",
      placeholder: "Input Your Country",
      name: "country",
      onChange: handleInputChange,
      dataLabel: formData?.country,
      value: formData?.country,
      cancel: "",
    },
    {
      id: 11,
      title: "Profile Photo",
      file,
      singleImage: true,
      name: "image",
      onChange: handleInputChange,
      dataLabel: formData?.image,
      value: formData?.image,
      onChangeFile: handleImg,
      handleUpload: handleUpload,
      cancel: "",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData?.firstName === "") {
        toast.error("First Name is required");
        return;
      } else if (formData?.lastName === "") {
        toast.error("Last Name is required");
        return;
      } else if (formData?.email === "") {
        toast.error("Email is required");
        return;
      } else if (password === "") {
        toast.error("Password is required");
        return;
      } else if (formData?.nation === "") {
        toast.error("Nation is required");
        return;
      } else if (formData?.reserve === "") {
        toast.error("Select reserve");
        return;
      }
      setLoading(true);
      formData.createdAt = Date.now();
      const email = formData?.email;
      // const newUser = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // if (newUser) {
      //   await updateProfile(newUser?.user, {
      //     displayName: formData?.firstName + " " + formData?.lastName,
      //   }).catch((err) => {
      //     console.log(err);
      //     setLoading(false);
      //   });
      //   await sendEmailVerification(newUser?.user).catch((err) => {
      //     console.log(err);

      //     setLoading(false);
      //   });
      //   await ProjectDataService.addUser(formData, newUser?.user?.uid);
      // }
      // //update user added
      // await ProjectDataService.updateManager(managerProfile?.id, {
      //   usersAdded: managerProfile?.usersAdded + 1,
      //   updatedAt: Date.now(),
      // });

      // //fetch users
      // await fetchUsers(dispatch, managerProfile);
      // await fetchManagers(dispatch, managerProfile);
      // setLoading(false);
      // toast.success("Registration Success");
      // //   navigate("/users");
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-header">Create New Account</h2>
      <div className="row1">
        <div className="">
          <div className="row1">
            {InputDataInfo.map((val) => (
              <div className="coll-4" key={val.id}>
                <CompleteInput
                  title={val.title}
                  placeholder={val.placeholder}
                  name={val.name}
                  onChange={val.onChange}
                  handleUpload={val.handleUpload}
                  dataLabel={val.dataLabel}
                  value={val.value}
                  cancel={val.cancel}
                  select={val.select}
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
        {/*addRevLoaded && <LoadingBox circle/> */}
      </div>
      <div className="modalFooter">
        <Button
          type={1}
          loading={loading}
          onClick={handleSubmit}
          title={`Save ${
            formData?.firstName === "" ? " New User" : formData?.firstName
          }`}
        />
        <Button onClick={() => navigate("/users")} title={`Back`} />
      </div>
    </div>
  );
};

export default AddUser;
