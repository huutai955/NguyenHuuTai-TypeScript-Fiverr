import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import { AppDispatch } from '../store';
import { ToastContainer, toast } from 'react-toastify';

export interface RentJobForm {
  id:          number;
  maCongViec:  number;
  maNguoiThue: number | undefined;
  ngayThue:    string;
  hoanThanh:   boolean;
}


const initialState = {

}

const typeOfJobReducer = createSlice({
  name: 'typeOfJobReducer',
  initialState,
  reducers: {}
});

export const {} = typeOfJobReducer.actions

export default typeOfJobReducer.reducer


export const rentTheJobAPI = (value: RentJobForm) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result: any = await http.post(`api/thue-cong-viec`, value);
      toast.success('Successfully!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }catch(err) {
      console.log(err);
    }
  }
}