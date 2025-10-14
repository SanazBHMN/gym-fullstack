import { useState } from "react";

export const UserList = ({ users, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState([]); // track checked users by id
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  // toggle checkbox per user
  const handleChecked = (userId) => {
    setCheckedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const startEdit = (user) => {
    setEditingId(user.id || user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      feedback: user.feedback || "",
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("FAILED TO UPDATE USER");
      setEditingId(null);
      onUpdate();
    } catch (error) {
      console.error(error);
      alert("ERROR UPDATING USER");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("FAILED TO DELETE USER");
      onUpdate();
    } catch (error) {
      console.error(error);
      alert("ERROR DELETING USER");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name / Email</th>
            <th>Trainer</th>
            <th>Membership</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const userId = user.id || user._id;
              const isEditing = editingId === userId;
              const isChecked = checkedUsers.includes(userId);

              return (
                <tr key={userId}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={isChecked}
                      onChange={() => handleChecked(userId)}
                    />
                  </td>

                  <td>
                    {isEditing ? (
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400"
                        />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    )}
                  </td>

                  <td>Shaghayegh</td>
                  <td>{user.membership}</td>

                  <td>
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleSave(userId)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-xs btn-ghost"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => startEdit(user)}
                        >
                          Edit
                        </button>
                        {isChecked && (
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => handleDelete(userId)}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
