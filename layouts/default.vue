<template>
  <div class="layout">
    <TheGeneralNotice/>
    <Layout>
      <Header :style="{ width: '100%'}">
        <a href="#" class="layout-logo">Beers List</a>
      </Header>
      <div class="layout-content" :style="{margin: '20px', background: '#fff'}">
        <nuxt/>
      </div>
      <Footer class="layout-footer-center">2020 - {{ year }}</Footer>
    </Layout>
  </div>
</template>
<script>
import TheGeneralNotice from '~/components/generalNotice';

export default {
  components: {TheGeneralNotice},
  computed: {
    year() {
      return new Date().getFullYear();
    }
  },
}
</script>
<style lang="less">
@import '~assets/css/main';

.layout {
  height: 100%;
  background: #f5f7f9;
  position: relative;
  overflow: auto;

  .ivu-layout-header {
    background: #2a1b48;

    .layout-logo {
      width: max-content;
      height: 40px;
      display: flex;
      align-items: center;
      margin: 12px 0;
      padding: 0 10px;
      border-radius: 3px;
      border: 2px dashed darkorange;
      color: darkorange;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .layout-content {
    height: max-content;
    padding: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
}
</style>

