import { Link } from "react-router-dom";

const NavLink = ({ icon, linkName, activeLink, handleLinkClick, link }) => {
  return (
    <Link
      to={link}
      className={`link flex gap-4 cursor-pointer text-white opacity-[0.6] px-[20px] py-[10px] ${
        !activeLink
          ? "hover:opacity-[1]"
          : "opacity-[1] bg-[#303130]  border-r-4 border-green-500"
      } `}
      onClick={() => handleLinkClick(linkName)}
    >
      <div className="icon">{icon}</div>
      <p className="linkname font-serif ">{linkName}</p>
    </Link>
  );
};

export default NavLink;
