export const Dropdown = ({
  onAllClick,
  onPgClick,
  onMongoClick,
  onJoinedClick,
}) => {
  return (
    <details className="dropdown">
      <summary className="btn m-1">Open or close</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <button className="btn" onClick={onAllClick}>
            All
          </button>
        </li>
        <li>
          <button className="btn" onClick={onPgClick}>
            Postgres
          </button>
        </li>
        <li>
          <button className="btn" onClick={onMongoClick}>
            Mongo
          </button>
        </li>
        <li>
          <button className="btn" onClick={onJoinedClick}>
            Joined
          </button>
        </li>
      </ul>
    </details>
  );
};
