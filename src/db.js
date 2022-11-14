import pg from "pg";

const { Pool } = pg;

const databaseConfig = {
    connectionString: 'postgres://postgres:1234@localhost:5432/bookstore',
    ssl:{
        rejectUnauthorized: false
    }
};

const connection = new Pool(databaseConfig);

export default connection;