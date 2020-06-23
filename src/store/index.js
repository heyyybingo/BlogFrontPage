const state = require("./state");
const mutations = require("./mutations");
const actions = require("./actions");
const getters = require("./getters")

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
export default store