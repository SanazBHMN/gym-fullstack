import { useEffect, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { AddUserForm } from "./components/AddUserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        <h1>🏋️ Gym Dashboard</h1>
        <AddUserForm onSuccess={fetchUsers} />
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList users={users} onUpdate={fetchUsers} />
        )}
      </div>
    </div>
  );
}

export default App;
