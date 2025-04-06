import { Link as RouterLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 text-white justify-items-center">
      <h3>Ohh!!</h3>
      <p>We are not able to find the page for the given Url</p>
      <RouterLink
        to="/"
        className="mr-4 text-green-600 place-items-start hover:underline"
      >
       Navigate Home
      </RouterLink>
    </div>
  );
};

export default Error;