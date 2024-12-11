// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
import { countryData } from "../data/countries";

export const abrevateName = (value) => {
  const encodedName = encodeURIComponent(value);
  console.log("encodedName", encodedName);
  const imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=000000`;
  console.log(imageUrl);
  return imageUrl;
};

export const getPercentage = (data) => {
  if (data !== null) {
    let falsyValuesCount = Object.values(data).reduce((a, c) => a + !c, 0);
    let total = Object.keys(data).length - 2;
    let percentage = (((total - falsyValuesCount) * 100) / total).toFixed();
    return percentage;
  } else {
    return 0;
  }
};

export const convertNormalTime = (timestamp) => {
  let currentDate = new Date(timestamp);
  // console.log(currentDate)
  let myDate =
    currentDate?.toLocaleDateString() + " " + currentDate?.toTimeString();
  return myDate;
};
export const convertTimeStamp = (timestamp, type) => {
  let dateInMillis = Number(timestamp); //?.seconds * 1000;
  let currentDate = new Date(dateInMillis);
  let myDate = currentDate?.toDateString();
  if (type) {
    let currentDate = new Date(timestamp);
    let myDate =
      currentDate?.toDateString() + " " + currentDate?.toTimeString();
    return myDate;
  }
  // console.log(dateInMillis,myDate)
  // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  // const options = {
  //   // weekday: 'short',
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // };

  // let myDate2 = currentDate?.toLocaleDateString(undefined, options);
  return myDate;
};

export const getCountry = (item) => {
  let data = countryData?.filter((val) => val?.iso2 === item);
  // console.log(data)
  return data[0]?.label;
};
// export const handleUploadImg = ({ image, firstName }) => {
//   const fileName = `${new Date().getTime() + firstName}`;
//   const storage = getStorage(app);
//   const storageRef = ref(storage, fileName);
//   const uploadTask = uploadBytesResumable(storageRef, image);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {},
//     (error) => {
//       // Handle unsuccessful uploads
//       console.log(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//         console.log("url", url);
//         return url;
//       });
//     }
//   );
// };

export const nairaSymbol = (value, decimal) => {
  const numericValue = Number(value); // Convert the value to number
  if (!numericValue) return "₦ 0.00";
  let negativeValue = numericValue * -1;
  if (numericValue < 0)
    return (
      "-₦ " +
      negativeValue.toLocaleString(undefined, {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })
    );
  return (
    "₦ " +
    numericValue.toLocaleString(undefined, { minimumFractionDigits: decimal })
  );
};
