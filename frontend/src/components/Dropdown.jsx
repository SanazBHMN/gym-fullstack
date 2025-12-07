export const Dropdown = ({
  onAllClick,
  onPgClick,
  onMongoClick,
  onJoinedClick,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 font-semibold">Select User Source</label>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => {
          switch (e.target.value) {
            case "all":
              onAllClick();
              break;
            case "postgres":
              onPgClick();
              break;
            case "mongo":
              onMongoClick();
              break;
            case "joined":
              onJoinedClick();
              break;
            default:
              break;
          }
        }}
      >
        <option value="all">All Users</option>
        <option value="postgres">Postgres Users</option>
        <option value="mongo">Mongo Users</option>
        <option value="joined">Joined Users</option>
      </select>
    </div>
  );
};
