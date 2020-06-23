module.exports = {
    isLogin: sessionStorage.getItem("isLogin") || false,
    token: sessionStorage.getItem("token") || null,
    user: JSON.parse(sessionStorage.getItem("user")) || null
}