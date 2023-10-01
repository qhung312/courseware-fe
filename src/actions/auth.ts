import { Dispatch } from 'redux';

import { LOG_IN } from './actionsTypes';

export const login = () => async (dispatch: Dispatch) => {
	try {
		await setTimeout(() => console.log('fetch'), 500);
		dispatch({
			type: LOG_IN,
			payload: {
				isAuthenticate: true,
			},
		});
	} catch (err) {
		dispatch({
			type: LOG_IN,
			payload: {
				isAuthenticate: false,
			},
		});
	}
};
