import mongoose from "mongoose"; // First step importing mongoose

// Second step creating user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        }, // what we can also do is username : true 
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"] //.    We can also pass the custom error messages
        }
    },
    { timestamps: true }
)

// 3rd step -> exporting user model 
export const User = mongoose.model("User", userSchema)
// User will converted into plural and all in lower case  User -->> users  (Internal working of mongodb)