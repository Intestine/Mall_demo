<template>
  <div class="login">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postLogin } from '../network/login.js'
import store from '../store/index.js'
import router from '../router/index.js'
import message from 'element-ui'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
	var validateAcc = (rule, value, callback) => {
	  if (value === '') {
	    callback(new Error('请输入账号'))
	  } else {
	    if (this.ruleForm.checkAcc !== '') {
	      this.$refs.ruleForm.validateField('checkAcc')
	    }
	    callback()
	  }
	}
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
		account:[
			{ validator: validateAcc, trigger: 'blur' }
		]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
			postLogin (this.ruleForm.account,this.md5password).then(res=>{
			if(res.message=='SUCCESS'){
				this.$store.commit('LOGIN', res.data)
				this.$store.commit('addUser',  this.ruleForm.account)
				console.log('login token'+store.state.token)
				console.log("user:"+this.ruleForm.account)
				let redirect = decodeURIComponent(this.$route.query.redirect || '/home');
				this.$router.push({
				        path: redirect
						})	
			}
			else {
				alert("账号或密码错误，请重试")
			}
		},error=>{
			console.log('faild')
		})
		} else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
   },
   computed: {
		md5password: function (){
		let pwd = this.ruleForm.pass;
		let md5 = require('js-md5');
		let pwdkey = md5(pwd);
		return pwdkey;
		
		}
	},
}
</script>

<style scoped>
	.login{
		width: 50%;
		display: block;
		margin: 100px auto;
	}
</style>

