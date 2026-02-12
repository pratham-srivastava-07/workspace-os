import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import notesReducer from "./slices/notesSlice";
import bookmarksReducer from "./slices/bookmarksSlice";
import pipelinesReducer from "./slices/pipelinesSlice";

export * from "./slices/tasksSlice";
export * from "./slices/notesSlice";
export * from "./slices/bookmarksSlice";
export * from "./slices/pipelinesSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        notes: notesReducer,
        bookmarks: bookmarksReducer,
        pipelines: pipelinesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
