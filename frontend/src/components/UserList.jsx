import { useState } from "react";

export const UserList = ({ users, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState([]);
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

  if (users.length === 0)
    return <p className="text-center mt-4">No users found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => {
        const userId = user.id || user._id;
        const isEditing = editingId === userId;
        const isChecked = checkedUsers.includes(userId);

        return (
          <div
            key={userId}
            className="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              className="absolute top-2 right-2"
              checked={isChecked}
              onChange={() => handleChecked(userId)}
            />

            {isEditing ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border px-2 py-1 rounded focus:ring-1 focus:ring-blue-400"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="border px-2 py-1 rounded focus:ring-1 focus:ring-blue-400"
                />
                <textarea
                  value={editForm.feedback}
                  onChange={(e) =>
                    setEditForm({ ...editForm, feedback: e.target.value })
                  }
                  className="border px-2 py-1 rounded focus:ring-1 focus:ring-blue-400"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleSave(userId)}
                  >
                    Save
                  </button>
                  <button className="btn btn-xs btn-ghost" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>

                {user.membership_type && (
                  <p className="text-sm">
                    <span className="font-semibold">Membership:</span>{" "}
                    {user.membership_type}
                  </p>
                )}
                {user.trainer_name && (
                  <p className="text-sm">
                    <span className="font-semibold">Trainer:</span>{" "}
                    {user.trainer_name}
                  </p>
                )}
                {user.class_name && (
                  <p className="text-sm">
                    <span className="font-semibold">Class:</span>{" "}
                    {user.class_name}
                  </p>
                )}
                {user.booking_date && (
                  <p className="text-sm italic text-gray-500">
                    <span className="font-semibold">Booking:</span>{" "}
                    {new Date(user.booking_date).toLocaleString()}
                  </p>
                )}
                {user.feedback && (
                  <p className="text-sm italic text-gray-500">
                    "{user.feedback}"
                  </p>
                )}

                <div className="flex gap-2 mt-2">
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
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
