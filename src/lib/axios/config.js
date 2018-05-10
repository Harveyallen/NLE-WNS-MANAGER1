import Axios from 'axios';
import qs from 'qs';
import nprogress from 'nprogress';
import { Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
import baseApi from './base_api';

Axios.defaults.baseURL = baseApi; // 默认前缀连接
Axios.defaults.timeout = 2500; // 超时时间
Axios.defaults.transformRequest = [
  function form(params) {
    return qs.stringify(params);
  },
];

// 发送请求之前
function requestTime(config) {
  store.commit('config/loading', true);
  config.headers.Authorization = store.state.token.token;
  nprogress.start();
  return config;
}

// 请求错误
function requestError(error) {
  store.commit('config/loading', false);
  return Promise.reject(error);
}

// 请求拦截器
Axios.interceptors.request.use(requestTime, requestError);

// 响应成功
function responseSuccess(response) {
  store.commit('config/loading', false);
  nprogress.done();
  if (+response.data.status) {
    Message.error(response.data.msg);
    return response.data;
  }
  return response.data;
}

// 响应失败
function responseError(error) {
  nprogress.done();
  store.commit('config/loading', false);
  if (error.response.status === 401) {
    store.commit('token/delToken');
    router.push({
      name: 'login',
    });
    Message.error('请重新登录');
  } else if (error.response.status === 500) {
    Message.error('服务器出错，请稍后重试...');
  } else if (error.response.status === 422) {
    Message.error(error.response.data.msg);
  }
  return Promise.reject(error);
}
// 响应拦截器
Axios.interceptors.response.use(responseSuccess, responseError);

export default Axios;
