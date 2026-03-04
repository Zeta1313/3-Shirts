import mysql from 'mysql2/promise';

// load environment variables
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// create connection pool
const pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// test connection
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log("Database connection OK");
    } catch (err) {
        console.error("Database connection failed");
        throw err;
    }
};

export default pool;