<template>
  <div class="page__container demo-spin">
    <div v-if="emptyBeersList === true" class="empty-list">
      <p>List is empty</p>
    </div>

    <div v-else class="beers__container">
      <div v-for="beer in beersList"
           class="beer__wrap"
           :key="beer.index">

        <div class="beer__head">
          <div class="beer__img">
            <img :src="beer.image_url" alt="beer">
          </div>
          <div class="beer__title">
            <div class="beer__action">
              <p>№: <span>{{ beer.id }}</span></p>
              <div>
                <Tooltip content="edit" placement="top" style="margin-right: 15px">
                  <a @click.prevent="$_onEdit(beer)">
                    <font-awesome-icon fas icon="edit" class="edit"/>
                  </a>
                </Tooltip>

                <Tooltip content="delete" placement="top">
                  <a @click.prevent="$_onDelete(beer)">
                    <font-awesome-icon fas icon="trash" class="trash"/>
                  </a>
                </Tooltip>
              </div>
            </div>
            <p>Name: <span>{{ beer.name }}</span></p>
          </div>
        </div>

        <div class="beer__content">
          <div style="margin-bottom: 10px">
            <Collapse simple>
              <Panel name="brewers_tips">
                Brewers tips:
                <p slot="content">
                  {{ beer.brewers_tips }}
                </p>
              </Panel>
            </Collapse>
          </div>

          <div>
            <Collapse simple>
              <Panel name="description">
                Description:
                <p slot="content">
                  {{ beer.description }}
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>

      <div class="load-button">
        <Button type="primary"
                :class="loading === true ? 'btn-fade' : 'btn-show'"
                @click="$_onLoadMore">Show next
        </Button>
      </div>
    </div>

    <Drawer width="400" v-model="showForm" @on-close="showForm = false">
      <BeerForm :beer="onSelectedBeer" @on-save="$_onSave"/>
    </Drawer>

    <Spin fix v-if="loading === true">
      <Icon type="ios-loading"
            size=18
            class="demo-spin-icon-load"/>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import BeerForm from '../components/beerForm';
import {mixinEventId} from '~/lib/mixins/event-ids';

import _ from 'lodash'

export default {
  layout: 'default',

  components: {
    BeerForm
  },
  mixins: [mixinEventId],

  mounted() {
    this.page = this.$store.getters['beers/PAGE'];
    if (!_.isEmpty(this.beersList)) {
      this.beersList = this.$store.getters['beers/LIST'];
    } else {
      this.fetchBeersList();
    }
  },

  data() {
    return {
      beers: [],
      page: 1,
      loading: false,
      isLoading: false,
      onSelectedBeer: {},
      showForm: false
    }
  },

  computed: {
    beersList: {
      get() {
        return this.$store.getters['beers/LIST'] || [];
      },

      set(value) {
        return this.$store.commit('beers/SET_LIST', value)
      }
    },

    emptyBeersList() {
      return _.isEmpty(this.beersList);
    },
  },

  methods: {
    async fetchBeersList() {
      this.loading = true;
      try {
        this.beers = await this.$store.dispatch('beers/FETCH_LIST', {page: this.page});
      } catch (e) {
        this.$root.$emit(this.EVENT_ID_ALERT_SHOW, {
          type: 'error',
          text: 'Data loading error'
        })
      } finally {
        this.loading = false;
      }
    },

    async $_onLoadMore() {
      this.page = Number(this.page) + 1;
      await this.fetchBeersList();
    },

    $_onEdit(beer) {
      this.onSelectedBeer = beer;
      this.showForm = true;
    },

    $_onDelete(beer) {
      this.$store.dispatch('beers/DELETED_BEER', beer);
    },

    $_onSave() {
      this.showForm = false;
    }
  }
}
</script>

<style lang="less">
.page__container {
  .beers__container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .load-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .btn-fade {
        display: none;
      }

      .btn-show {
        display: block;
      }
    }

    .beer__wrap {
      width: 280px;
      height: fit-content;
      border: 2px solid #605e5e;
      border-radius: 5px;
      margin: 15px 15px 15px 0;
      padding: 10px;

      .beer__head {
        margin-bottom: 15px;
        height: 90px;
        display: flex;

        .beer__title {
          width: 85%;
          overflow: hidden;

          .beer__action {
            display: flex;
            justify-content: space-between;

            .trash {
              color: crimson;
            }

            .edit {
              color: #32d426;
            }
          }

          p {
            font-size: 17px;
            font-weight: bold;

            span {
              color: darkorange;
            }
          }
        }

        .beer__img {
          width: 15%;
          margin-right: 15px;

          img {
            width: 40px;
            height: 90px;
          }
        }
      }
    }
  }

  //64px - header, 69px - footer, 40px - padding, 40px - margin
  .empty-list {
    width: 100%;
    height: calc(100vh - 64px - 69px - 40px - 40px);
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin {
    height: 100px;
    position: relative;
  }
}
</style>

