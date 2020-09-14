import {Pool} from 'pg';

export const pool = new Pool({
    user: "postgres",
    password: "bogdanGermany",
    database: "todo_database",
    host: "localhost",
    port: 5432
});