import React from "react";

export const UserList = ({ users }) => {
  return (
    <ul>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <li key={user.id || user._id}>
            {user.name} - {user.email}
            {user.feedback && `Feedback: ${user.feedback}`}
          </li>
        ))
      )}
    </ul>
  );
};
