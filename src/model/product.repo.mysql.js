import pool from './db.connect.js';

export const getAll = async (filters = {}) => {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    // Dynamic filtering logic
    if (filters.size && filters.size !== 'All') {
        query += " AND Size = ?";
        params.push(filters.size);
    }
    if (filters.color && filters.color !== 'All') {
        query += " AND Color = ?";
        params.push(filters.color);
    }
    if (filters.brand && filters.brand !== 'All') {
        query += " AND Brand = ?";
        params.push(filters.brand);
    }

    // Sorting logic
    if (filters.sort === 'price_asc') {
        query += " ORDER BY Price ASC";
    } else if (filters.sort === 'price_desc') {
        query += " ORDER BY Price DESC";
    }

    const [rows] = await pool.query(query, params);
    return rows;
}

export const getById = async id => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id=?", [id]);
    return rows[0] || null;
}