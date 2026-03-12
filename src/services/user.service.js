import db from "../model/db.connect.js";
import bcrypt from "bcrypt";

export const findUserByUsername = async (username) => {
    const [results] = await db.query(
        "SELECT userId, username, password FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    return results[0];
};

export const createUser = async (username, plainPassword) => {
    if (!username) throw new Error("Username is required.");
    if (!plainPassword) throw new Error("Password is required.");

    //hash the password before instert
    const passwordHash = await hashPassword(plainPassword);

    const [result] = await db.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, passwordHash]
    );

    return {
        userId: result.insertId,
        username,
    };
};

export const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

export const validatePassword = async (plainPassword, storedHash) => {
    return await bcrypt.compare(plainPassword, storedHash);
};