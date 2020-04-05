import Vue from 'vue'
import Vuex from 'vuex'

import { reviewStore } from './review.store.js';


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        reviewStore
    }
})
