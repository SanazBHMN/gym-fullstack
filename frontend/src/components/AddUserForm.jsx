import { useState } from "react";

export const AddUserForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add user");

      setForm({ name: "", email: "", feedback: "" });
      onSuccess(); // refresh user list
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white p-4 rounded shadow-md mb-6 flex flex-col gap-3 max-w-md"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold text-lg">Add New User</h3>
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Feedback (optional)"
        className="input input-bordered w-full"
        value={form.feedback}
        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
      />
      <button
        type="submit"
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};
