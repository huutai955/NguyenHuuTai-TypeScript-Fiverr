import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import FirstTemplate from './templates/FirstTemplate/FirstTemplate'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import JobSearching from './pages/JobSearching/JobSearching'
import JobByMenu from './pages/JobByMenu/JobByMenu'
import JobDetail from './pages/JobDetail/JobDetail'
import Login from './pages/Login/Login'
import SecondTemplate from './templates/SecondTemplate/SecondTemplate'
import SignUp from './pages/SignUp/SignUp'
import App from './pages/Demo/App'
import UserInfo from './pages/User/UserInfo'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='' element={<FirstTemplate />}>
                    <Route index element={<Home />} />
                    <Route path='demo' element={<App />} />
                    <Route path='search'>
                        <Route path=':result' element={<JobSearching />} />
                    </Route>
                    <Route path='categories'>
                        <Route path=':result' element={<JobByMenu />} />
                    </Route>
                    <Route path='jobdetail'>
                        <Route path=':result' element={<JobDetail />} />
                    </Route>
                </Route>
                <Route path='' element={<SecondTemplate />}>
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='user'>
                        <Route path=':result' element={<UserInfo />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
