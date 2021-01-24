<template>
  <div>
    <div class="main">
      <!-- <a-button type="primary" block @click="OpenLogin()" shape="round">
              Login With {{ AppName }} Connect
            </a-button> -->
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="Incorrect account or password" />
        <a-form-item>
          <a-input
            size="large"
            type="text"
            :v-model="email"
            placeholder="Username"
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter account name or email address'}, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            type="password"
            :v-model="password"
            option.initialValue="zierong7"
            autocomplete="false"
            placeholder="Password"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please enter the password' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">Remember</a-checkbox>
          <!--
                  <router-link
                    :to="{ name: 'recover', params: { user: 'aaa'} }"
                    class="forget-password"
                    style="float: right;"
                  >Reset Password</router-link>
                  -->
        </a-form-item>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >Sign In</a-button>
          <a-button
            size="large"
            @click="handleGuest"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >Sign In As Guest</a-button>
        </a-form-item>
        <!--
                <div class="user-login-other">
                  &lt;!&ndash;<button @click="SocialLogin3()">auth Google</button>&ndash;&gt;
                  &lt;!&ndash; <span>其他登录方式</span>
                  <a>
                    <a-icon class="item-icon" type="alipay-circle"></a-icon>
                  </a>
                  <a>
                    <a-icon class="item-icon" type="taobao-circle"></a-icon>
                  </a>
                  <a>
                    <a-icon class="item-icon" type="weibo-circle"></a-icon>
                  </a> &ndash;&gt;
                  &lt;!&ndash;<router-link class="register" :to="{ name: 'register' }">注册账户</router-link> &ndash;&gt;
                </div>
                -->
      </a-form>

      <!-- <two-step-captcha
                v-if="requiredTwoStepCaptcha"
                :visible="stepCaptchaVisible"
                @success="stepCaptchaSuccess"
                @cancel="stepCaptchaCancel"
              ></two-step-captcha> -->
    </div>
  </div>

</template>

<script>
// import md5 from 'md5'

import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
/* import { getSmsCaptcha, get2step } from '@/api/login' */
import { AxiosInstance as axios } from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  components: {
    TwoStepCaptcha
  },
  data: function () {
    return {
      email: '',
      password: '',
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      AppName: process.env.VUE_APP_NAME,
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
      console.log(process.env.VUE_APP_API_BASE_URL)
      if (this.$route.query.access_token) {
          Cookies.set(ACCESS_TOKEN, this.$route.query.access_token)
      }

    /*
    get2step({ })
      .then(res => {
        this.requiredTwoStepCaptcha = res.result.stepCode
      })
      .catch(() => {
        this.requiredTwoStepCaptcha = false
      })
      */
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
      OpenLogin () {
	// alert(process.env.VUE_APP_API_BASE_URL)
	// console.log(process.env.VUE_APP_API_BASE_URL)
	const location = process.env.VUE_APP_API_BASE_URL + '/oauth?redirect=' + process.env.VUE_APP_UI_BASE_URL + '/user/logincallback'
	// this.$router.push('/' + location)
	window.location = location
      },
      async SocialLogin4 () {
          await axios.get(process.env.VUE_APP_API_LOGIN_URL + '/google')
      },
      async SocialLogin3 () {
          //  var newWin = window.open(process.env.VUE_APP_API_LOGIN_URL + '/google', '_blank', 'fullscreen=yes,height=600,width=800,top=100,location=no,titlebar=0')
          /*  var loop = setInterval(function () {
              if (newWin.closed) {
                  console.log(newWin.opener)
                  clearInterval(loop)
                  alert('closed')
              }
          }, 5000)  */
      },

      ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleGuest () {
      const {
        state,
        Login
      } = this
      state.loginBtn = true
      Login({ email: 'guest', password: 'guest' })
        .then((res) => {
          this.loginSuccess(res)
        })
        .catch(err => this.requestFailed(err))
        .finally(() => {
          state.loginBtn = false
        })
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['email', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.email
          loginParams[!state.loginType ? 'email' : 'email'] = values.email
          loginParams.password = values.password
            console.log('Login params', loginParams)
          Login(loginParams)
            .then((res) => {
                this.loginSuccess(res)
            })
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
        /*
      const { form: { validateFields }, state } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
         if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile }).then(res => {
            setTimeout(hide, 2500)
            this.$notification['success']({
              message: '提示',
              description: '验证码获取成功，您的验证码为：' + res.result.captcha,
              duration: 8
            })
          }).catch(err => {
            setTimeout(hide, 1)
            clearInterval(interval)
            state.time = 60
            state.smsSendBtn = false
            this.requestFailed(err)
          })
        }
      })
      */
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      /* this.$router.push({ path: '/' }) */
      this.$router.push({ path: 'dashboard' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: 'Welcome Aboard',
          description: `${timeFix()}，Welcome back`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      console.log(err.response.data.error)
      if (err.response.status === 401) {
        this.isLoginError = true
        this.$notification.error({
          message: 'Incorrect Account',
          description: err.response.data.error,
          duration: 4
        })
      } else {
        this.$notification.error({
          message: 'Server Error',
          description: ((err.response || err.response.data.error || err.error || err.response.error || {}).data || {}).message || 'There was an error with the request, please try again later' || err.response.data.error,
          duration: 4
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 50%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
