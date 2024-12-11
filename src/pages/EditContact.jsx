import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CompleteInput from "../components/completeInput";
import ModalOptions from "../components/modalOption";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp } from "../utils/others";
import {
  useDeleteContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "../redux/slice/contact";
import { countryData } from "../data/countries";
import { Button } from "../components";

const EditContact = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const dispatch = useDispatch();

  const contactId = pathname.slice(10);

  const {
    data: contactData,
    isFetching: contactFetching,
    isLoading: contactLoading,
    // isSuccess: contactSuccess,
  } = useGetContactQuery(contactId);
  const [deleteContact] = useDeleteContactMutation(contactId);
  const [updateContact] = useUpdateContactMutation();

  // console.log("contactLoading", contactLoading);
  // console.log("contactLoading1", contactLoading1);

  const [formData, setFormData] = useState(contactData?.contact);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactData?.success) {
      setFormData(contactData?.contact);
    }
  }, []);

  //get user profile & manager profile
  //  const myProfile = useSelector((state) => state?.auth?.profile);

  const handleInputContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteContact = async (e) => {
    e.preventDefault();
    try {
      const delContact = await deleteContact(contactId).unwrap();
      console.log(delContact);
      if (delContact?.success) {
        toast.success("Contact deleted");
        setOpenModal(!openModal);
        setLoading(false);
        navigate("/contacts");
      }
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured while updating contact"
      );
      setLoading(false);
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let payload = {
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        address: formData?.address,
        city: formData?.city,
        state: formData?.state,
        country: formData?.country,
        continent: formData?.continent,
        status: formData?.status,
        updatedAt: Date.now(),
      };
      const upContact = await updateContact({
        payload,
        id: contactId,
      }).unwrap();

      if (upContact?.success) {
        toast.success("Contact updated");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured while updating contact"
      );
      setLoading(false);
      // console.log(error);
    }
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  return (
    <div className="containerr" onClick={closeModal}>
      {contactFetching ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <h2>{"Manage Contact"}</h2>
          <div className="flexx">
            <span className="desc">
              Contact was created on{" "}
              {" " + convertTimeStamp(formData?.createdAt)}{" "}
              {formData?.updatedAt === null || formData?.updatedAt === ""
                ? " has never been modified"
                : " and updated on " + convertTimeStamp(formData?.updatedAt)}
            </span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="name"
                  title={"Name"}
                  type="text"
                  onChange={handleInputContactChange}
                  dataLabel={formData?.name}
                  value={formData?.name}
                  cancel={contactData?.contact?.name}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="email"
                  title={"Email"}
                  onChange={handleInputContactChange}
                  type="text"
                  dataLabel={formData?.email}
                  value={formData?.email}
                  cancel={contactData?.contact?.email}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="phone"
                  title={"Phone"}
                  type="text"
                  onChange={handleInputContactChange}
                  dataLabel={formData?.phone}
                  value={formData?.phone}
                  cancel={contactData?.contact?.phone}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="address"
                  title={"Address"}
                  type="text"
                  onChange={handleInputContactChange}
                  dataLabel={formData?.address}
                  value={formData?.address}
                  cancel={contactData?.contact?.address}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="city"
                  title={"City"}
                  type="text"
                  onChange={handleInputContactChange}
                  dataLabel={formData?.city}
                  value={formData?.city}
                  cancel={contactData?.contact?.city}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="state"
                  title={"State"}
                  type="text"
                  onChange={handleInputContactChange}
                  dataLabel={formData?.state}
                  value={formData?.state}
                  cancel={contactData?.contact?.state}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="country"
                  title={"Country"}
                  type="text"
                  onChange={handleInputContactChange}
                  select
                  data={countryData}
                  dataLabel={formData?.country}
                  value={formData?.country}
                  cancel={contactData?.contact?.country}
                />
              </div>

              <div className="coll-6">
                <CompleteInput
                  name="continent"
                  title={"Continent"}
                  onChange={handleInputContactChange}
                  type="text"
                  dataLabel={formData?.continent}
                  value={formData?.continent}
                  cancel={contactData?.contact?.continent}
                />
              </div>
            </div>
        
            {/* <span className="small status_green pad">
              This contact is available for {" " + formData?.nation}
            </span> */}
          </div>

          <div className="modalFooter">
            <Button
              type={1}
              loading={loading}
              title="Update"
              onClick={handleUpdateContact}
            />
            <Button
              type={2}
              loading={loading}
              title="Delete Contact"
              onClick={() => setOpenModal(!openModal)}
              // onClick={handleUpdateContact}
            />

            <button
              className="modalFooterBtn1"
              onClick={() => navigate("/contacts")}
            >
              {"Back"}
            </button>
          </div>
        </div>
      )}
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Delete this Contact"}
          btnText={"Delete"}
          cancel={"Cancel"}
          handleOption={handleDeleteContact}
          bg
        >
          <div className="flexx">
            <span className="desc">Contact {formData?.name}</span>
            <span className="small">Contact will be permanently deleted</span>
          </div>
        </ModalOptions>
      )}
    </div>
  );
};

export default EditContact;
