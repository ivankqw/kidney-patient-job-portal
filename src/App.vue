<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top"
    style="background-color: #13005D"
  >
    <div class="container-fluid">
      <a class="navbar-brand mb-0 h1" href="#" style="color: white">
        <img
          class="d-inline-block align-bottom"
          src="./assets/icon.png"
          width="50"
          height="50"
        />
        CAREers Portal 
      </a>
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        class="navbar-toggler"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="border-color: white"> </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" v-if=$store.state.email>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" style="color: white"
              >Home</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/my-profile" class="nav-link" style="color: white"
              >My Profile</router-link
            >
          </li>
          
          <li class="nav-item d-lg-none d-xl-none" v-if=$store.state.email>
            <button
              class="btn btn-outline-dark"
              style="color: white"
              @click="$store.dispatch('logout')"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item mt-2 px-3" v-if=$store.state.email style="color:white">
            <font-awesome-icon icon="circle" style="color:green"/>
          {{$store.state.name}}
        </li>
        <li class="nav-item px-2" v-if=$store.state.email>
          <button
            class="btn btn-outline-dark"
            style="color: white"
            @click="$store.dispatch('logout')"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
  
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });
  },

  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.carousel .carousel-item {
  height: 500px;
}

.carousel-item img {
    position: absolute;
    object-fit:cover;
    top: 0;
    left: 0;
    min-height: 500px;
}

</style>