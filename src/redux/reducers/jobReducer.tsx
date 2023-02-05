import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import { AppDispatch, RootState } from '../store';


export interface JobMenu {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}

export interface DsNhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DsChiTietLoai[];
}

export interface DsChiTietLoai {
  id: number;
  tenChiTiet: string;
}

export interface JobByName {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

export interface JobDetail {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

export interface CongViec {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
}
export interface JobByDetail {
  id: number;
  congViec: CongViec;
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

export interface JobByNameWithPagination {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
}

export interface TypeOfJob {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}




interface JobState {
  arrJob: JobMenu[],
  arrJobByName: JobByName[],
  arrJobByDetail: JobByDetail[],
  pagination: number,
  totalRow: number,
  arrJobByNameWithPagination: JobByNameWithPagination[],
  arrTypeOfJob: TypeOfJob[],
  jobDetail: JobDetail[],
  modalConfirm: boolean
}





const initialState: JobState = {
  arrJob: [],
  arrJobByName: [],
  arrJobByDetail: [],
  arrJobByNameWithPagination: [],
  pagination: 0,
  totalRow: 0,
  arrTypeOfJob: [],
  jobDetail: [],
  modalConfirm: false
}

const jobReducer = createSlice({
  name: 'jobReducer',
  initialState,
  reducers: {
    setJobMenu: (state: JobState, action: PayloadAction<JobMenu[]>) => {
      state.arrJob = action.payload;
    },
    setJobByName: (state: JobState, action: PayloadAction<JobByName[]>) => {
      state.arrJobByName = action.payload;
    },
    setJobByDetail: (state: JobState, action: PayloadAction<JobByDetail[]>) => {
      state.arrJobByDetail = action.payload;
    },
    setarrJobByNameWithPagination: (state: JobState, action: PayloadAction<JobByNameWithPagination[]>) => {
      state.arrJobByNameWithPagination = action.payload;
    },
    setTotalRow: (state: JobState, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    setArrTypeOfJob: (state: JobState, action: PayloadAction<TypeOfJob[]>) => {
      state.arrTypeOfJob = action.payload;
    },
    setJobDetail: (state: JobState, action: PayloadAction<JobDetail[]>) => {
      state.jobDetail = action.payload;
    },
    setModalConfirm: (state: JobState, action: PayloadAction<boolean>) => {
      state.modalConfirm = action.payload;
    },
  }
});

export const {setModalConfirm,setJobDetail, setArrTypeOfJob, setJobMenu, setJobByName, setJobByDetail, setarrJobByNameWithPagination, setTotalRow } = jobReducer.actions

export default jobReducer.reducer

export const getArrJopMenuAPI = () => {
  return async (dispatch: AppDispatch) => {
    const result: any = await http.get('api/cong-viec/lay-menu-loai-cong-viec');
    const action = setJobMenu(result.data.content);
    dispatch(action);
  }
}


export const getArrJobByNameAPI = (param: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    const result: any = await http.get(`api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${param}`);
    const action = setJobByName(result.data.content);
    dispatch(action);
    const actionDetail = setJobByDetail([]);
    dispatch(actionDetail)
  }
}
export const getJobDetailAPI = (param: string | undefined| number) => {
  return async (dispatch: AppDispatch) => {
    const result: any = await http.get(`api/cong-viec/lay-cong-viec-chi-tiet/${param}`);
    const action = setJobDetail(result.data.content);
    dispatch(action);
  }
}



export const getArrJobByDetailAPI = (param: string | number) => {
  return async (dispatch: AppDispatch) => {
    const result: any = await http.get(`api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${param}`);
    const action = setJobByDetail(result.data.content);
    dispatch(action);
    const actionName = setJobByName([]);
    dispatch(actionName)
  }
}

export const getArrTypeOfJobAPI = (param: string | number | undefined) => {
  return async (dispatch: AppDispatch) => {
    const result: any = await http.get(`api/cong-viec/lay-chi-tiet-loai-cong-viec/${param}`);
    console.log(result)
    const action = setArrTypeOfJob(result.data.content);
    dispatch(action);
  }
}

export const getArrJobByNameWithPaginationAPI = (pageIndex: number, keyword: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    if (keyword) {
      const result: any = await http.get(`api/cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=9&keyword=${keyword}`);
      const action = setarrJobByNameWithPagination(result.data.content.data);
      dispatch(action);
      const actionRow = setTotalRow(result.data.content.totalRow)
      dispatch(actionRow)
      const actionName = setJobByDetail([]);
      dispatch(actionName)
    } else {
      const result: any = await http.get(`api/cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=9`);
      const action = setarrJobByNameWithPagination(result.data.content.data);
      dispatch(action);
      const actionRow = setTotalRow(result.data.content.totalRow)
      dispatch(actionRow)
      const actionName = setJobByDetail([]);
      dispatch(actionName)
    }
  }
}

