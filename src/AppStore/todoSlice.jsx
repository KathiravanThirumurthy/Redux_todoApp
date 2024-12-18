import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({
    name:'Todo',
    initialState:[],
    reducers:{
        addTask:(state,action)=>{
            state.push({ id: Date.now(), text: action.payload, completed: true })
        },
        toggleTask:(state,action)=>{
             // Toggle the completed status of a task
                const task = state.find((task) => task.id === action.payload);
                if (task) {
                    task.completed = !task.completed;
                }
               
        },
        removeTask:(state,action)=>{
           // Remove a task by ID
        return state.filter((task) => task.id !== action.payload);

        },
        editTask:(state,action)=>{
            const { id ,newText} = action.payload; // Get task ID and new text
            const task = state.find((task) => task.id === id);
            if (task) {
                task.text = newText; // Update the task text
            }
        }
    }
})
export const {addTask,toggleTask,removeTask,editTask} =todoSlice.actions;
export default todoSlice.reducer;