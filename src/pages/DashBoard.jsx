import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchUserDetail } from "../redux/features/userSclice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MenuSvgIcon, CloseIcon } from "../components/icons/SvgIcons";
import AddTaskForm from "../components/AddTaskForm";
const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetail());
  }, []);
  const [openSideNav, setOpenSideNav] = useState(false);
  const showAddTaskForm = useSelector((state) => state.user.addTaskFormShow);
  return (
    <div className="  sm:p-[25px] h-screen w-screen sm:flex gap-[25px]">
      <nav className="hidden md:block">
        <Navbar />
      </nav>

      <main className="overflow-y-scroll text-white w-full h-full sm:rounded-[20px] overflow-hidden bg-[#212120fa] p-[20px] relative ">
        <button
          className="mb-4 cursor-pointer md:hidden  "
          onClick={() => setOpenSideNav(!openSideNav)}
        >
          <MenuSvgIcon />
          <div
            className={`absolute h-screen top-0 left-0 z-10 ${
              openSideNav ? "block" : "hidden"
            }`}
          >
            <button
              className="absolute right-2 top-2 cursor-pointer "
              onClick={() => setOpenSideNav(!openSideNav)}
            >
              <CloseIcon />
            </button>
            <Navbar />
          </div>
        </button>
        <Outlet />
      </main>
      {showAddTaskForm && <AddTaskForm />}
    </div>
  );
};

export default DashBoard;
