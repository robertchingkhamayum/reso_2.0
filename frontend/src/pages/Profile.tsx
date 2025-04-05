import { useState, useEffect } from "react";
import Loading from "./Loading";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import EventRegistered from "./EventRegistered";
type UserProfile = {
  email: string;
  name: string;
};
const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEventsRegister, setShowEventsRegister] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const UserProfile = localStorage.getItem("UserData");
        if (UserProfile) {
          const profileParsed = JSON.parse(UserProfile);
          setProfile(profileParsed);
          return
        }

        const respond = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        setProfile(respond.data.userData);
        localStorage.setItem("UserData", respond.data.userData);
      } catch (error) {}
    };
    fetchProfile();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Authorization");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-1/4 bg-zinc-900 shadow-md shadow-red-500/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Hello, {profile?.name || "N/A"}
        </h2>
        <nav>
          <ul className="space-y-2">
            <li className="p-2  text-red-400 text-xl font-bold ">My Profile</li>
            <li
              className={`p-2 rounded cursor-pointer transition ${
                !showEventsRegister ? "bg-red-600 " : "hover:bg-red-500/30"
              }`}
              onClick={() => setShowEventsRegister(false)}
            >
              Profile Information
            </li>
            <li
              className={`p-2 rounded cursor-pointer transition ${
                showEventsRegister ? "bg-red-600 " : "hover:bg-red-500/30"
              }`}
              onClick={() => setShowEventsRegister(true)}
            >
              Events Registered
            </li>
            <li
              className="p-2 flex items-center gap-2 rounded cursor-pointer transition hover:text-red-500 hover:font-bold"
              onClick={handleLogOut}
            >
              <CiLogout className="text-xl" /> Logout
            </li>
          </ul>
        </nav>
      </div>

      <div className="bg-zinc-900 p-6 shadow-md shadow-red-500/50 rounded-md w-1/2 ml-10">
        {profile ? (
          <>
            {showEventsRegister ? (
              <EventRegistered/>
            ) : (
              <div>
                <h1 className="text-red-500 text-2xl font-semibold mb-4 flex justify-between">
                  Personal Information
                </h1>
                <div className="mb-4 flex justify-between">
                  <h2 className="text-lg font-semibold">Name</h2>
                  <p className="text-gray-400">{profile?.name|| "N/A"}</p>
                </div>
                <div className="mb-4 flex justify-between">
                  <h2 className="text-lg font-semibold">Email Address</h2>
                  <p className="text-gray-400">{profile?.email|| "N/A"}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Profile;
