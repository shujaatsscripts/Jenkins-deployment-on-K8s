import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const slice = createSlice({
  name: 'jobsExpired',
  initialState,
  reducers: {
    setExpired: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default slice.reducer;
