import TextField from '@mui/material/TextField'
import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup'
import { signinAPI } from '../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';


type Props = {}

type MyValue = { email: string, password: string };

export default function Login({ }: Props) {
    const {messageLogin} = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();
    const formik: FormikProps<MyValue> = useFormik<MyValue>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required("Email is not empty!!")
                .email("Your email is incorrect format!!"),
            password: Yup.string()
                .required("Password is not empty!!")
        }),
        onSubmit: (values: MyValue) => {
           const action =  signinAPI(values);
           dispatch(action)
        }
    })


    useEffect(() => {
        if (messageLogin !== '') {
            navigate('/')
        }
    }, [messageLogin])

    return (
        <div className="login">
            <div className="container">
                <form className='form' onSubmit={formik.handleSubmit}>
                    <h2>Fiverr</h2>
                    <div className="form-group" style={{ marginBottom: 30 }}>
                        <TextField className='w-100' label="Email" variant="outlined" name='email'  onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.email}</p>
                    </div>
                    <div className="form-group">
                        <TextField className='w-100' type={'password'} label="Password" variant="outlined" name='password' onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.password}</p>
                    </div>

                    <span>You don't have an account, 
                        <NavLink to={""}>click here</NavLink>
                    </span>
                    <button type='submit' className='btn btn-success loginBtn'>Login</button>
                </form>
            </div>
        </div>
    )
}