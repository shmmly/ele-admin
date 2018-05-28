import {
  GET_MENUS,
  CLICK_MENU,
  GET_USERINFO,
  TOGGLE_SIDE
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
  toggleSide: true
}
const getters = {
  index: (state) => state.index,
  menus: (state) => state.menus,
  userInfo: (state) => state.userInfo,
  toggleSide: (state) => state.toggleSide,
  clickMenu: (state) => state.clickMenu
}
const mutations = {
  [GET_MENUS](state, data) {
    state.menus = data
    /** 这里默认给第一个菜单*/
    state.clickMenu = data[0]
  },
  [CLICK_MENU](state, data) {
    state.clickMenu = state.menus.filter((item) => (
      item.id === data
    ))
  },
  [GET_USERINFO](state, data) {
    state.userInfo = data
  },
  [TOGGLE_SIDE](state) {
    state.toggleSide = !state.toggleSide
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
