import { DeleteIcon, EditIcon } from "./icons/SvgIcons";
import { getTaskDate } from "../redux/getUserDetail";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, togaleCompletedTask } from "../redux/features/userSclice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteTaskApi } from "../api";
const TaskTemp = ({ task }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.userToken);
  const result = useSelector((state) => state.user.result);
  const { _id, completed, createdAt, description, important, title } = task;
  // console.log(_id);
  const handleTaskDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`${deleteTaskApi}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.warn("Task deleted successfully");
      console.log(response);
      dispatch(fetchTasks());
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handeleTaskStatusBtn = (_id, completed) => {
    dispatch(
      togaleCompletedTask({
        _id,
        completed,
      })
    );
    dispatch(fetchTasks());
  };
  return (
    <div className=" bg-[#2b2b2afa] min-h-[200px] border-2 border-gray-600 rounded-lg p-[15px] flex flex-col justify-between">
      <div>
        <h1 className="text-[18px] font-semibold capitalize">{title}</h1>
        <p className="text-[14px] mt-2 opacity-[0.8] capitalize">
          {description}
        </p>
      </div>
      <div className=" flex justify-between items-end">
        <div>
          <p>{getTaskDate(createdAt)}</p>
          <button
            className={`${
              completed ? "bg-green-500" : "bg-blue-500"
            } w-[120px] h-[30px] rounded-2xl mt-2 font-semibold cursor-pointer active:scale-[1.1] transition-all duration-[0.2s] text-[14px]`}
            onClick={() => handeleTaskStatusBtn(_id, completed)}
          >
            {completed ? "Completed" : "Pandding"}
          </button>
        </div>
        <div className=" flex gap-[15px]">
          <button className="cursor-pointer active:scale-[1.2]">
            <EditIcon />
          </button>
          <button
            className="cursor-pointer active:scale-[1.2]"
            onClick={() => handleTaskDeleteBtn(_id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTemp;
