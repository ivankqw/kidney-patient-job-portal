<template>
  <h3> Welcome back, {{ $store.state.name }} </h3>
  <h3> Your email is {{ $store.state.email }} </h3>

  <div v-if="this.usertype == 'Employer'">
    <h3>Hi employer</h3>
  </div>

  <div v-if="this.usertype == 'Job Seeker'">
    <h3>Hi Job Seeker</h3>

    <h3> Your mobility: {{ this.profile1.mobilitystatus }}</h3>
    <h3> Your skills and past experience: {{ this.profile1.skills }} </h3>
    <form @submit.prevent="submitForm">
      <div>
        <label>Mobility status:</label>
        <div class="container">
          <h3> Welcome back, {{ $store.state.name }} </h3>
          <h3> Your email is {{ $store.state.email }} </h3>
          <h3> Your data: {{}}</h3>
          <form @submit.prevent="submitForm">
            <div>
              <label>Mobility status:</label>
              <select v-model="mobilitystatus" class="form-control form-control-lg" placeholder="Select User Type">
                <option value="Sedentary">Sedentary</option>
                <option value="Low Activity">Low Activity</option>
                <option value="Medium Activity">Medium Activity</option>
                <option value="High Activity">High Activity</option>
              </select>
              <br>
              <label for="mobility_issues">Additional details for mobility issues:</label><br>
              <textarea name="mobility_issues" id="" cols="100" rows="10" v-model="profile.mobilityissues"></textarea>
              <br>
              <label for="skills">Skills and past experience</label><br>
              <textarea name="skills" id="" cols="100" rows="10" v-model="profile.skills"></textarea>
            </div>

            <button type="submit">Save</button>
          </form>
        </div>

      </div>
      <button class="m-2 btn btn-primary" type="submit">Save</button>
    </form>
    <div class="row fs-4 mt-4">
      <div class="col">Treatment Days</div>
      <div class="col">From</div>
      <div class="col">To</div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="col mt-3">
        <div class="row" v-for="( dayObj, index) in daysState">
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="dayObj.checked" :id="dayObj.name">
              <label class="form-check-label" for="flexCheckDefault">
                {{ dayObj.plural }}
              </label>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input type="time" min="1" max="12" class="form-control" :id="dayObj.name + 'start'"
                :disabled="!dayObj.checked">
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input type="time" min="1" max="12" class="form-control" :id="dayObj.name + 'end'"
                :disabled="!dayObj.checked">
            </div>
          </div>
        </div>
      </div>
      <button class="m-2 btn btn-primary" type="submit">Save</button>
    </form>
  </div>
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
        mobilityissues: '',
      },
      profile1: {
        mobilitystatus: '',
        skills: '',
        mobilityissues: '',
      },
      usertype: 'null',
      currentDoc: null,
      mobilitystatus: '',
      daysState: [
        {
          name: "monday",
          plural: "Monday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "tuesday",
          plural: "Tuesday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "wednesday",
          plural: "Wednesday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "thursday",
          plural: "Thursday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "friday",
          plural: "Friday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "saturday",
          plural: "Saturday",
          checked: false,
          startTime: "",
          endTime: ""
        },
        {
          name: "sunday",
          plural: "Sunday",
          checked: false,
          startTime: "",
          endTime: ""
        },
      ],
    };
  },

  async mounted() {

    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    onSnapshot(doc(db, "Users", userEmail),
      { includeMetadataChanges: true },
      (doc) => {
        this.profile1.mobilitystatus = doc.data().mobilitystatus;
        this.profile1.skills = doc.data().skills
        this.profile1.mobilityissues = doc.data().mobilityissues;
        this.usertype = doc.data().userType

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

          alert('saved successfully!');
        } catch (error) {
          console.error(error);
          alert('An error occurred while saving ');
        }
      }

      if (this.profile.mobilityissues != '') {
        try {
          this.currentDoc = await getDoc(doc(db, "Users", userEmail));
          let updatedData = {
            ...this.currentDoc.data(),
            mobilityissues: this.profile.mobilityissues,
          };
          await setDoc(doc(db, "Users", userEmail), updatedData);

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