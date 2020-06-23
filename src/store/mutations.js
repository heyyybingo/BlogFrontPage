module.exports = {
    setIsLogin(state, value) {
        //console.log(typeof (value))
        if (typeof (value) != "boolean") {
            throw new Error("value should be boolean");
        }
        state.isLogin = value
        sessionStorage.setItem("isLogin", value);
    },

    setToken(state, value) {
        //  console.log(typeof (value))
        // console.log(value)
        // console.log(!value)
        // console.log(value === null);
        if (value !== null && typeof (value) != "string") {
            throw new Error("value should be string or null value");
        }
        state.token = value
        sessionStorage.setItem("token", value);
    },
    setUser(state, value) {
        console.log(typeof (value))
        if (value !== null && typeof (value) != "object") {
            throw new Error("value should be Object or null value");
        }
        state.token = value
        sessionStorage.setItem("user", JSON.stringify(value));
    }
}