import { useState,useEffect } from "react";
import Button from "../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../backend/config/firebase";
import toast from "react-hot-toast";

const Edit = ({ name, onClose, uid }) => {
  const [updatedName, setUpdatedName] = useState("");

  const handleUpdate = async () => {
    if (!updatedName) {
      toast.error("Name cannot be empty!");
      return;
    }

    try {
      const userDoc = doc(db, "Users", uid);
      await updateDoc(userDoc, { name: updatedName });
      toast.success("Name Changed Successfully!");

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-950/75">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-white font-bold mb-4">Edit Profile</h2>
        <label className="text-white">Name</label>
        <input
          id="name"
          type="text"
          placeholder={name}
          onChange={(e) => {
            setUpdatedName(e.target.value);
          }}
          required={true}
          className="w-full border-0 border-b-2 border-zinc-800 bg-transparent px-2 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button label={"Cancel"} type={"button"} onClick={onClose} />
          <Button label={"Update"} onClick={handleUpdate} type={"button"} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
