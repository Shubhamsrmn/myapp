import { Route, Routes, useNavigate } from "react-router";
import LogIn from "./components/login/LogIn";
import Tasks from "./components/tasks/Tasks";
import { useEffect, useState } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  const [isLogin, setLogin] = useState(false);
  return (
    <Routes>
      <Route path="/login" element={<LogIn setLogin={setLogin} />} />
      <Route path="/tasks" element={<Tasks isLogin={isLogin} />} />
    </Routes>
  );
}

export default App;
