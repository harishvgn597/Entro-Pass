<template>
    <div class="modify-theatre">
        <router-link to="/admin" id="back-button">Back to Admin Panel</router-link>
      <h2>Modify Theatre</h2>
      <form @submit.prevent="modifyTheatre" v-if="!successMessage">
        <label for="oldName">Old Theatre Name:</label>
        <input type="text" id="oldName" v-model="oldTheatreName" required>
        
        <label for="newName">New Theatre Name:</label>
        <input type="text" id="newName" v-model="newTheatreName" required>
        
        <label for="location">Theatre Location:</label>
        <input type="text" id="location" v-model="location" required>
        
        <label for="screens">Number of Screens:</label>
        <input type="number" id="screens" v-model="numScreens" required>
        
        <button type="submit">Modify Theatre</button>
      </form>
      <div v-if="successMessage" class="success-message">
        <p>{{ message }}</p>
        <router-link to="/admin">Go back to Admin Panel</router-link>
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
        oldTheatreName: '',
        newTheatreName: '',
        location: '',
        numScreens: 0,
        message: '',
        successMessage: false
      };
    },
    methods: {
      modifyTheatre() {
        axios.post('http://127.0.0.1:5000/modifytheatre', {
          old_theatre_name: this.oldTheatreName,
          new_theatre_name: this.newTheatreName,
          location: this.location,
          num_screens: this.numScreens
        },
        {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
        .then(response => {
          this.message = response.data.message;
          this.successMessage = response.data.success;
          //console.log(response.data.success,'response.data.success')
        })
        .catch(error => {
          console.error('Error modifying theatre:', error);
          this.message = 'Failed to modify theatre. Please try again.';
        });
      }
    }
  };
  </script>
  
  <style>
  /* Styles for the modify-theatre component */
  .modify-theatre {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input,
select,
button {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004685;
}

.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .admin-create-show {
    padding: 10px;
  }

  button {
    padding: 5px;
    font-size: 14px;
  }

}
#showName{
  width:auto;
  margin-left:0px;
}
#back-butt {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
    margin-left: 0px;
    margin-right:50px;
}
#newName{
  width:96%;
}
#location{
  width:96%;
}
#oldName{
  width:96%;
}
  </style>
  