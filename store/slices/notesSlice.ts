import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Note {
    id: string;
    title: string;
    content?: string;
}

interface NotesState {
    items: Note[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (note: Partial<Note>) => {
    const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return id;
});

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch notes";
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.items = state.items.filter((n) => n.id !== action.payload);
            });
    },
});

export default notesSlice.reducer;
