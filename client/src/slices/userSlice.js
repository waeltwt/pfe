import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corriger ici si c'était mal importé

export const register = createAsyncThunk(
  "user/register",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/register", input);
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/login", userData);
      return response.data;
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

// Thunk pour charger l'utilisateur à partir du token dans localStorage
export const loadUserFromToken = createAsyncThunk(
  "user/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        return decodedUser;
      } catch (error) {
        return rejectWithValue("Invalid token");
      }
    } else {
      return rejectWithValue("No token found");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    isAuth: Boolean(localStorage.getItem("token")), // Vérifie si un token est dans le localStorage
    loading: false,
    token: localStorage.getItem("token") || null,
    errors: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.loading = false;
      state.errors = null;
      state.userInfo = {};
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuth = true;
        state.errors = null;
        state.userInfo = jwtDecode(action.payload.token); // Stocker les infos utilisateur
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || "Registration failed. Please try again.";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.isAuth = true;
        state.errors = null;
        state.userInfo = jwtDecode(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || "Login failed. Please try again.";
      })
      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;
        state.isAuth = true;
        state.userInfo = action.payload;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
