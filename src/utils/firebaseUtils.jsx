import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  setDoc,
  limit,
} from "firebase/firestore";

import { db } from "../firebase";

const eventCollectionRef = collection(db, "events");
const userCollectionRef = collection(db, "users");
const managerCollectionRef = collection(db, "manager");
const adminCollectionRef = collection(db, "admins");
const feedbackCollectionRef = collection(db, "feedbacks");
const houseQuestionCollectionRef = collection(db, "houseQuestions");
const supportQuestionCollectionRef = collection(db, "supportQuestions");
const familyQuestionCollectionRef = collection(db, "familyQuestions");

class ProjectDataService {
  /*-------------------------- Users -----------------------------------------*/
  addUser = (newUser, id) => {
    const userDoc = doc(db, "users", id);
    // return addDoc(userCollectionRef, newUser);
    return setDoc(userDoc, newUser);
  };

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };

  deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };
  getAllUsers = () => {
    return getDocs(query(userCollectionRef, orderBy("createdAt", "desc")));
  };
  getLimitedUsers = (number) => {
    return getDocs(
      query(userCollectionRef, orderBy("createdAt", "desc"), limit(number))
    );
  };
  getUsersByNation = (nation) => {
    return getDocs(
      query(
        userCollectionRef,
        where("nation", "==", nation),
        orderBy("createdAt", "desc")
      )
    );
  };
  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
  /*-------------------------- Manager -----------------------------------------*/
  addManager = (newManager) => {
    return addDoc(managerCollectionRef, newManager);
  };

  updateManager = (id, updatedManager) => {
    const ManagerDoc = doc(db, "manager", id);
    return updateDoc(ManagerDoc, updatedManager);
  };

  deleteManager = (id) => {
    const ManagerDoc = doc(db, "manager", id);
    return deleteDoc(ManagerDoc);
  };
  getAllManagers = () => {
    return getDocs(managerCollectionRef, orderBy("createdAt", "desc"));
  };
  getManagersByNation = (nation) => {
    return getDocs(
      query(
        managerCollectionRef,
        where("nation", "==", nation),
        orderBy("createdAt", "desc")
      )
    );
  };
  getManagerByUserId = (userId) => {
    return getDocs(
      query(
        managerCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
    );
  };
  getManager = (id) => {
    const ManagerDoc = doc(db, "manager", id);
    return getDoc(ManagerDoc);
  };
  /*-------------------------- Admin -----------------------------------------*/
  addAdmin = (newAdmin, id) => {
    const AdminDoc = doc(db, "admins", id);
    // return addDoc(adminCollectionRef, newAdmin);
    return setDoc(AdminDoc, newAdmin);
  };

  updateAdmin = (id, updatedAdmin) => {
    const AdminDoc = doc(db, "admins", id);
    return updateDoc(AdminDoc, updatedAdmin);
  };

  deleteAdmin = (id) => {
    const AdminDoc = doc(db, "admins", id);
    return deleteDoc(AdminDoc);
  };
  getAllAdmins = () => {
    return getDocs(adminCollectionRef, orderBy("createdAt"));
  };
  getAdminsByNation = (nation) => {
    return getDocs(
      query(
        adminCollectionRef,
        where("nation", "==", nation),
        orderBy("createdAt", "desc")
      )
    );
  };
  getAdmin = (id) => {
    const AdminDoc = doc(db, "admins", id);
    return getDoc(AdminDoc);
  };
  /*-------------------------- HouseQuestions -----------------------------------------*/
  addhouseQuestion = (newhouseQuestion) => {
    return addDoc(houseQuestionCollectionRef, newhouseQuestion);
  };

  updatehouseQuestion = (id, updatedhouseQuestion) => {
    const houseQuestionDoc = doc(db, "houseQuestions", id);
    return updateDoc(houseQuestionDoc, updatedhouseQuestion);
  };

  deletehouseQuestion = (id) => {
    const houseQuestionDoc = doc(db, "houseQuestions", id);
    return deleteDoc(houseQuestionDoc);
  };
  getAllhouseQuestions = () => {
    return getDocs(houseQuestionCollectionRef, orderBy("createdAt"));
  };
  gethouseQuestionsByCategory = (category) => {
    return getDocs(
      query(
        houseQuestionCollectionRef,
        where("cat", "==", category),
        orderBy("createdAt")
      )
    );
  };
  gethouseQuestionsByUserId = (id) => {
    return getDocs(
      query(houseQuestionCollectionRef, where("userId", "==", id))
    );
  };
  gethouseQuestion = (id) => {
    const houseQuestionDoc = doc(db, "houseQuestions", id);
    return getDoc(houseQuestionDoc);
  };
  /*-------------------------- supportQuestions -----------------------------------------*/
  addsupportQuestion = (newsupportQuestion) => {
    return addDoc(supportQuestionCollectionRef, newsupportQuestion);
  };

  updatesupportQuestion = (id, updatedsupportQuestion) => {
    const supportQuestionDoc = doc(db, "supportQuestions", id);
    return updateDoc(supportQuestionDoc, updatedsupportQuestion);
  };

  deletesupportQuestion = (id) => {
    const supportQuestionDoc = doc(db, "supportQuestions", id);
    return deleteDoc(supportQuestionDoc);
  };
  getAllsupportQuestions = () => {
    return getDocs(supportQuestionCollectionRef, orderBy("createdAt"));
  };
  getsupportQuestionsByCategory = (category) => {
    return getDocs(
      query(
        supportQuestionCollectionRef,
        where("cat", "==", category),
        orderBy("createdAt")
      )
    );
  };
  getsupportQuestion = (id) => {
    const supportQuestionDoc = doc(db, "supportQuestions", id);
    return getDoc(supportQuestionDoc);
  };

  /*-------------------------- FamilyQuestions -----------------------------------------*/
  addfamilyQuestion = (newfamilyQuestion) => {
    return addDoc(familyQuestionCollectionRef, newfamilyQuestion);
  };

  updatefamilyQuestion = (id, updatedfamilyQuestion) => {
    const familyQuestionDoc = doc(db, "familyQuestions", id);
    return updateDoc(familyQuestionDoc, updatedfamilyQuestion);
  };

  deletefamilyQuestion = (id) => {
    const familyQuestionDoc = doc(db, "familyQuestions", id);
    return deleteDoc(familyQuestionDoc);
  };
  getAllfamilyQuestions = () => {
    return getDocs(familyQuestionCollectionRef, orderBy("createdAt"));
  };
  getfamilyQuestionsByCategory = (category) => {
    return getDocs(
      query(
        familyQuestionCollectionRef,
        where("cat", "==", category),
        orderBy("createdAt")
      )
    );
  };

  getfamilyQuestionsByUserId = (userId) => {
    return getDocs(
      query(
        familyQuestionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      )
    );
  };
  getfamilyQuestion = (id) => {
    const familyQuestionDoc = doc(db, "familyQuestions", id);
    return getDoc(familyQuestionDoc);
  };

  /*-------------------------- Events -----------------------------------------*/
  addEvent = (newEvent) => {
    return addDoc(eventCollectionRef, newEvent);
  };

  updateEvent = (id, updatedEvent) => {
    const eventDoc = doc(db, "events", id);
    return updateDoc(eventDoc, updatedEvent);
  };

  deleteEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return deleteDoc(eventDoc);
  };
  getAllEvents = () => {
    return getDocs(eventCollectionRef, orderBy("createdAt"));
  };
  getEventsByNation = (nation) => {
    return getDocs(
      query(
        eventCollectionRef,
        where("nation", "==", nation),
        orderBy("createdAt", "desc")
      )
    );
  };
  getEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return getDoc(eventDoc);
  };

  /*-------------------------- Feedbacks -----------------------------------------*/
  addFeedback = (newFeedback) => {
    return addDoc(feedbackCollectionRef, newFeedback);
  };
  updateFeedback = (id, updatedFeedback) => {
    const projectDoc = doc(db, "feedbacks", id);
    return updateDoc(projectDoc, updatedFeedback);
  };
  deleteFeedback = (id) => {
    const projectDoc = doc(db, "feedbacks", id);
    return deleteDoc(projectDoc);
  };
  getAllFeedback = () => {
    return getDocs(feedbackCollectionRef, orderBy("createdAt"));
  };
  getFeedbackByUser = (userId) => {
    return getDocs(
      query(
        feedbackCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
    );
  };
  getFeedbackByNation = (nation) => {
    return getDocs(
      query(
        feedbackCollectionRef,
        where("nation", "==", nation),
        orderBy("createdAt", "desc")
      )
    );
  };
  getFeedback = (id) => {
    const projectDoc = doc(db, "feedbacks", id);
    return getDoc(projectDoc);
  };
}

export default new ProjectDataService();
