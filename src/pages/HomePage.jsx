import { useState } from "react";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";

const HomePage = () => {
  const [togalLoginSignupComponent, setTogalLoginSignupComponent] =
    useState(true);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <p className="text-white text-[25px] font-bold hidden md:block">
        {togalLoginSignupComponent ? "User Login" : "User Sign up"}
      </p>

      {togalLoginSignupComponent ? (
        <LoginComponent
          setTogalLoginSignupComponent={setTogalLoginSignupComponent}
          togalLoginSignupComponent={togalLoginSignupComponent}
        />
      ) : (
        <SignupComponent
          setTogalLoginSignupComponent={setTogalLoginSignupComponent}
          togalLoginSignupComponent={togalLoginSignupComponent}
        />
      )}
    </div>
  );
};

export default HomePage;
