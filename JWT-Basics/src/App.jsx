import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    localStorage.clear();
  }, []);
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  };

  const getData = async () => {
    const item = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/dashboard",
        {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        }
      );
      if (item) {
        setDashboardData(response.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  };

  return (
    <main>
      <form className="form contact-form" onSubmit={createUser}>
        <h5>login/register</h5>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            required
            type="text"
            className="form-input username-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            required
            type="password"
            className="form-input password-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {success && (
          <div className="text-small form-alert">User Created</div>
        )}

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
      <div className="container">
        <h4>Dashboard</h4>
        <p className={token ? "token-present" : "token"}>
          {token ? "Token present" : "No token present"}
        </p>
        <div className="result">
          <h3> {dashboardData.msg}</h3>
          <p> {dashboardData.secret}</p>
        </div>
        <button className="btn btn-block" id="data" onClick={() => getData()}>
          get data
        </button>
      </div>
    </main>
  );
}

export default App;
