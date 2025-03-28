import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../backend/config/firebase";
import {
  getAuth,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Edit from "./Edit";
import toast from "react-hot-toast";
import Delete from "./Delete";

const Profile = () => {
  const [popup, setPopup] = useState(false);
  const [popup_delete, setPopupDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [uid, setUid] = useState(null);

  const authInstance = getAuth();

  const handleLogOut = () => {
    signOut(authInstance)
      .then(() => {
        console.log("SignOut Success");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteAccount = async (password) => {
    const user = auth.currentUser;
    if (!uid) return;
    else if (!password) {
      toast.error("Enter Password");
      return;
    } else if (!user) {
      toast.error("No user is logged in! Please log in again.");
      return;
    }
    try {
      const credentials = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credentials);
      await deleteDoc(doc(db, "Users", uid));
      await deleteUser(user);
      toast.success("Account deleted successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("Not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {profile ? (
        <div className="h-screen bg-black flex items-center justify-center">
          <div>
            <h1 className="text-3xl text-white">Profile</h1>
            <h2 className="text-2xl text-white">Name: {profile.name}</h2>
            <h2 className="text-2xl text-white">Email: {profile.email}</h2>
            <Button type="button" label="Edit" onClick={() => setPopup(true)} />
            <Button type="button" label="Log Out" onClick={handleLogOut} />
            <Button
              type="button"
              label="Delete Account"
              onClick={() => setPopupDelete(true)}
              className="bg-red-600 text-white"
            />
          </div>
          {popup && (
            <Edit
              name={profile.name}
              onClose={() => setPopup(false)}
              uid={uid}
            />
          )}
          {popup_delete && (
            <Delete
              onChange={setPassword}
              onClickCancel={() => setPopupDelete(false)}
              onClickDelete={() => handleDeleteAccount(password)}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;
