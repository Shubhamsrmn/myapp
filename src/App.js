import { Route, Routes, useNavigate } from "react-router";
import LogIn from "./components/login/LogIn";
import Tasks from "./components/tasks/Tasks";
import { useEffect, useState } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/tasks");
  }, []);
  const [isLogin, setLogin] = useState(true);
  return (
    <Routes>
      <Route path="/login" element={<LogIn setLogin={setLogin} />} />
      <Route path="/tasks" element={<Tasks isLogin={isLogin} />} />
    </Routes>
  );
}

export default App;
