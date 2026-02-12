import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Bookmark {
    id: string;
    title: string;
    url: string;
}

interface BookmarksState {
    items: Bookmark[];
    loading: boolean;
    error: string | null;
}

const initialState: BookmarksState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async () => {
    const response = await fetch("/api/bookmarks");
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

export const addBookmark = createAsyncThunk("bookmarks/addBookmark", async (bookmark: Partial<Bookmark>) => {
    const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookmark),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

export const deleteBookmark = createAsyncThunk("bookmarks/deleteBookmark", async (id: string) => {
    const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return id;
});

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch bookmarks";
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteBookmark.fulfilled, (state, action) => {
                state.items = state.items.filter((b) => b.id !== action.payload);
            });
    },
});

export default bookmarksSlice.reducer;
