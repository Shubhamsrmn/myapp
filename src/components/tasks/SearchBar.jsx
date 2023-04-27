import React, { useState } from "react";
import styles from "./tasks.module.css";
const SearchBar = ({ tasks, setTasks }) => {
  const [searchIP, setSearchIP] = useState("");
  const searchHandler = (e) => {
    setSearchIP(e.target.value);
    if (e.target.value === "") {
      setTasks(tasks);
      return;
    }
    const newTasks = tasks.filter((task) =>
      task.title.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setTasks(newTasks);
  };

  return (
    <div className={styles.search_container}>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Search the tasks that you need..."
        value={searchIP}
        onChange={searchHandler}
      />
      <button className={styles.search_btn}>Search</button>
      <div className={styles.search_result_container}></div>
    </div>
  );
};

export default SearchBar;
