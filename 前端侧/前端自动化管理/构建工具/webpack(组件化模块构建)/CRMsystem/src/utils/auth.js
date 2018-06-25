import Cookies from 'js-cookie'

const TokenKey = 'token'

function getTokenFromUrl() {
  try {
    const search = decodeURIComponent(location.search)
    const str = search.slice(1).split('=')[1]
    const token = str.split('#/')[0]
    return token
  } catch (error) {
    // console.log(error)
    return ''
  }
}
const token = getTokenFromUrl()
if (token) {
  setToken(token)
} else {
  // 没有token，跳转登陆
  location.href = process.env.BASE_API
}
if (process.env.NODE_ENV === 'development') {
  // setToken('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMyfQ.Y9pBrrs5MahuYQNgwkUObtOhOAJvl0bygvqyk6yEhIk')
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
