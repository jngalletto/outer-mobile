import UserController from '../controllers/UserController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  LOGOUT: 'LOGOUT',
};

const signUpRequest = () => ({
  type: actionTypes.SIGN_UP_REQUEST,
});

const signUpError = error => ({
  type: actionTypes.SIGN_UP_ERROR,
  error,
});

const signUpSuccess = user => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  user,
});

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const signUp = (email, password, firstName, lastName, username) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const user = await UserController.signUp(email, password, firstName, lastName, username);
    dispatch(signUpSuccess(user));
  } catch (error) {
    dispatch(signUpError(error.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(email, password);
    debugger
    dispatch(loginSuccess(user));
  } catch (error) {
    debugger
    dispatch(loginError(error.message));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
