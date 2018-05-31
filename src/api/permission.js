import axios from 'axios'

const qs = require('qs')

const baseUrl = ' https://www.easy-mock.com/mock/5afa98f71662122ba3995ee7/demo'

const url = baseUrl + '/permission'
/**
 * 获取用户信息
 * @returns {Promise<any>}
 */
export const getPermissions = () => {
  return new Promise(((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}

/**
 * 根据用户id获取信息
 * @param id
 * @returns {Promise<any>}
 */
export const getUserInfoById = (id) => {
  return new Promise(((resolve, reject) => {
    axios.get(url, id).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}
/**
 * 根据用户名查询嘻嘻
 * @param username
 * @returns {Promise<any>}
 */
export const getUserInfoByUsername = (username) => {
  return new Promise(((resolve, reject) => {
    axios.get(url + '/:username', username).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}


/**
 * 分页查询数据
 * @param currentPage
 * @returns {Promise<any>}
 */
export const getUserInfoByPage = (currentPage) => {
  return new Promise(((resolve, reject) => {
    axios.post(url, currentPage).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}


/**
 * 修改用户信息
 * @param userInfo
 * @returns {Promise<any>}
 */
export const editUserInfo = (userInfo) => {
  return new Promise(((resolve, reject) => {
    axios.post(url, qs.stringify(userInfo)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}

/**
 * 删除用户信息
 * @param id
 * @returns {Promise<any>}
 */
export const removeUserInfo = (id) => {
  return new Promise(((resolve, reject) => {
    axios.post(url, id).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  }))
}
