// A mock user model with dummy data.
import bcrypt from "bcryptjs";
export const users = [
    {
        id: 1,
        username: "john",
        password: bcrypt.hashSync("password123", 10), // Hashed password
    },
];
