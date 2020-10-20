export default $axios => ({
    async fetchList(page) {
        try {
            const list = await $axios.$get('beers?page=' + page);
            if (typeof (list) === 'object') {
                return {
                    list: Object.values(list),
                };
            }
            return null;
        } catch (e) {
            throw (e)
        }
    }
});
