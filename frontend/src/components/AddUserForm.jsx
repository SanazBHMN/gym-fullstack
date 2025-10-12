import { useState } from "react";

export const AddUserForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("FAILED TO ADD USER");

      setForm({ name: "", email: "", feedback: "" });
      onSuccess();
    } catch (error) {
      console.log(error);
      alert("Error adding user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input input-neutral"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="input input-neutral"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="input input-neutral"
        type="text"
        placeholder="Feedback"
        value={form.feedback}
        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
      />
      <button type="submit">Add user</button>
    </form>
  );
};
