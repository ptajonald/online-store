import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AuthContext from "./AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header
      style={{
        padding: "1rem 1.5rem",
        marginBottom: "1rem",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
      </nav>

      <div>
        {!user.isAuth ? (
          <Link to="/login">Log In</Link>
        ) : (
          <button onClick={logout}>Log Out</button>
        )}
      </div>
    </header>
  );
}

function Test() {
  
}

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: " 0 1.5rem" }}>
      <h1>Home</h1>
      {user.isAuth ? <p>Welcome back, {user.name}</p> : <p>Not logged in</p>}
    </div>
  );
}

function AccountPage() {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: "0 1.5rem" }}>
      <h1>Account</h1>
      <p>Name: {user.name}</p>
      <p>Email:</p>
    </div>
  );
}

function LoginPage() {
  const [name, setName] = useState("");
  const { user, login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
  }

  return (
    <div style={{ padding: "0 1.5rem" }}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <label>
          Name
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Log In
        </button>
      </form>

      {user.isAuth && <p>User Logged In</p>}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState({ name: "", isAuth: false });

  function login(name) {
    setUser({ name: name, isAuth: true });
  }
  function logout(name) {
    setUser({ name: "", isAuth: false });
  }
  return (
    <div>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<h1 style={{ padding: "0 1.5rem" }}>404 Not Found</h1>}
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}
