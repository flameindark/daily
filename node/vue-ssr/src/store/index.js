import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// import { getDataApi } from '../api'
function getDataApi () {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('模拟异步获取数据');
  //   }, 1000);
  // });
  const url = `https://cnodejs.org/api/v1/topics?limit=10&tab=good`;
  return axios.get(url).then((data)=>{
    return data.data && data.data.data
  })
}
function createStore () {
  const store = new Vuex.Store({
    state: {
      datas: '' // 数据
    },

    mutations: {
      setData (state, data) {
        state.datas = data // 赋值
      }
    },

    actions: {
      fetchData ({ commit }) {
        return getDataApi().then(res => {
          commit('setData', res)
        })
      }
    }
  })

  return store
}

export default createStore