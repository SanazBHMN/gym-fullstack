import { useEffect, useState } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import { AddUserForm } from "./components/AddUserForm";
import { Dropdown } from "./components/Dropdown";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users by default
  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchPostgresUsers = () => {
    fetch("http://localhost:5000/api/postgres-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  const fetchMongoUsers = () => {
    fetch("http://localhost:5000/api/mongo-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  const fetchJoinedUsers = () => {
    fetch("http://localhost:5000/api/joined-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading users...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">🏋️ Gym Dashboard</h2>
        <Dropdown
          onAllClick={fetchUsers}
          onPgClick={fetchPostgresUsers}
          onMongoClick={fetchMongoUsers}
          onJoinedClick={fetchJoinedUsers}
        />
      </aside>

      <main className="flex-1 p-6">
        <AddUserForm onSuccess={fetchUsers} />
        <UserList users={users} onUpdate={fetchUsers} />
      </main>
    </div>
  );
}

export default App;
