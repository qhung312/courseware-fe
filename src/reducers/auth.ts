import { AnyAction } from 'redux';

import { LOG_IN } from '../actions/actionsTypes';
import { AuthState } from '../types/state';

const initialState: AuthState = {
	isAuthenticated: false,
};

const initialAction: AnyAction = {
	type: '',
	payload: {},
};

const authReducer = (
	state: AuthState = initialState,
	action: AnyAction = initialAction,
): AuthState => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isAuthenticated: true,
			};
	}
	return state;
};

export default authReducer;
