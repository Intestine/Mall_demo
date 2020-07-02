<template>
  <div class="block">
	<el-menu   class="el-menu-demo" mode="horizontal" @select="handleSelect">
	<el-submenu index="1">
    <template slot="title">我的信息</template>
    <el-menu-item index="1-1">地址管理</el-menu-item>
    <el-menu-item index="1-2">Logout</el-menu-item>
    </el-submenu>
    </el-menu>
  
<div class="block">
	<el-col id="elc" v-for="(item, index) in this.goodsLists" :key="index" >
	  <el-card class="box-card"  >
	    <img :src= "url+item.goodsCoverImg" class="image" >
		 <div>
	      <span>{{ item.goodsName }}</span>
		   </div>
		   <div>
	       <time class="time">价格：¥{{ item.sellingPrice }}</time> 
		   </div>
		  <span>{{item.goodsIntro}}</span>
	  </el-card>
	</el-col>
</div>
 <div>
	 <div class="block" >
	   <el-pagination
          background
	      layout="prev, pager, next"
		  @current-change="findAllPage(currtPage)"
		  :current-page.sync="currtPage"
	      :total="totalCount">
	   </el-pagination>
	 </div>
		
 </div>
</div>
</template>

<script>
// @ is an alias to /src
import { postLogout, getGoodsData } from '../network/home.js'
import store from '../store/index.js'
import axios from 'axios'
export default {
  name: 'Home',
  data (){
	  return{
		goodsLists:[],
		totalCount:1,
		pageIndex:1,
		pageSize:10,
		currtPage: 1,
		url:"http://test11.hctwallet.com/"
		}
  },
  components: {

  },
  created() {
	 console.log('created')
	 console.log('home token'+store.state.token)
	 
  	 this.findAllPage()
  },
  methods: {
	  findAllPage(index){
		let _this = this;
		 if(index){
			 this.currtPage=index
		 }
		 axios.defaults.headers.common['token'] = window.localStorage.token
		 console.log(window.localStorage.token)
		 axios.get("http://test11.hctwallet.com/api/v3/search?keyword=%E6%89%8B%E6%9C%BA&pageNumber="+this.currtPage).then((res)=>{
			_this.goodsLists=res.data.data.list
			_this.totalCount=res.data.data.totalCount
			_this.pageIndex=res.data.data.pageIndex
			_this.currtPage=res.data.data.currPage
			console.log(res.data.data.currPage)
		 })
	  }
	 ,
	   handleSelect(keyPath) {
	         if(keyPath=='1-1'){
				 let redirect = decodeURIComponent(this.$route.query.redirect || '/Address');
				 this.$router.push({
				         path: redirect
				 		})	   
				}
				else if(keyPath=='1-2'){	
					postLogout()
					store.commit('LOGOUT')
					console.log('logout')
					let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
					this.$router.push({
					path: redirect
					})	
				}
	        } ,
	
  }
}
</script>
<style>
 #elc{
	 display: flex;
	 float:left;
	 height:395px;
	 width:20%;
	 padding :10px ;
 }
.block{
	 margin: 0px;
	 padding: 0px;
	 overflow: auto;
 }
 
</style>
