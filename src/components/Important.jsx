import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useSelector } from "react-redux";
import TaskTemp from "./TaskTemp";
const Important = () => {
  const allTask = useSelector((state) => state.user.allTasks);

  const important = allTask.filter((task) => {
    return task.important === true;
  });

  return (
    <section className=" w-[100%] h-[100%]">
      <h3 className="text-[20px] font-semibold font-serif">
        Important Tasks
        <hr className="w-[40px] border-green-500 border-2" />
      </h3>
      <div className="task-list grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {important.length === 0 ? (
          <p>data not found</p>
        ) : (
          important.map((task) => <TaskTemp key={task._id} task={task} />)
        )}
      </div>
    </section>
  );
};

export default Important;
