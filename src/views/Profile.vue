<template>
  <h3> Welcome back, {{ $store.state.name }} </h3>
  <h3> Your email is {{ $store.state.email }} </h3>
  <h3> Your data: {{ $store.state }}</h3>
  <form @submit.prevent="submitForm">
    <div>
      <label>Phone Number:</label>
      <input type="text" v-model="phoneNumber" />
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import { db } from '@/firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      phoneNumber: '',
    };
  },
  methods: {
    async submitForm() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      try {
        const currentDoc = await getDoc(doc(db, "Users", userEmail));
        let updatedData = {};
        if (currentDoc.exists) {
          updatedData = {
            ...currentDoc.data(),
            phoneNumber: this.phoneNumber,
          };
        } else {
          updatedData = {
            email: userEmail,
            phoneNumber: this.phoneNumber,
          };
        }
        try {
          await setDoc(doc(db, "Users", userEmail), updatedData);
        } catch (error) {
          console.log(error);
        }
        this.phoneNumber = '';
        alert('Phone number saved successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while saving the phone number');
      }
    },
  },
  created() {


  },
};
</script>
<style>

</style>