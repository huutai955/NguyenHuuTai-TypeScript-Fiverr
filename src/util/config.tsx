import axios from "axios";
import React from 'react'
import { createBrowserHistory } from "history";


export const USER_LOGIN = 'userLogin';
export const USER_PROFILE = 'userProfile';
export const ACCESSTOKEN = 'accessToken';
export const MESSAGE_LOGIN = 'messageLogin';


// History
export let history = createBrowserHistory();



// Get date
export const formatDate = (date: any) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}


// history dùng để chuyển hướng trang trong các file không phải là component

export const settings = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name)
            if (typeof dataStore === 'string') {
                const data = JSON.parse(dataStore);
                return data
            }
            return undefined
        }
        return; //undefined
    },
    getStore: (name: string): string | null | undefined => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name);
            return data
        }
        return; //undefined
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name: number): any => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name: number, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name: string): string | null => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name: string): void => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
//Setup hằng số, 1 số hàm xử lý chung, ...
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MSIsIkhldEhhblN0cmluZyI6IjEyLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDQ3NjgwMDAwMCIsIm5iZiI6MTY2NTI0ODQwMCwiZXhwIjoxNjk0NjI0NDAwfQ.SUELcPShU58ZkNS3CbFDhM02KMzll9j00ndjVSaiJ8Q'
export const http = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/', //tất cả các hàm khi gọi api đều sử dụng domain này
    timeout: 30000 //nếu request mất 5 phút mà không nhận được kết quả thì huỷ request
});
//Cấu hình cho request: Client gửi api đến server
http.interceptors.request.use((config: any) => {
    config.headers = {
        ...config.headers,
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: 'Bearer ' + settings.getStore(ACCESSTOKEN),
        token: settings.getStore(ACCESSTOKEN)
    }

    return config;

}, err => {
    console.log(err);
    return Promise.reject(err);
})
//cấu hình cho response: Server sẽ trả dữ liệu về cho client
http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    //Thất bại của tất cả request sử dụng http sẽ trả vào đây
    // if (error.response?.status === 401) {
    //     // window.location.href = '/login';
    //     //Chuyển hướng trang mà không cần reload lại trang để giữ được các state hiện tại trên redux
    //     history.push('/login');
    // }
    return Promise.reject(error);
})
