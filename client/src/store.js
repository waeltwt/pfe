import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
// import pageReducer from './slices/pageSlice';
import { thunk } from 'redux-thunk'; // Import sans accolades car ce n'est pas un export nommé

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    // page: pageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production', // Active les DevTools uniquement en développement
});

export default store;