<template>
  <div class="page-user-chat">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <!-- 手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field
      :error-message="errMsg.mobile"
      label="手机号"
      v-model="loginForm.mobile"
      @blur="checkMobile"
      placeholder="请输入手机号"></van-field>
      <van-field
      v-model="loginForm.code"
      @blur="checkCode"
      :error-message="errMsg.code"
      label="验证码"
      placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <div class="btn-box">
        <van-button type="info" size="small" block round>登 录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断是否为空
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机号格式错误'
        return false
      }
      this.errMsg.mobile = '' // 清空信息
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码格式错误'
        return false
      }
      this.errMsg.code = '' // 清空信息
      return true
    },
    login () {
      if (this.checkMobile() && this.checkCode()) {
        // 前端校验通过，还要通过调用接口
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px;
}
</style>
