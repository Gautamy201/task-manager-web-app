import { useEffect } from "react";
import TaskTemp from "./TaskTemp";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, toggleAddTaskForm } from "../redux/features/userSclice";
import { PlusIcon } from "../components/icons/SvgIcons";

const AllTask = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.user.allTasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  return (
    <section className=" w-[100%] h-[100%]">
      <button
        className="absolute right-[50px] border-2 rounded-full p-1 opacity-[0.7] active:scale-[1.1]"
        onClick={() => dispatch(toggleAddTaskForm())}
      >
        <PlusIcon />
      </button>
      <h3 className="text-[20px] font-semibold font-serif">
        All Tasks
        <hr className="w-[40px] border-green-500 border-2" />
      </h3>
      <div className="task-list grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {allTasks === null ? (
          <p></p>
        ) : allTasks.length === 0 ? (
          <p>Task not available</p>
        ) : (
          allTasks.map((task) => {
            return <TaskTemp key={task._id} task={task} />;
          })
        )}
      </div>
    </section>
  );
};

export default AllTask;
