import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    dueDate?: string;
}

interface TasksState {
    items: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task: Partial<Task>) => {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tasks";
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            });
    },
});

export default tasksSlice.reducer;
