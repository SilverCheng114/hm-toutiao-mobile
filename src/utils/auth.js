// 专门处理用户信息的存储和删除 以及获取放置在 localStorage
const USER_TOKEN = 'hm-toutiao-mobile-91-token' // 这个key专门用来存储用户信息

// 设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表示式
}

// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
