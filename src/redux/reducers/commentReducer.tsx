import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentForm } from '../../pages/JobDetail/JobDetail';
import { http } from '../../util/config';
import { AppDispatch } from '../store';

export interface Comment {
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
}


interface CommentState {
    arrComment: Comment[]
}

const initialState: CommentState = {
    arrComment: []
}

const commentReducer = createSlice({
    name: 'commentReducer',
    initialState,
    reducers: {
        setArrComments: (state: CommentState, action: PayloadAction<Comment[]>) => {
            let cloneArrComment = action.payload;
            cloneArrComment = cloneArrComment.filter((item, index) => {
                return item.ngayBinhLuan !== ''
            })
            state.arrComment = cloneArrComment
        }
    }
});

export const { setArrComments } = commentReducer.actions

export default commentReducer.reducer;

export const getArrCommentAPI = (id: string | number) => {
    return async (dispatch: AppDispatch) => {
        const result: any = await http.get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
        const action = setArrComments(result.data.content);
        dispatch(action);
    }
}



export const postComment = (value: CommentForm, id: string | number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await http.post(`api/binh-luan`, value);
            const resultArrComment = getArrCommentAPI(id);
            dispatch(resultArrComment);
        } catch (err) {
            console.log(err)
        }
    }
}

