<template>
  <h3> Welcome back, {{ $store.state.name }} </h3>
  <h3> Your email is {{ $store.state.email }} </h3>
  <h3> Your data: {{  }}</h3>
  <form @submit.prevent="submitForm">
    <div>
      <label>Mobility status:</label>
      <select v-model="mobilitystatus" class="form-control form-control-lg" placeholder="Select User Type">
        <option value="Sedentary">Sedentary</option>
        <option value="Low Activity">Low Activity</option>
        <option value="Medium Activity">Medium Activity</option>
        <option value="High Activity">High Activity</option>
      </select>
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
      mobilitystatus: '',
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
            mobilitystatus: this.mobilitystatus,
          };
        } else {
          updatedData = {
            email: userEmail,
            mobilitystatus: this.mobilitystatus,
          };
        }
        try {
          await setDoc(doc(db, "Users", userEmail), updatedData);
        } catch (error) {
          console.log(error);
        }
        this.mobilitystatus = '';
        alert('saved successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while saving ');
      }
    },

    mounted() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      
    }
  },

  
  
};
</script>
<style>

</style>