import {
  GET_MENUS,
  CLICK_MENU,
  GET_USERINFO,
  TOGGLE_SIDE,
  ADD_TAB,
  REMOVE_TAB,
  CHANGE_TAB
} from '../TYPINGS_CONST'
import {getMenus} from '../../api/index'

const state = {
  index: {
    backgroundColor: '#00a65a',
    title: '健康监控平台'
  },
  menus: [],
  clickMenu: [],
  /** 登录系统的时候路由导航拦截到的信息 */
  userInfo: {
    name: '北斗天汇'
  },
  /**控制边框栏的伸缩*/
  toggleSide: true,
  tabs: [],
  activeTab: ''
}
const getters = {
  index: (state) => state.index,
  menus: (state) => state.menus,
  userInfo: (state) => state.userInfo,
  toggleSide: (state) => state.toggleSide,
  clickMenu: (state) => state.clickMenu,
  tabs: (state) => state.tabs
}
const mutations = {
  [GET_MENUS](state, data) {
    state.menus = data
    /** 这里默认给第一个菜单*/
    state.clickMenu = data[0]
  },
  [CLICK_MENU](state, data) {
    console.log(state.menus.filter((item) => (item.id === data)))
    state.clickMenu = state.menus.filter((item) => (item.id === data))[0]
  },
  [GET_USERINFO](state, data) {
    state.userInfo = data
  },
  [TOGGLE_SIDE](state) {
    state.toggleSide = !state.toggleSide
  },
  /** 这里应该用一个数组来保存添加的tabs然后复制给tabs*/
  [ADD_TAB](state, data) {
    if (state.tabs.length > 10) {
      return
    }
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].title === data.title) {
        return
      }
    }
    state.tabs.push(data)
  },
  [REMOVE_TAB](state, data) {
    if (state.tabs.length < 1) {
      return
    }

    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].title === data) {
        state.tabs.splice(i, 1)
      }
    }
  },
  [CHANGE_TAB](state, data) {
    state.activeTab = data
  }

}
const actions = {
  async getMenu({commit}) {
    let data = await getMenus()
    commit('GET_MENUS', data)
  },

  getUserInfo({commit}) {

  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
