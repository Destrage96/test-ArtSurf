import beers from './beers';

export default $axios => ({
    beers: beers($axios),
})
