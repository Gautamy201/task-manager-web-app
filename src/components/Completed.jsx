import { useSelector } from "react-redux";
import TaskTemp from "./TaskTemp";

const Completed = () => {
  const allTask = useSelector((state) => state.user.allTasks);

  const completedTasks = allTask.filter((task) => {
    return task.completed === true;
  });

  return (
    <section className=" w-[100%] h-[100%]">
      <h3 className="text-[20px] font-semibold font-serif">
        Completed Tasks
        <hr className="w-[40px] border-green-500 border-2" />
      </h3>

      {completedTasks.length === 0 ? (
        <p className="w-full text-center text-[20px] pt-5">data not found</p>
      ) : (
        <div className="task-list grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {completedTasks.map((task) => (
            <TaskTemp key={task._id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Completed;
