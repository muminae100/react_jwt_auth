import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <main className="App">
    <Router>
    <Routes>
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/login" element={<Login />} />
    </Routes>
    </Router>
    </main>
  );
}

export default App;
