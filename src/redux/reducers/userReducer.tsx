import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http, settings, ACCESSTOKEN, history, USER_PROFILE, MESSAGE_LOGIN } from '../../util/config';
import { AppDispatch, } from '../store';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
}


export interface SignInForm {
  email: string;
  password: string;
}

export interface UserInfor {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  birthday: string;
  avatar?: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
  bookingJob?: any[];
}



interface User {
  userInfor: UserInfor,
  messageLogin: string
}

const initialState: User = {
  userInfor: settings.getStorageJson(USER_PROFILE),
  messageLogin: settings.getStorageJson(MESSAGE_LOGIN) || "",
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserInfor: (state: User, action: PayloadAction<UserInfor>) => {
      state.userInfor = action.payload;
      state.messageLogin = `Login successfully`
      settings.setStorage(MESSAGE_LOGIN, JSON.stringify('Login successfully'))
    },
    setLogOut: (state: User, action: PayloadAction<string>) => {
      state.messageLogin = action.payload
      state.userInfor = {
        id: 0,
        name: "string",
        email: "string",
        phone: "string",
        birthday: "string",
        gender: true,
        role: "string",
        skill: [
        ],
        certification: [
        ],
        password: "",
        bookingJob: [],
        avatar: ''
      }
      localStorage.removeItem(USER_PROFILE)
      localStorage.removeItem(ACCESSTOKEN)
      localStorage.removeItem(MESSAGE_LOGIN)
    },
    updateUserAction: (state: User, action: PayloadAction<UserInfor>) => {
      state.userInfor = action.payload
    },
  }
});

export const { updateUserAction, setUserInfor, setLogOut } = userReducer.actions

export default userReducer.reducer


export const signupAPI = async (infor: SignUpForm) => {
  try {
    const result: any = await http.post('api/auth/signup', infor);
    Swal.fire({
      title: 'Sign up!',
      text: 'Successfully sinup',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } catch (err: any) {
    let error = '';
    if (err.response.data.content === "Email đã tồn tại !") {
      error = 'The email has already!!'
    }
    Swal.fire({
      title: 'Failed signup!!',
      text: error,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


export const signinAPI = (infor: UserInfor) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result: any = await http.post('api/auth/signin', infor);
      console.log(result)
      const action = setUserInfor(result.data.content.user);
      dispatch(action);
      settings.setStorage(ACCESSTOKEN, result.data.content.token)
      settings.setStorageJson(USER_PROFILE, result.data.content.user)
      Swal.fire({
        title: 'Login!',
        text: 'Successfully login',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      Swal.fire({
        title: 'Failed login!!',
        text: 'Have something wrong with email or password.Check your information again!!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}

export const updateUserAPI = (infor: UserInfor, id: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      await http.put(`api/users/${id}`, infor);
      const result: any = await http.get(`/api/users/${id}`);
      const action = updateUserAction(result.data.content);
      dispatch(action);
      console.log(result);
      const action2 = getUserInforAPI(id);
      await dispatch(action2)
    } catch (err) {
      console.log(err);
    }
  }
}

export const getUserInforAPI = (id: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result: any = await http.get(`/api/users/${id}`);
      const action = updateUserAction(result.data.content);
      dispatch(action);
      settings.setStorageJson(USER_PROFILE, result.data.content)
    } catch (err) {
      console.log(err);
    }
  }
}
