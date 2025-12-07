const { Pool } = require("pg");

const pool = new Pool({
  user: "gymuser",
  host: "localhost",
  database: "gymapp", // your Postgres DB name
  password: "admin", // leave blank if you didn’t set one
  port: 5432,
});

module.exports = pool;
