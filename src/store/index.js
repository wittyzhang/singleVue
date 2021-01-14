/*
 * @Author: your name
 * @Date: 2021-01-04 16:35:33
 * @LastEditTime: 2021-01-14 11:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /live-merchant-enter-back/src/vuex/store.js
 */

const state = {
  token:'',
  user_info: {},
}
const getters = {
  getUserInfo(){
    return state.user_info;
  }
}

const mutations = {
  set_token(state, token) {
    state.token = token
    sessionStorage.token = token
  },
  del_token(state) {
    state.token = ''
    sessionStorage.removeItem('token')
  },
  set_userInfo(state, userInfo){
    state.user_info = userInfo
    sessionStorage.user_info = JSON.stringify(userInfo)
    // console.log(state)
  }
}

const actions = {
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store;

