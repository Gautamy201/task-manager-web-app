import { signupApi } from "../api";
const SignupComponent = ({
  setTogalLoginSignupComponent,
  togalLoginSignupComponent,
}) => {
  return (
    <div className="text-[#545] w-full md:w-[550px] h-full md:h-fit bg-slate-200 md:rounded-2xl overflow-hidden p-5 md:p-[50px]">
      <h3 className="p-3 text-center text-black text-[30px] font-bold">
        Create New Account
      </h3>
      <p>Please fill in your details below to create new account</p>
      <form className="mt-[20px]">
        <div className="w-[100%] flex flex-col gap-2 mb-4">
          <label htmlFor="fullname">Full Name:</label>
          <input
            className="p-[7px] rounded-sm"
            type="fullname"
            id="fullname"
            name="fullname"
            required
          />
        </div>
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
        <button className="w-full h-[40px] bg-slate-800 text-white mt-7 cursor-pointer rounded-lg">
          Sign up
        </button>
      </form>
      <p className="mt-6">
        You have already account?
        <button
          className="text-blue-600 font-semibold active:scale-[1.1] ml-2"
          onClick={() =>
            setTogalLoginSignupComponent(!togalLoginSignupComponent)
          }
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupComponent;
