import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the import path

// Async thunk to fetch user data from Firestore
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const userRef = doc(db, "users", userId); // Use the imported `db` instance
  const userSnapshot = await getDoc(userRef);
  return userSnapshot.exists() ? userSnapshot.data() : null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user")) || null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.data = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
