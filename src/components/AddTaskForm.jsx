import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../components/icons/SvgIcons";
import axios from "axios";
import { fetchTasks, toggleAddTaskForm } from "../redux/features/userSclice";
import { addTaskApi } from "../api";

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.userToken);
  // console.log(token);
  const handeleAddTaskBtn = async (event) => {
    event.preventDefault();
    const taskData = new FormData(event.target);
    console.log(taskData);
    try {
      const isCheked = (taskData) => {
        if (taskData.get("important") === "on") {
          return true;
        } else {
          return false;
        }
      };
      const res = await axios.post(
        addTaskApi,
        {
          title: taskData.get("title"),
          description: taskData.get("discripction"),
          important: isCheked(taskData),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form
      event.target.reset();
      // Close the form
      dispatch(toggleAddTaskForm());
      dispatch(fetchTasks());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute w-screen h-screen bg-[#32313296] top-0 left-0 text-white">
      <div className="bg-[#333133] w-full h-full md:h-fit md:w-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden md:p-2">
        <button
          className="absolute right-1 top-1 active:scale-[1.1]"
          onClick={() => dispatch(toggleAddTaskForm())}
        >
          <CloseIcon />
        </button>
        <div>
          <h3 className="text-center mt-[50px] md:mt-0">Add New Task</h3>
          <form
            onSubmit={handeleAddTaskBtn}
            className="px-[50px] py-[20px] flex flex-col gap-4"
          >
            <div>
              <label htmlFor="title">Title</label>
              <input
                className="w-full mt-2 rounded-sm  text-black py-1 px-3"
                type="text"
                placeholder="Title"
                name="title"
              />
            </div>
            <div>
              <label htmlFor="discripction">Discripction</label>
              <textarea
                className="w-full mt-2 resize-none rounded-sm h-[80px] text-black py-1 px-3"
                type="text"
                placeholder="Discripction"
                name="discripction"
              />
            </div>
            <div className="text-right">
              <label
                htmlFor="important"
                className="flex gap-3 justify-end items-center"
              >
                <input type="checkbox" name="important" />
                Important task
              </label>
            </div>
            <button
              className="bg-slate-900 w-full p-2 rounded-md active:scale-[1.1]"
              type="submit"
            >
              Add new task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
