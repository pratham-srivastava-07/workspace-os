import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface PipelineStage {
    id: string;
    name: string;
}

export interface Pipeline {
    id: string;
    title: string;
    stages: PipelineStage[];
}

export interface PipelinesState {
    items: Pipeline[];
    loading: boolean;
    error: string | null;
}

const initialState: PipelinesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchPipelines = createAsyncThunk("pipelines/fetchPipelines", async () => {
    const response = await fetch("/api/pipelines");
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.data;
});

const pipelinesSlice = createSlice({
    name: "pipelines",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPipelines.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPipelines.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPipelines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch pipelines";
            });
    },
});

export default pipelinesSlice.reducer;
