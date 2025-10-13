import { useEffect, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { AddUserForm } from "./components/AddUserForm";
import { Dropdown } from "./components/Dropdown";

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

  const fetchPostgresUsers = () => {
    fetch("http://localhost:5000/api/postgres-users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("FAILED TO FETCH USERS FROM POSTGRES"));
  };

  const fetchMongoUsers = () => {
    fetch("http://localhost:5000/api/mongo-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("FAILED TO FETCH USERS FROM MONGO"));
  };

  const fetchJoinedUsers = () => {
    fetch("http://localhost:5000/api/joined-users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("FAILED TO FETCH JOINED USERS", error));
  };

  if (loading) return <p>LOADING USERS...</p>;

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        <h1>🏋️ Gym Dashboard</h1>
        <Dropdown
          onAllClick={fetchUsers}
          onPgClick={fetchPostgresUsers}
          onMongoClick={fetchMongoUsers}
          onJoinedClick={fetchJoinedUsers}
        />
        {/* <AddUserForm onSuccess={fetchUsers} /> */}
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
