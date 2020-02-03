import qs from 'qs';
import { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import service from './axios';
import {Toast} from 'vant';

interface RequestParams {
  api: string;
  method: Method;
  paramsType?: 'form' | 'json';
  isLoading?: boolean;
  params?: any;
}
// 根据请求参数需求组装出不同的参数类型, 默认json格式
function setParam(type?: string, param: object = {}): object {
  const data = {
    header: {},
    params: {},
  };
  if (type === 'form') {
    data.header = 'application/x-www-form-urlencoded';
    data.params = qs.stringify(param);
  } else {
    data.header = 'application/json';
    data.params = param;
  }
  return data;
}
// 统一请求函数
// response 服务器响应数据约束
export interface ResponseResult<T> {
  // 状态码
  code: number;
  // 相应数据
  data: T;
  // 提示数据
  msg: string;
}
let isShowLoading:boolean = true;
export default function request<T>(cigParams: RequestParams): Promise<ResponseResult<T>> {
  const {
    api, method, paramsType, params,
    isLoading = true,
  } = cigParams;
  if (isLoading && isShowLoading) {
    Toast.loading({
      message: 'loading...',
      forbidClick: true,
    });
    isShowLoading = false;
  }
  const reqParams:any = setParam(paramsType, params);
  const config: AxiosRequestConfig = {
    url: api,
    method,
    headers: {
      'Content-Type': reqParams.header,
    },
  };
  if (paramsType === 'json') {
    config.data = reqParams.params;
  } else {
    config.params = cigParams.params;
  }
  return service.request<any, ResponseResult<T>>(config)
    .then(res => res)
    .catch((err: any) => err)
    .finally(() => {
      isShowLoading = true;
    });
}
