 <template>
 <div>
    <el-table
      :data="tableData"
      style="width: 100%">
	  <el-table-column
	   prop="addressId"
	    label="编号"
	    width="180">
	  </el-table-column>
	  <el-table-column
	   prop="regionName"
	    label="用户"
	    width="180">
	  </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
	  <el-table-column
	    prop="userPhone"
	    label="电话号码"
	    width="180">
	  </el-table-column>
	  <el-table-column
	    prop="provinceName"
	    label="省份">
	  </el-table-column>
	  <el-table-column
	    prop="cityName"
	    label="城市">
	  </el-table-column>
      <el-table-column
        prop="detailAddress"
        label="地址">
      </el-table-column>
	  <el-table-column
		prop="defaultFlag"
		v-show=" tableData.defaultFlag?1:0 "
	    label="默认地址">
	  </el-table-column>
	  <el-table-column
	  label="操作">
	    <template slot-scope="scope">
			   <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small"	>编辑</el-button>
	           <el-button @click="deleteAddresss(scope.$index,scope.row)" type="text" size="small">删除</el-button>
			   <el-button @click="getaddressInfo(scope.$index,scope.row)" type="text" size="small"	>详情</el-button>
	           
	         </template>
		</el-table-column>
	  </el-table-column>
    </el-table>
	<el-button plain @click="back()">返回</el-button>
	 <el-button plain  @click="add()" >添加</el-button>
	 
	 <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
	       <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
	        <el-form-item label="姓名" prop="userName">
	          <el-input v-model="ruleForm.userName"></el-input>
	        </el-form-item>
	        <el-form-item label="电话号码" prop="userPhone">
	          <el-input v-model="ruleForm.userPhone"></el-input>
	        </el-form-item>
	        <el-form-item label="省份" prop="provinceName">
	          <el-input v-model="ruleForm.provinceName"></el-input>
	        </el-form-item>
	        <el-form-item label="城市" prop="cityName">
	          <el-input v-model="ruleForm.cityName"></el-input>
	        </el-form-item>
	        <el-form-item label="是否默认地址" prop="defaultFlag">
	          <el-switch v-model="ruleForm.defaultFlag"></el-switch>
	        </el-form-item>
	        <el-form-item label="详细地址" prop="detailAddress">
	          <el-input type="textarea" v-model="ruleForm.detailAddress"></el-input>
	        </el-form-item>
	         
	       </el-form>
	       <div slot="footer" class="dialog-footer">
	         <el-button @click="iconFormVisible = false">取 消</el-button>
			 <el-button @click="resetForm('ruleForm')">重 置</el-button>
	         <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
	       </div>
	     </el-dialog>

	 
   </div>
   </template>
 
 <script>
	import qs from 'qs'
	 import {getAddress,postAddress,putAddress,deleteAddress,getAddressInfo} from '../network/address.js'
    export default {
      data() {
        return {
			iconFormVisible:false,
			dialogTitle: '添加',
			rowIndex:null,
            tableData: [],
		    ruleForm: {		
					addressId:'',
					regionName:'',
		            userName: '',
		            userPhone: '',
		            provinceName: '',
		            detailAddress: '',
		            defaultFlag: false,
		            cityName: ''
		          },
				   rules: {
				           userName: [
				              { required: true, message: '请输入姓名', trigger: 'blur' },
				            ],
				            userPhone: [
				              { required: true, message: '请输入号码', trigger: 'blur' }
				            ],
							provinceName: [
							  { required: true, message: '请输入省份', trigger: 'blur' }
							],
							detailAddress: [
							  { required: true, message: '请输入详细地址', trigger: 'blur' }
							],
				            cityName: [
				              { required: true, message: '请输入城市', trigger: 'blur' }
				            ]
				          }
				       
        }
      },
	  created() {
	  	  this.getAddresss()
	  },
	  methods:{
		  add() {
		        this.dialogTitle = '添加';
		        this.userInfo = {};
		        this.iconFormVisible = true;
		      },
		 handleEdit(index, row) {
		        this.dialogTitle = '编辑';
		        this.iconFormVisible = true;
				console.log(row)
				this.ruleForm = row
		        this.rowIndex = index;
				
		      },
		  getAddresss(){
		  getAddress().then((res)=>{
			 console.log(res.data)
			 this.tableData=res.data 
		  }
		  )},
		  postAddresss(param){
			  console.log(param.userName)
			  postAddress(param).then((res)=>{
			  			 console.log(res.message)
						if(res.message=="SUCCESS"){
							var add = this.tableData
							var addid = add[0].addressId
							console.log(this.tableData)
							param.regionName = localStorage.userName
							param.addressId = addid+1
							add.unshift(param)
							this.tableData = add
							console.log(this.tableData)
							console.log(add)
							this.iconFormVisible = false;
													}
						
			  }
		  )},
		  putAddresss(row){
		  			  putAddress(row).then((res)=>{
						  console.log('Put message: '+ res.message)	 
		  			  }
		  )},
		  deleteAddresss(index, row ){
			     this.$confirm(`确定删除${row.addressId}吗?`, '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'error',
			        }).then(() => {
			         deleteAddress(row.addressId ).then((res)=>{
			         	console.log(res.message)
						if(res.message=="SUCCESS"){
							this.tableData.splice('row.addressId',1)
						}
			         		}
			         )
			        });
		  	 },
		   submitForm(formName) {
		          this.$refs[formName].validate((valid) => {
		            if (valid) {
						console.log(this.dialogTitle )
						if(this.dialogTitle=='添加'){
							this.postAddresss(this.ruleForm)	
							this.ruleForm = {}
							console.log("add"+this.ruleForm)
						}
						else if(this.dialogTitle=='编辑'){
							this.putAddresss(this.ruleForm)	
							
							console.log(this.ruleForm)
							 this.iconFormVisible = false;
						}
						else if(this.dialogTitle=='详情'){
							this.iconFormVisible = false;
							}
		            } else {
		              return false;
		            }
		          });
		        },
		        resetForm(formName) {
		          this.$refs[formName].resetFields();
		        },
				back(){
							  this.$router.go(-1);
				},
				getaddressInfo(index,row){
					console.log(row.addressId)
					this.dialogTitle = '详情';
					getAddressInfo(row.addressId).then((res)=>{
						this.ruleForm = res.data;
						this.iconFormVisible = true;
					})
				}
		      }
			
	  }
	  
    
  </script>

<style scoped>
	.demo-ruleForm{
		display: none;
		position: relative;
	}
</style>
