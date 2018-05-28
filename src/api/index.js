import axios from 'axios'

export const getMenus = () => {
  return new Promise((resolve, reject) => {
    axios.get(' https://www.easy-mock.com/mock/5afa98f71662122ba3995ee7/demo/menu').then(res => {
      resolve(res.data)
    }).then(resolve => {
      reject(resolve)
    })
  })
}

