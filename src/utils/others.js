import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export const abrevateName = (value) => {
  const encodedName = encodeURIComponent(value);
  const imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=000000`;
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
  let myDate = currentDate.toDateString() + " " + currentDate.toTimeString();
  return myDate;
};
export const convertTimeStamp = (timestamp) => {
  let dateInMillis = timestamp?.seconds * 1000;
  let currentDate = new Date(dateInMillis);
  //let myDate = currentDate.toDateString();
  // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  const options = {
    // weekday: 'short',
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let myDate2 = currentDate.toLocaleDateString(undefined, options);
  return myDate2;
};

export const handleUploadImg = ({ image, firstName }) => {
  const fileName = `${new Date().getTime() + firstName}`;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log("url", url);
        return url;
      });
    }
  );
};
