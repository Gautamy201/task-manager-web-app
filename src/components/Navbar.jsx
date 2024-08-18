import { useState } from "react";
import {
  PlusIcon,
  LogoutIcon,
  HomeIcon,
  ImportantIcon,
  CheckIcon,
  DeleteIcon,
} from "../components/icons/SvgIcons";
import NavLink from "./NavLink";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchTasks, fetchUserDetail } from "../redux/features/userSclice";
import ClipLoader from "react-spinners/ClipLoader";
const Navbar = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const token = useSelector((state) => state.user.userToken);
  // console.log(userDetail);
  const [activeLink, setActiveLink] = useState({
    allTask: true,
    important: false,
    completed: false,
    doItNow: false,
  });
  const [loder, setLoder] = useState(false);

  const handleFileUpload = async (e) => {
    setLoder(true);
    const formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloude_name", "master-cloud");

    fetch("https://api.cloudinary.com/v1_1/master-cloud/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((img) => {
        axios
          .patch(
            "http://localhost:3000/user/profile-pic",
            {
              userImgUrl: img.url,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            console.log(result);
            setLoder(false);
            fetchUserDetail();
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
            setLoder(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoder(false);
      });
  };

  const handleLogoutBtn = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleLinkClick = (linkName) => {
    if (linkName === "All Tasks") {
      setActiveLink({
        ...activeLink,
        allTask: true,
        important: false,
        completed: false,
        doItNow: false,
      });
    }
    if (linkName === "Important") {
      setActiveLink({
        ...activeLink,
        allTask: false,
        important: true,
        completed: false,
        doItNow: false,
      });
    }
    if (linkName === "Completed") {
      setActiveLink({
        ...activeLink,
        allTask: false,
        important: false,
        completed: true,
        doItNow: false,
      });
    }
    if (linkName === "Do it Now") {
      setActiveLink({
        ...activeLink,
        allTask: false,
        important: false,
        completed: false,
        doItNow: true,
      });
    }
  };
  return (
    <>
      <nav className=" w-[250px] h-full bg-[#212120fa] flex flex-col justify-between rounded-[15px]">
        {/* logo user image */}
        <div className="navlogo-cont ainer flex flex-col justify-center items-center gap-2 p-[20px]">
          <div className="userImg rounded-full w-[80px] h-[80px] overflow-hidden cursor-pointer border-dotted border-gray-100 border-[3.5px] p-[5px] relative">
            {userDetail.userImgUrl ? (
              <img
                className="w-full h-full rounded-full
            "
                src={userDetail.userImgUrl}
                alt={userDetail.fullname}
              />
            ) : (
              <div className="imageuplode w-full h-full flex justify-center items-center bg-gray-500 rounded-full relative">
                <PlusIcon />
              </div>
            )}
            <input
              type="file"
              className="w-full h-full opacity-1 absolute cursor-pointer border-red-500 border-2 top-0 left-0 opacity-0 z-10"
              onChange={(event) => handleFileUpload(event)}
            />
            <div
              className={` absolute w-full h-full left-0 top-0 flex justify-center items-center z-20 ${
                loder ? "" : "hidden"
              }`}
            >
              <ClipLoader
                color={"green"}
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
          <div className="username">
            <p className=" text-[18px] font-semibold text-white capitalize text-center ">
              {userDetail.fullname}
            </p>
          </div>
        </div>
        {/* navigation */}
        <div className="navlinks-conainer h-[55%] ">
          <NavLink
            icon={<HomeIcon />}
            linkName={"All Tasks"}
            activeLink={activeLink.allTask}
            handleLinkClick={handleLinkClick}
            link={"/all-task"}
          />
          <NavLink
            icon={<ImportantIcon />}
            linkName={"Important"}
            activeLink={activeLink.important}
            handleLinkClick={handleLinkClick}
            link={"/important"}
          />
          <NavLink
            icon={<CheckIcon />}
            linkName={"Completed"}
            activeLink={activeLink.completed}
            handleLinkClick={handleLinkClick}
            link={"/completed"}
          />
          <NavLink
            icon={<DeleteIcon />}
            linkName={"Do it Now"}
            activeLink={activeLink.doItNow}
            handleLinkClick={handleLinkClick}
            link={"/do-it-now"}
          />
        </div>
        {/* logout button */}
        <div className="signout p-[20px]">
          <button
            className=" flex gap-2 items-center text-white opacity-[0.6] hover:opacity-[1]"
            onClick={handleLogoutBtn}
          >
            <LogoutIcon />
            <p>Sign Out</p>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
