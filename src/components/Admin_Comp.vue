<template>
  <div>
  <div class="header">
      
      <h1 class="title">Welcome to the Admin Page</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  <div class="admin">
    <div class="boxes">
      <div class="box" @click="selectOption('modifyShow')">Modify Show</div>
      <div class="box" @click="selectOption('modifyTheatre')">Modify Theatre</div>
    </div>
    <div v-if="selectedOption === 'modifyTheatre'" class="options">
      <div class="option" @click="selectTheatreOption('add')">
        <router-link to="/admin_addtheatre">Add a Theatre</router-link>
      </div>
      <div class="option" @click="selectTheatreOption('modify')">
        <router-link to="/admin_modifytheatre">Modify a Theatre</router-link>
      </div>
      <div class="option" @click="selectTheatreOption('remove')"><router-link to="/admin_removetheatre">Remove a Theatre</router-link></div>
    </div>
    <div v-if="selectedOption === 'modifyShow'" class="options">
      <div class="option" @click="selectShowOption('create')">
        <router-link to="/admin_createshow">Create New Show</router-link>
      </div>
      <div class="option" @click="selectShowOption('edit')"><router-link to="/admin_addshowtimings">Add Show Timings</router-link></div>
      <div class="option" @click="selectShowOption('remove')"><router-link to="/admin_removeshow">Remove Show</router-link></div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.message = response.data.logged_in_as.username;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Redirect to login page on error
        this.$router.push('/admin_login');
      });
    } else {
      console.error('No token found');
      this.$router.push('/admin_login');
    }
  },
  data() {
    return {
      selectedOption: null,
      selectedTheatreOption: null,
      selectedShowOption: null
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    selectTheatreOption(option) {
      this.selectedTheatreOption = option;
    },
    selectShowOption(option) {
      this.selectedShowOption = option;
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/admin_login');
    },
  }
};
</script>

<style>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.boxes {
  display: flex;
  justify-content: space-around;
  width: 50%;
}

.box {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.options {
  margin-top: 20px;
}

.option {
  margin-bottom: 10px;
  background-color: lightblue;
  padding: 10px;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* Allows the title to expand and occupy the center */
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-left:60px;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-right:20px;
}

.logout-button:hover {
  background-color: #ff1a1a;
}
</style>
