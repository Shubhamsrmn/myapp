import React, { useEffect, useState } from "react";
import { tasksData } from "../../utils/database/tasks";
import styles from "./tasks.module.css";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router";
const Tasks = ({ isLogin }) => {
  const navigate = useNavigate();
  // if the is not login send back to login
  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);
  const [tasks, setTasks] = useState(tasksData);
  // setting active drag item

  const [activeDrag, setActiveDrag] = useState(null);
  //  setting drop where to drop drag item

  const [dropOn, setDropOn] = useState(null);
  // updating the tasks lists according the drag and drop operations

  const onDragEnd = (e) => {
    let newTasks = [...tasks];
    const dragItem = newTasks.splice(activeDrag, 1)[0]; // taking drag tasks out
    newTasks.splice(dropOn, 0, dragItem); // adding drag opreation on drop postion
    setTasks(newTasks);
    setActiveDrag(null);
    setDropOn(null);
  };

  return (
    <div>
      <SearchBar tasks={tasksData} setTasks={setTasks} />
      <div className={styles.tasks_container}>
        {tasks.map((task, curridx) => (
          <div
            key={curridx}
            className={`${styles.single_task_container} ${
              curridx === activeDrag ? styles.active : ""
            }`} // adding active class so that the drag tasks will look blur
            draggable
            onDragStart={() => setActiveDrag(curridx)}
            onDragEnter={() => setDropOn(curridx)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            <img
              src={task.image}
              alt=""
              className={styles.task_image}
              draggable="false"
            />
            <div className={styles.task_text_container}>
              <h2 className={styles.task_title}>{task.title}</h2>
              <p className={styles.task_time}>Start Time: {task.startTime}</p>
              <p className={styles.task_time}>End Time: {task.endTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
