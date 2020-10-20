import _ from "lodash";

const __SESSION_BEERS_LIST_KEY = '__intl_wk_beers_list';
const __SESSION_PAGE_KEY = '__intl_wk_page';

export const state = () => ({
    list: JSON.parse(localStorage.getItem(__SESSION_BEERS_LIST_KEY)) || null,
    page: localStorage.getItem(__SESSION_PAGE_KEY) || 1
});

export const getters = {
    LIST: (state) => {
        return state.list
    },

    PAGE: (state) => {
        return state.page
    }
};

export const mutations = {
    SET_LIST: (store, list) => {
        store.list = list;
        localStorage.setItem(__SESSION_BEERS_LIST_KEY, JSON.stringify(list));
    },

    SET_PAGE: (store, page) => {
        store.page = page;
        localStorage.setItem(__SESSION_PAGE_KEY, page)
    }
};

export const actions = {
    async FETCH_LIST({commit, state}, {page}) {
        try {
            let beers = _.clone(state.list)
            let beersList = await this.$api.beers.fetchList(page);
            beersList = beersList.list
            if (page > 1) {
                for (let beer in beersList) {
                    beers.push(beersList[beer]);
                }
                beersList = beers;
            }

            if (beersList.length > 0) {
                commit('SET_LIST', beersList);
                commit('SET_PAGE', page);
            }

            return beersList || []
        } catch (e) {
            throw e;
        }
    },

    DELETED_BEER({commit, getters}, beer) {
        let beersList = _.cloneDeep(getters['LIST']);
        let index = beersList.map(x => {
            return x.id;
        }).indexOf(beer.id);


        if (index !== -1) {
            beersList.splice(index, 1);
        }
        commit('SET_LIST', beersList)
    },

    EDIT_BEER({commit, getters}, beer) {
        let beersList = _.cloneDeep(getters['LIST']);
        let index = beersList.map(x => {
            return x.id;
        }).indexOf(beer.id);

        if (index !== -1) {
            beersList[index] = beer;
            console.log(beer)
        }
        commit('SET_LIST', beersList)
    }
};
