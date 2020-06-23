module.exports = {
    login(context, {
        token,
        user
    }) {
        context.commit("setIsLogin", true);
        context.commit("setToken", token)
        context.commit("setUser", user)
    },
    logout(context) {

        context.commit("setIsLogin", false);
        context.commit("setToken", null);
        context.commit("setUser", null);
    },
    refreshToken(context, {
        token
    }) {
        context.commit("setToken", token)
    }
}