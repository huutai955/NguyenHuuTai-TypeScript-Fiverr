import React, { useEffect } from 'react'
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { signupAPI } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';






type Props = {}
type MyValue = { email: string, password: string, phone: string, birthday: string, gender: boolean, name: string };

export default function SignUp({ }: Props) {
    const dispatch: AppDispatch = useDispatch();
    const [valueDate, setValueDate] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChangeDate = (newValue: Dayjs | null) => {
        setValueDate(newValue);
    };
    const formik: FormikProps<MyValue> = useFormik<MyValue>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: true,
            birthday: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required("Email is not empty!!")
                .email("Your email is incorrect format!!"),
            password: Yup.string()
                .required("Password is not empty!!")
                .min(6, "Password is more than 6 characters!!")
                .max(15, "Password is more than 6 characters!!"),
            phone: Yup.number()
                .required("Phone number is not empty!!"),
            name: Yup.string()
                .required("Name is not empty!!"),

        }),
        onSubmit: (values: MyValue) => {
           signupAPI(values);
        }
    })


    useEffect(() => {
        const dateValue = `${valueDate?.date()}/${Number(valueDate?.month()) + 1}/${valueDate?.year()}`
        formik.setFieldValue('birthday', dateValue)
    }, [valueDate])
    return (
        <div className="signup">
            <div className="container">
                <form className='form' onSubmit={formik.handleSubmit}>
                    <h2>Fiverr</h2>
                    <FormControl style={{ marginBottom: 30 }}>
                        <TextField className='w-100' label="Full Name" variant="outlined" name='name' onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.name}</p>
                    </FormControl>
                    <FormControl style={{ marginBottom: 30 }}>
                        <TextField className='w-100' label="Email" variant="outlined" name='email' onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.email}</p>
                    </FormControl>
                    <FormControl style={{ marginBottom: 30 }}>
                        <TextField className='w-100' label="Password" type={'password'} variant="outlined" name='password' onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.password}</p>
                    </FormControl>
                    <FormControl style={{ marginBottom: 30 }}>
                        <TextField className='w-100' label="Phone" variant="outlined" name='phone' onChange={formik.handleChange} />
                        <p style={{ color: 'red' }}>{formik.errors.phone}</p>
                    </FormControl>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="DD/MM/YYYY"
                                value={valueDate}
                                onChange={handleChangeDate}
                                renderInput={(params) => <TextField className='w-100' {...params} name="birthday" />}
                            />

                        </LocalizationProvider>
                    </FormControl>
                    <FormControl className='mt-3'>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            className='d-flex'
                            style={{ flexDirection: 'row' }}
                            onChange={(e) => {
                                formik.setFieldValue('gender', e.target.value)
                            }}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Male" />
                            <FormControlLabel value={false} control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>

                    <span>You don't have an account,
                        <NavLink to={""}>click here</NavLink>
                    </span>
                    <button type='submit' className='btn btn-success loginBtn'>Login</button>
                </form>
            </div>
        </div>
    )
}