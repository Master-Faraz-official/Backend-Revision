import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "ThisIsSecret";

// Generating JWT Token by signing with our secret key 
export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// For Verification of token
export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
