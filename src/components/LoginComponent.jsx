import { useState } from "react";
import axios from "axios";
import Loder from "./Loder";
import { loginApi } from "../api";

const LoginComponent = ({
  setTogalLoginSignupComponent,
  togalLoginSignupComponent,
}) => {
  const [isLoding, setIsLoding] = useState(false);
  const handleLoginBtn = async (event) => {
    event.preventDefault();

    setIsLoding(true);

    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(loginApi, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoding(false);
      window.location.href = "/";
      // Update the state to show the dashboard component
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoding(false);
    }
  };
  return (
    <div className="text-[#545] w-full md:w-[550px] h-full md:h-fit bg-slate-200 md:rounded-2xl overflow-hidden p-5 md:p-[50px]">
      <h3 className="p-3 text-center text-black text-[30px] font-bold">
        User Login
      </h3>
      <p>Please fill in your user login details below</p>
      <form className="mt-[20px]" onSubmit={handleLoginBtn}>
        <div className="w-[100%] flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email:</label>
          <input
            className="p-[7px] rounded-sm"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="w-[100%] flex flex-col gap-2">
          <label htmlFor="Password">Password:</label>
          <input
            className="p-[7px] rounded-sm"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <p className="text-right mt-2 cursor-pointer">Forget password?</p>
        <div className="relative overflow-hidden mt-7 rounded-lg ">
          {isLoding && <Loder />}
          <button
            type="submit"
            className="w-full h-[40px] bg-slate-800 text-white cursor-pointer rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-6">
        You don't have account?
        <button
          className="text-blue-600 font-semibold active:scale-[1.1] ml-2"
          onClick={() =>
            setTogalLoginSignupComponent(!togalLoginSignupComponent)
          }
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginComponent;
