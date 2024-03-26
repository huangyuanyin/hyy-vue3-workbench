import { defineStore } from 'pinia'
import { login } from '@/api/user'
import jwt_decode from 'jwt-decode'
// import { removeToken, setToken } from '@/utils/auth'
import CryptoJS from 'crypto-js'
import { ElMessage } from 'element-plus'

interface BaseUserInfo {
  id: string
  nickName: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {} as BaseUserInfo,
    token: null
  }),
  getters: {
    nickName: (state) => state.userInfo.nickName
  },
  actions: {
    async Login(loginInfo: { username: string; password: string }) {
      loginInfo.password = CryptoJS.SHA512(loginInfo.password).toString(CryptoJS.enc.Base64)
      let res = await login(loginInfo)
      if (res.code === 1000) {
        this.userInfo = res.data
        this.token = res.data.token
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        localStorage.setItem('token', this.token.replace(/\'/g, ''))
        localStorage.setItem('isAuth', 'true')
        return res.data.token
      } else {
        ElMessage.error(res.msg)
        return false
      }
    },
    async LoginOut() {
      // removeToken()
      // 清除localStorage全部数据
      localStorage.clear()
      sessionStorage.clear()
    }
  }
})
