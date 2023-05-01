import React, { useEffect, useState } from "react";
import { tasksData, addTask } from "../../utils/database/tasks";
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
  const [isaddActive, setAddActive] = useState(false);
  const [inputImage, setinputImage] = useState("");
  const [inputStart, setinputStart] = useState("");
  const [inputEnd, setinputEnd] = useState("");
  const [inputTitle, setinputTitle] = useState("");
  const addTaskHandler = (e) => {
    e.preventDefault();
    // adding new update into database
    setTasks((tasks) => {
      const newEntry = {
        title: inputTitle,
        image: inputImage,
        startTime: inputStart,
        endTime: inputEnd,
      };
      const newTasks = [...tasks, newEntry];
      return newTasks;
    });
    console.log(tasks);
  };
  // delete the tasks  by there id (index)
  const deleteTaskHandler = (e) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks.splice(e.target.id, 1);
      return newTasks;
    });
  };
  return (
    <div>
      <SearchBar tasks={tasksData} setTasks={setTasks} />
      <div className={styles.tasks_container}>
        <button onClick={() => setAddActive((prev) => !prev)}>add task</button>
        {isaddActive ? (
          <div className="">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={inputTitle}
              onChange={(e) => setinputTitle(e.target.value)}
            />
            <label htmlFor="image">image url</label>
            <input
              type="text"
              id="image"
              value={inputImage}
              onChange={(e) => setinputImage(e.target.value)}
            />
            <label htmlFor="start">Start time</label>
            <input
              type="time"
              id="start"
              value={inputStart}
              onChange={(e) => setinputStart(e.target.value)}
            />
            <label htmlFor="end">End Time</label>
            <input
              type="time"
              id="end"
              value={inputEnd}
              onChange={(e) => setinputEnd(e.target.value)}
            />
            <button onClick={addTaskHandler}>submit</button>
          </div>
        ) : (
          ""
        )}
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
            <button id={curridx} onClick={deleteTaskHandler}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
