<template>
  <div class="container mt-5">
  <div class="row">
  <div class="col-md-6">
    <img src="../assets/download.jpeg" class="img-fluid m-1" alt="Responsive image">
    <img src="../assets/download2.jpeg" class="img-fluid m-1" alt="Responsive image">
  </div>
  <div class="col-md-6 p-5"> 
  <h1>Sign Up</h1>
  <form @submit.prevent="signup">
    <div class="form-group">
      <input type="text" v-model="signupForm.name" placeholder="Your Full Name" class="form-control form-control-lg" />
    </div>
    <br>
    <div class="form-group">
      <input type="text" v-model="signupForm.contactnumber" placeholder="Contact Number"
        class="form-control form-control-lg" />
    </div>
    <br />
    <div class="form-group">
      <input type="email" v-model="signupForm.email" placeholder="Your Email" class="form-control form-control-lg" />
    </div>
    <br />
    <div class="form-group">
      <input type="password" v-model="signupForm.password" placeholder="Password"
        class="form-control form-control-lg" />
    </div>
    <br />
    <div class="form-group">
      <p class="text-left">I am a:</p>
      <select v-model="signupForm.userType" class="form-control form-control-lg">
        <option value="" selected disabled>Please select</option>
        <option value="Employer">Employer</option>
        <option value="Job Seeker">Job Seeker</option>
      </select>
    </div>
    <br />
    <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
    <p class="text-right mt-2 mb-4">
      Already have an account? <router-link to="/login">Log In</router-link>
    </p>
  </form>
</div>
</div>
</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Signup",
  setup() {
    const signupForm = ref({});
    const store = useStore();

    const signup = () => {
      store.dispatch("signup", signupForm.value);
    };

    return {
      signupForm,
      signup,
    };
  },
};
</script>

<style>

</style>