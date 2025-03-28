import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/config/firebase";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter an email!");
      return;
    } else if (!password) {
      toast.error("Enter a password!");
      return;
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!");
        setTimeout(function () {
          window.location.href = "/";
        }, 1000);
      } catch (e) {
        toast.error(e.message.replace("Firebase: ", ""));
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="mb-4 sm:w-3/5 md:w-2/5 lg:w-1/5 opacity-80 bg-zinc-950 py-6 px-6 rounded-xl drop-shadow-[0_0_20px_rgba(255,100,0,0.8)] shadow-[0_0_20px_rgba(255,100,0,0.8)]">
        <h1 className="text-4xl font-bold text-center text-white mb-5">
          Log In
        </h1>
        <form noValidate className="mb-4" onSubmit={handleSignIn}>
          <div className="grid gap-6">
            <hr className="border-1 border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.8)] drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
            <div className="grid gap-4 mt-3">
              <Input
                label={"Email"}
                id={"email"}
                placeholder={"name@example.com"}
                type={"email"}
                autoComplete={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label={"Password"}
                id={"password"}
                placeholder={"Password"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button label={"Sign In"} type={"submit"} />
          </div>
        </form>
        <div className="flex ">
          <h3 className=" mr-1 text-white">Didn't have an acount?</h3>
          <RouterLink
            to="/signup"
            className="text-red-500 hover:font-semibold"
          >
            Sign Up
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
