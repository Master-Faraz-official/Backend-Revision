import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false //   Default value 
        },
        // relationship between models
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, //    This is a type just like string , boolean etc
            ref: "User"
        },
        // As subTodo is an array and has type reference of different models
        subTodos: [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "subTodo"
            }
        ]
    }, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema)