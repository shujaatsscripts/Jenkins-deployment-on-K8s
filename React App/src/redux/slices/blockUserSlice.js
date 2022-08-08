import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const slice = createSlice({
  name: 'blockUser',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = null;
    },
  },
});

export default slice.reducer;
