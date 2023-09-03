import Header from "./components/Header";
// import "./App.css";
import NotesListPage from "./pages/NotesListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotePage from "./pages/NotePage";
import CreateNote from "./pages/CreateNote";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterUser";

function App() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
  return (
    <Router>
      { loggedInUser && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="note/:id" element={<NotePage />} />
        <Route path="create/" element={<CreateNote />} />
        <Route path="notes/" element= {<NotesListPage />} />
        <Route path="users/register/" element={<RegisterPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
