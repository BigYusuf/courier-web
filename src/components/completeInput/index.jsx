import React, { useEffect, useState } from "react";
//import Dropzone from "react-dropzone";

import "./completeInput.css";
import noAvatar from "../../assets/images/noavatar.jpg";
import MyDatePicker from "../datePicker";
//import { DeleteIcon } from '../../assets/icons/Icons'

const CompleteInput = ({
  removeTag,
  handleUpload,
  removeImage,
  handleDrop,
  handleKeyDown,
  selectedImages,
  features,
  type,
  checkbox,
  setSelectedImages,
  singleImage,
  multipleImages,
  file,
  onChangeFile,
  title,
  cancel,
  data,
  textarea,
  dataLabel,
  placeholder,
  select,
  onChange,
  value,
  name,
  placeholder2,
  onChange2,
  value2,
  name2,
  date,
}) => {
  const [active, setActive] = useState(false);
  const [reset, setReset] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (features) {
      setSelectedItems(dataLabel);
    }
  }, [features, dataLabel]);

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    // let value = parseInt(e.target.value);
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };


  const handleActive = () => {
    setActive(!active);
  };

  const handleCancel = () => {
    setReset(cancel);
    setActive(!active);
  };
  const handleSave = () => {
    setReset("");
    setActive(!active);
  };
  const handleUploadBtn = async () => {
    await handleUpload();

    setReset("");
    setActive(!active);
  };

  return (
    <div className="completeinput">
      <div className="box">
        <div className="top">
          <label htmlFor="" className="label">
            {title}
          </label>
          {!active ? (
            <div className="edit" onClick={handleActive}>
              <span className="image">
                <i className="bx bx-edit-alt"></i>
              </span>
              <span className="iconText"> Edit</span>
            </div>
          ) : (
            <div className="edit" onClick={handleCancel}>
              <span className="iconText"> Cancel</span>
            </div>
          )}
        </div>
        {active ? (
          <>
            {select ? (
              <>
                <select
                  type="text"
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="input"
                >
                  <option value=""></option>
                  {data?.map((item) => (
                    <option key={item.id} value={item?.value || item?.link}>
                      {item?.label || item?.title}
                    </option>
                  ))}
                </select>
                {value === "Others" && (
                  <>
                    <label>Input it here</label>
                    <input
                      type={type ? type : "text"}
                      name={name2}
                      placeholder={placeholder2}
                      value={value2}
                      onChange={onChange2}
                      className="input"
                    />
                  </>
                )}
              </>
            ) : features ? (
              <div className="tags-input-container">
                {data?.map((tag) => {
                  //  let active = dataLabel?.includes(tag?.value);
                  return (
                    <label className="tag-item" key={tag?.id}>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={selectedItems?.includes(tag?.value)}
                        value={tag?.value}
                        onChange={checkboxHandler}
                      />

                      <span className="text">{tag?.label}</span>
                    </label>
                  );
                })}
                {selectedItems?.filter((item) => item === "Others").length ===
                  1 && (
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    onChange2={onChange2}
                    className="tags-input"
                    value={value2}
                    placeholder={placeholder}
                  />
                )}
              </div>
            ) : date ? (
              <>
                <MyDatePicker
                  val={value}
                  finalDate={value}
                  setFinalDate={onChange}
                />
              </>
            ) : textarea ? (
              <textarea
                rows={5}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="textarea"
              ></textarea>
            ) : singleImage ? (
              <>
                <label
                  htmlFor="imagefile"
                  className="singleImage"
                  onChange={onChangeFile}
                >
                  {file ? (
                    <img
                      className="coverImage"
                      src={URL?.createObjectURL(file)}
                      alt="coverImage"
                    />
                  ) : dataLabel ? (
                    <img
                      className="coverImage"
                      src={reset ? reset : dataLabel}
                      alt="coverImage"
                    />
                  ) : (
                    <img
                      className="coverImage"
                      src={noAvatar}
                      alt="coverImage"
                    />
                  )}
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="imagefile"
                  name="imagefile"
                  onChange={onChangeFile}
                />
                <label>OR Paste Link Here</label>
                <input
                  type={type ? type : "text"}
                  name={name}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  className="input"
                />
              </>
            ) : multipleImages ? (
              <>
                {/*
                <Dropzone
                  className="dropzone"
                  onDrop={handleDrop}
                  onChange={(e) => setSelectedImages(e.target.value)}
                  value={selectedImages}
                >
                  {({ getRootProps }) => (
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <label className="multiLabel">
                          {name === "docFile" ? (
                            <>
                              + Add Docs
                              <br />
                              <span className="multiLimit">
                                up to 5 documents
                              </span>
                            </>
                          ) : (
                            <>
                              + Add Images
                              <br />
                              <span className="multiLimit">up to 5 images</span>
                            </>
                          )}
                        </label>
                      </div>
                    </section>
                  )}
                </Dropzone>
                */}
                <div className="images">
                  {dataLabel &&
                    dataLabel?.map((image, index) => {
                      return (
                        <div key={index} className="img">
                          {name === "docFile" ? (
                            <iframe
                              src={image}
                              className="smailimg"
                              height="200"
                            />
                          ) : (
                            <img
                              src={image}
                              className="smailimg"
                              height="200"
                              alt="upload"
                            />
                          )}
                          <div
                            className="delete"
                            onClick={() => removeImage(index)}
                          >
                            {/*<DeleteIcon/>*/}
                          </div>
                          <p>{index + 1}</p>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <input
                type={type ? type : "text"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input"
              />
            )}

            {multipleImages &&
              dataLabel?.length > 0 &&
              (dataLabel?.length > 5 ? (
                <p className="error">
                  {`You can't upload more than 5 images!`} <br />
                  <span>
                    please delete <b> {dataLabel?.length - 5} </b> of them{" "}
                  </span>
                </p>
              ) : (
                <button className="btn1" onClick={handleSave}>
                  Save
                </button>
              ))}
            {singleImage ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button className="btn1" onClick={handleUploadBtn}>
                  Upload
                </button>
                <button className="btn1" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              !multipleImages && (
                <button className="btn1" onClick={handleSave}>
                  Save
                </button>
              )
            )}
          </>
        ) : dataLabel && date ? (
          <span className="text">{reset ? reset : dataLabel}</span>
        ) : dataLabel && features ? (
          selectedItems?.map((feature, index) => (
            <span key={index} className="text">
              {feature}
            </span>
          ))
        ) : dataLabel && singleImage ? (
          <img
            className="displayImage"
            src={reset ? reset : dataLabel}
            alt="coverImage"
          />
        ) : dataLabel && multipleImages ? (
          <div className="images">
            {dataLabel &&
              dataLabel.map((image, index) => {
                return (
                  <div key={index} className="img">
                    {name === "docFile" ? (
                      <iframe src={image} className="smailimg" height="200px" />
                    ) : (
                      <img
                        src={image}
                        className="smailimg"
                        height="200"
                        alt="upload"
                      />
                    )}
                    <p>{index + 1}</p>
                  </div>
                );
              })}
          </div>
        ) : dataLabel === true || dataLabel === "true" ? (
          <span className="text">{reset ? reset : "true"}</span>
        ) : dataLabel === false || dataLabel === "false" ? (
          <span className="text">{reset ? reset : "false"}</span>
        ) : dataLabel ? (
          <span className="text">{reset ? reset : dataLabel}</span>
        ) : (
          <i className="text noLabel">{`No ${title}`}</i>
        )}
      </div>
    </div>
  );
};

export default CompleteInput;
