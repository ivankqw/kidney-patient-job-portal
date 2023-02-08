<template>
  <h3> Welcome back, {{ $store.state.name }} </h3>
  <h3> Your email is {{ $store.state.email }} </h3>
  <h3> Your mobility: {{ this.profile.mobilitystatus }}</h3>
  <h3> Your skills and past experience: {{  this.profile.skills }} </h3>
  <form @submit.prevent="submitForm">
    <div>
      <label>Mobility status:</label>
      <select v-model="profile.mobilitystatus" class="form-control form-control-lg" placeholder="Select User Type" >
        <option value="Sedentary">Sedentary</option>
        <option value="Low Activity">Low Activity</option>
        <option value="Medium Activity">Medium Activity</option>
        <option value="High Activity">High Activity</option>
      </select>

      <label for="skills">Skills and past experience</label><br>
      <textarea name="skills" id="" cols="100" rows="10" v-model="profile.skills"></textarea>
    </div>

    <button type="submit">Save</button>
  </form>
</template>

<script>
import { db } from '@/firebase';
import { setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onBeforeUpdate } from 'vue';

export default {
  name: "Home",
  data() {
    return {
      profile: {
        mobilitystatus: '',
        skills: '',
      },
      userdata: 'null',
      currentDoc: null
    };
  },
  
  async mounted() {

    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    onSnapshot(doc(db, "Users", userEmail),
    { includeMetadataChanges: true },
      (doc) => {
        this.profile.mobilitystatus = doc.data().mobilitystatus;
        this.profile.skills = doc.data().skills
        
      });

      this.currentDoc = await getDoc(doc(db, "Users", userEmail));

  },

  methods: {
    async submitForm() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      // mobility
      if (this.profile.mobilitystatus != '') {
        try {
        this.currentDoc = await getDoc(doc(db, "Users", userEmail));
        let updatedData = {
          ...this.currentDoc.data(),
          mobilitystatus: this.profile.mobilitystatus,
        };
        await setDoc(doc(db, "Users", userEmail), updatedData);
        this.mobilitystatus = '';
        alert('saved successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while saving ');
      }
      }

      if (this.profile.skills != '') {
        try {
        this.currentDoc = await getDoc(doc(db, "Users", userEmail));
        let updatedData = {
          ...this.currentDoc.data(),
          skills: this.profile.skills,
        };
        await setDoc(doc(db, "Users", userEmail), updatedData);
        this.profile.skills = '';
        alert('saved successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while saving ');
      }
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