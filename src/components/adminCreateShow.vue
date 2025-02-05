<template>
    <div class="admin-create-show">
      <div class="back-button">
      <router-link to="/admin" id="back-butt">Back to Admin Panel</router-link>
    </div>
      <h2>Create Show</h2>
      <form v-if="!showCreated" @submit.prevent="createShow">
        <label for="showName">Show Name:</label>
        <input type="text" id="showName" v-model="showName" required>
  
        <label for="duration">Duration:</label>
        <select id="duration" v-model="duration" required>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
        </select>
  
        <label for="language">Language:</label>
        <select id="language" v-model="language" required>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Kannada">Kannada</option>
        </select>
  
        <label for="image">Image:</label>
        <input type="file" id="image" ref="image" accept="image/*">
  
        <button type="submit">Create Show</button>
      </form>
      <!-- <div v-if="message">{{ message }}</div> -->
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
        showName: '',
        duration: '2',
        language: 'English',
        message: '',
        showCreated: false,
        image: null,
      };
    },
    methods: {
      createShow() {
  const formData = new FormData();
  formData.append('show_name', this.showName);
  formData.append('duration', this.duration);
  formData.append('language', this.language);

  const fileInput = this.$refs.image;
  if (fileInput && fileInput.files[0]) {
    formData.append('image', fileInput.files[0]);
  }
  if (!fileInput || !fileInput.files[0]) {
    alert("Please upload an image before creating the show.");
    
  }

  axios.post('http://127.0.0.1:5000/createshow', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      this.message = response.data.message;
      if (response.data.success) {
        alert("Show is successfully created.");
        this.showName = '';
        this.duration = '2';
        this.language = 'English';
        if (fileInput) {
          fileInput.value = ''; // Safely reset the file input
        }
        this.showCreated = true;
        this.$router.push('/admin');
      }
    })
    .catch(error => {
      console.error('Error creating show:', error);
      this.message = 'Failed to create show. Please try again.';
    });
},
    },
  };
  </script>
    
  <style>
/* Styles for the admin-create-show component */
.admin-create-show {
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
</style>

  