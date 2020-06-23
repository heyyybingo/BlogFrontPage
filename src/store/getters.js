module.exports = {
    isLogin: state => {
        return state.isLogin
    },
    token: state => {
        return state.token;
    },
    UserId: state => {
        return state.user._id;
    },
    UserInfo: state => {
        return state.user
    }
}