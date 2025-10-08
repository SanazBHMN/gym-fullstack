import { useState } from "react";

export const UserList = ({ users, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    feedback: "",
  });

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
      onUpdate(); //refresh list
    } catch (error) {
      console.error(error);
      alert("ERROR UPDATING USER");
    }
  };

  return (
    <ul>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <li key={user.id || user._id} style={{ marginBottom: "0.5rem" }}>
            {editingId === (user.id || user._id) ? (
              <>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editForm.feedback}
                  onChange={(e) =>
                    setEditForm({ ...editForm, feedback: e.target.value })
                  }
                />
                <button onClick={() => handleSave(user.id || user._id)}>
                  Save
                </button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {user.name} — {user.email}
                {user.feedback && ` — Feedback: ${user.feedback}`}
                <button onClick={() => startEdit(user)}>Edit</button>
              </>
            )}
          </li>
        ))
      )}
    </ul>
  );
};
