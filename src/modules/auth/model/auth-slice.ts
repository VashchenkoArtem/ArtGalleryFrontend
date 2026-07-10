import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setAccessToken, setAuthChecked } = authSlice.actions;
export const authReducer = authSlice.reducer;