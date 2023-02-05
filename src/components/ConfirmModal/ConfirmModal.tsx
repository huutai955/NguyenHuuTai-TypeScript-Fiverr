import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalConfirm } from '../../redux/reducers/jobReducer';
import dayjs, { Dayjs } from 'dayjs';
import { formatDate } from '../../util/config';
import { rentTheJobAPI } from '../../redux/reducers/typeOfJobReducer';


type Props = {}
const style = {
    position: 'absolute' as 'absolute',
    top: 200,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function ConfirmModal({ }: Props) {
    const { modalConfirm, jobDetail } = useSelector((state: RootState) => state.jobReducer)
    const { userInfor } = useSelector((state: RootState) => state.userReducer)
    const dispatch: AppDispatch = useDispatch()

    const handleOpen = () => {
        const action = setModalConfirm(true)
        dispatch(action)
    };
    const handleClose = () => {
        const action = setModalConfirm(false)
        dispatch(action)
    };
    const handleConfirm = () => {
        let yourDate = new Date()
        yourDate.toISOString().split('T')[0]
        let formatDateResult = formatDate(yourDate)
        const action = setModalConfirm(false)
        dispatch(action)
        const value = {
            "id": jobDetail[0].id,
            "maCongViec": jobDetail[0].congViec.id,
            "maNguoiThue": userInfor?.id,
            "ngayThue": formatDateResult,
            "hoanThanh": true
        }
        const actionConfirm = rentTheJobAPI(value);
        dispatch(actionConfirm)
    }

    return (
        <div>
            <Modal
                open={modalConfirm}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4>Confirm Modal</h4>
                    <p>Are you sure you want to order this product?</p>
                    <div className='text-end'>
                        <button className='btn' onClick={() => {
                            handleClose()
                        }}>CANCEL</button>
                        <button className='btn' onClick={() => {
                            handleConfirm()
                        }}>OK</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}