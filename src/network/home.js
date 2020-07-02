import { request } from './request'

export function postLogout () {
  return request({
	method:'post',
    url: '/api/v3/user/logout',
	data:{
	"token": window.localStorage.token
	}	 
  })
}

export function getGoodsData (type, page) {
  if(!page){
	  page = 1
  }
  return request({
    url: '/api/v3/search',
    params: {
    keyword:type,
	pageNumber:page
    }
  })
}
 
