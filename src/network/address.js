import { request } from './request'
import store from '../store/index.js'
export function getAddress () {
  return request({
    url: '/api/v3/address',
	params: {
		 "token": window.localStorage.token
	}
  })
}
export function postAddress (form_data) {
	console.log('post'+store.state.userName)
	var datalist = {
		  "cityName": form_data.cityName,
		  "defaultFlag": form_data.defaultFlag?1:0,
		  "detailAddress":form_data. detailAddress,
		  "provinceName": form_data.provinceName,
		  "regionName": localStorage.userName,
		  "userName": form_data.userName,
		  "userPhone": form_data.userPhone
		}
  return request({
    url: '/api/v3/address',
	method:'post',
	data:datalist 
  })
}
export function putAddress (param) {
	console.log(param.defaultFlag?1:0)
  return request({
    url: '/api/v3/address',
	method:'put',
	data: {
		"addressId": param.addressId,
		"cityName": param.cityName,
		"defaultFlag": param.defaultFlag?1:0,
		"detailAddress": param.detailAddress,
		"provinceName": param.provinceName,
		"regionName": localStorage.userName,
		"userName": param.userName,
		"userPhone": param.userPhone,
	}
  })
}
export function getAddressInfo (addressId) {
  return request({
    url: '/api/v3/address/'+addressId
  })
}
export function deleteAddress (addressId ) {
	console.log('id: '+addressId)
  return request({
    url: '/api/v3/address/'+addressId,
	method:'delete'
  })
}