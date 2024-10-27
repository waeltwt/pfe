// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   pages: [],
// };

// const pageSlice = createSlice({
//   name: 'page',
//   initialState,
//   reducers: {
//     addPage: (state, action) => {
//       // Évite les doublons
//       if (!state.pages.includes(action.payload)) {
//         state.pages.push(action.payload);
//       }
//     },
//     removePage: (state, action) => {
//       state.pages = state.pages.filter(page => page !== action.payload);
//     },
//   },
// });

// // Exporter les actions
// export const { addPage, removePage } = pageSlice.actions;

// // Exporter le réducteur
// export default pageSlice.reducer;
