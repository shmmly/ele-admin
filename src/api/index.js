import axios from 'axios'

export const getMenus = () => {
  return new Promise((resolve, reject) => {
    axios.get(' https://www.easy-mock.com/mock/5afa98f71662122ba3995ee7/demo/menu').then(res => {
      resolve(res.data)
    }).catch(res => {
      reject(res)
    })
  })
}

export const get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data)
    }).catch(res => {
      reject(res)
    })
  })
}

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(res => {
      reject(res)
    })
  })
}
