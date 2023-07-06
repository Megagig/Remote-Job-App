import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
};

export const findjobs = createAsyncThunk('jobs/findjobs', async () => {
  try {
    const response = await axios.get(
      'https://remotive.com/api/remote-jobs?category=software-dev'
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
      const jobId = action.payload;
      state.jobs = state.jobs.map((job) =>
        job.id === jobId ? { ...job, details: false } : job
      );
    },
    resetJobDetails: (state, action) => {
      const jobId = action.payload;
      state.jobs = state.jobs.map((job) =>
        job.id === jobId ? { ...job, details: true } : job
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findjobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(findjobs.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.jobs = payload;
      })
      .addCase(findjobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateJobDetails, resetJobDetails } = jobsSlice.actions;
export default jobsSlice.reducer;
