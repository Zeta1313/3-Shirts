import pool from './db.connect.js';

//READ
export const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
}

export const getById = async id => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id=?", [id]);
    return rows[0] || null;
}