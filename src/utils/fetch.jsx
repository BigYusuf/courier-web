import { toast } from "react-toastify";
// import { getAllManagers, getAllUsers } from "../redux/slice/auth";
// import ProjectDataService from "./firebaseUtils";

export const fetchUsers = async (dispatch, profile) => {
  try {
    // if (profile?.role === "manager") {
    //   const docSnap = await ProjectDataService.getUsersByNation(profile?.nation);
    //   let Users = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //   dispatch(getAllUsers(Users));
    // } else if (profile?.role === "admin" || profile?.role === "superAdmin") {
    //   const docSnap = await ProjectDataService.getAllUsers();
    //   let Users = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //   dispatch(getAllUsers(Users));
    // } else {
    //   dispatch(getAllUsers([]));
    // }
  } catch (error) {
    toast.error(
      error?.message ? error?.message : "Error occured while fetching users"
    );
  }
};


export const fetchManagers = async (dispatch, profile) => {
  try {
    // if (profile?.role === "admin" || profile?.role === "superAdmin") {
    //   const docSnap = await ProjectDataService.getAllManagers();
    //   let managers = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //   dispatch(getAllManagers(managers));
    // } else {
    //   dispatch(getAllManagers([]))
    // }
  } catch (error) {
    toast.error(
      error?.message ? error?.message : "Error occured while fetching staffs"
    );
  }
};

export const GetUser = async (userId, setUserInfo) => {
  try {
    // const docSnap = await ProjectDataService.getUser(userId);
    // setUserInfo(docSnap.data());
  } catch (error) {
    toast.error(
      error?.message ? error?.message : "Error occured while getting user"
    );
  }
};

export const GetStaff = async (staffId, setLoading, setStaffInfo) => {
  try {
    // setLoading(true);
    // const docSnap = await ProjectDataService.getManager(staffId);
    // setStaffInfo(docSnap.data());
    // setLoading(false);
  } catch (error) {
    toast.error(
      error?.message ? error?.message : "Error occured while getting staff"
    );
    setLoading(false);
  }
};