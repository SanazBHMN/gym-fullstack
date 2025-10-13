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
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <li key={user.id || user._id} className="w-full mx-auto">
            {editingId === (user.id || user._id) ? (
              <div className="border h-full p-3 rounded-md">
                <input
                  className="input input-neutral mb-4 w-full"
                  type="text"
                  value={editForm.name}
                  placeholder="Name"
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  className="input input-neutral mb-4 w-full"
                  type="email"
                  value={editForm.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <input
                  className="input input-neutral mb-4 w-full"
                  type="text"
                  value={editForm.feedback}
                  placeholder="Feedback"
                  onChange={(e) =>
                    setEditForm({ ...editForm, feedback: e.target.value })
                  }
                />
                <div className="flex justify-between">
                  <button className="btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleSave(user.id || user._id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="card w-full bg-base-100 card-sm shadow-sm">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{user.name}</h2>
                  <p>{user.feedback && `${user.feedback}`}</p>
                </div>
                <div className="justify-between card-actions m-3">
                  <button className="btn btn-error text-white">Delete</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => startEdit(user)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
};
