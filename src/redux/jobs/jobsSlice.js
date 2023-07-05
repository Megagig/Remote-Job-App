import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  isLoading: true,
  error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  try {
    const response = await axios.get(
      'https://remotive.com/api/remote-jobs?limit=10'
    );
    return response.data.jobs;
  } catch (error) {
    throw new Error('Failed to fetch jobs');
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    updateJobDetails: (state, action) => {
      const { jobId, details } = action.payload;
      state.jobs = state.jobs.map((job) =>
        job.id === jobId ? { ...job, details: !details } : job
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateJobDetails } = jobsSlice.actions;
export default jobsSlice.reducer;
