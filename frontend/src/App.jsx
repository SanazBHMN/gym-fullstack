import { useEffect, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("FAILED TO FETCH USERS");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>LOADING USERS...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏋️ Gym Dashboard</h1>
      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
}

export default App;
