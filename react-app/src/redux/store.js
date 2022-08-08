import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import blockUserSlice from './slices/blockUserSlice';
import jobsExpired from './slices/jobsExpired';

// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     blockUser: blockUserSlice,
//     jobsExpired,
//   },
// });

const combinedReducer = combineReducers({
  auth: authSlice,
  blockUser: blockUserSlice,
  jobsExpired,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/auth_logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
