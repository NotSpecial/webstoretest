<template>
  <div id="app">
    <div id="header">The site header</div>
    <div id="profile">
      Profile, current cart and so on
      <p>Also settings and more thing just to test</p>
      <cart></cart>
    </div>
    <div id="sidebar">
      <router-view name='sidebar'></router-view>
    </div>
    <div id="main">
      <router-view name='main'></router-view>
    </div>
  </div>
</template>

<script>
import Cart from './components/cart';

export default {
  components: { Cart },
  name: 'app',
};
</script>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
}

#header {
  text-align: center;
  margin: 1em;
}

#sidebar {
  float: left;
  width: 20%;
  padding-right: 1em;
}

#main {
  margin-left: 20%;
  margin-right: 20%;
}

#profile {
  float: right;
  width: 20%;
}

.active {
  background-color: red;
}
</style>
