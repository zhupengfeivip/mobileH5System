import http from "@/utils/http";

// 发送登录验证码
export const sendLoginCode = (params) => http.post('/v1/send/verify/code', params);
// 发送修改手机号验证码
export const sendModifyPasswordCode = (params) => http.get('/login/modifyPasswordCode', params);
// 验证码登录
export const loginByCode = (params) => http.post('/v1/user/login/by/phone', params);
// 密码登录
export const loginByPwd = (params) => http.post('/login/password', params);
// 密码修改
export const modifyPassword = (params) => http.put('/login/modifyPassword', params);


export const getDeviceList = (params) => http.post('/get/device/list', params);

export const getDeviceDetail = (params) => http.post('/get/device/detail', params);






