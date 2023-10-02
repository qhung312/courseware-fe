import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TAuthState = {
	isAuthenticated: boolean;
	loading: boolean;
};

const initialState: TAuthState = {
	isAuthenticated: false,
	loading: false,
};

// Async Actions
const login = createAsyncThunk('auth/login', async () => {
	setTimeout(() => {
		console.log('logged in');
	}, 1000);
});

// Slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isAuthenticated = false;
		});
		builder.addCase(login.fulfilled, (state) => {
			state.isAuthenticated = true;
			state.loading = true;
		});
		builder.addCase(login.rejected, (state) => {
			state.isAuthenticated = false;
		});
	},
});

export const AuthAction = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
