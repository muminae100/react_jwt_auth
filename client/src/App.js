import Register from './components/Register';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Unauthorized from './components/Unathorized';
import Lounge from './components/Lounge';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from "react-router-dom";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <main className="App">
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route exact path="register" element={<Register />} />
    <Route exact path="login" element={<Login />} />
    <Route exact path="unauthorized" element={<Unauthorized />} />

    <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
    <Route exact path="/" element={<Dashboard />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
    <Route exact path="editor" element={<Editor />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
    <Route exact path="admin" element={<Admin />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>}>
    <Route exact path="lounge" element={<Lounge />} />
    </Route>

    <Route exact path="*" element={<NotFound />} />

    </Route>
    </Routes>
    </main>
  );
}

export default App;
