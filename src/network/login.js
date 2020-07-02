import { request } from './request'
import store from '../store/index.js'
export function postLogin (loginName,md5password ) {	
  return request({
    url: '/api/v3/user/login',
	method:'post',
	data:{
    "loginName": loginName,
    "passwordMd5": md5password,
	}	 
  })
}