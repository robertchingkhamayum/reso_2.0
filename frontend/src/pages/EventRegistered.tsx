import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
type RegisteredEvent = {
  email: string;
  registrationId: number;
  event: {
    event: string;
    date: string;
    description: string;
  };
  registration: {
    createdAt: string;
    name: string;
    gender: string | null;
    contact: string;
    address: string;
    transactionId: string;
    bankingName: string;
    paymentUrl: string;
    approved: boolean;
  };
};

const EventRegistered = () => {
  const [eventsRegistered, setEventsRegistered] = useState<RegisteredEvent[]>(
    []
  );
  useEffect(() => {
    const register = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/users/registered",
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setEventsRegistered(response.data.registeredDetails);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
      }
    };
    register();
  }, []);

  return (
    <div>
      {eventsRegistered && eventsRegistered.length > 0 ? (
        eventsRegistered.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-zinc-800 rounded-md shadow-md shadow-red-500/30 flex justify-between items-center"
          >
            <div>
              <h3 className="text-red-500 font-semibold text-lg mb-2">
                {item.event?.event || "Event Name N/A"}
              </h3>
              <p className="text-white">
                📅 Date:{" "}
                {new Date(item.registration?.createdAt).toLocaleString(
                  "en-IN",
                  {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }
                ) || "No date"}
              </p>
              <p className="text-white">📧 Email: {item.email}</p>
              <p className="text-white">
                🙍‍♂️ Name: {item.registration?.name || "No name"}
              </p>
              <p className="text-white">
                💳 Transaction ID: {item.registration?.transactionId || "N/A"}
              </p>
            </div>
            <div>
              <Button label="Download" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No events registered yet.</p>
      )}
    </div>
  );
};
export default EventRegistered;
