// A mock user model with dummy data.
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  username: string;
  password: string;
}

export const users: User[] = [
  {
    id: 1,
    username: "john",
    password: bcrypt.hashSync("password123", 10), // Hashed password
  },
];
