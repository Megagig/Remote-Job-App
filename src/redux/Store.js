import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobs/jobsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
export default store;
