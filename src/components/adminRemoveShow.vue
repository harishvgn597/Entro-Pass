<template>
    <div class="theatre-list">
      <router-link to="/admin" id="back-button">Back to Admin Panel</router-link>
    <div class="header">
      
      <h1 class="title">Show List</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
    
    <div class="bubbles-container">
  <div v-for="show in shows" :key="show.show_id" class="bubble">
    <div class="bubble-content">
      <p><strong>Show ID:</strong> {{ show.show_id }}</p>
      <p><strong>Show Name:</strong> {{ show.show_name }}</p>
      <p><strong>Duration:</strong> {{ show.duration }}</p>
      <p><strong>Language:</strong> {{ show.language }}</p>
    </div>
    <button class="remove-button" @click="removeShow(show.show_id)">Delete</button>
  </div>
</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    created() {
      this.fetchShows();
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
        shows: []
      };
    },
    methods: {
      fetchShows() {
        axios.get('http://127.0.0.1:5000/shows')
          .then(response => {
            this.shows = response.data;
          })
          .catch(error => {
            console.error('Error fetching shows:', error);
          });
      },
      removeShow(showId) {
        console.log('this is the id',showId);        
        axios.post('http://127.0.0.1:5000/removeshow', {
          show_id: showId
        })
        .then(response => {
          if (response.data.success) {
            this.fetchShows(); // Refresh the theatre list
            alert(response.data.message);
          } else {
            alert('Failed to remove show. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error removing show:', error);
          alert('Failed to remove show. Please try again.');
        });
      },
      logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/admin_login');
    }
    }
  };
  </script>
  
  <style>
  /* Styles for the theatre-list component */
  .theatre-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d32f2f;
  }
  
  button:active {
    background-color: #b71c1c;
  }
  .bubbles-container {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(10px, 2vw, 30px); /* Space between bubbles */
  padding: 20px;
}

.bubble {
  background-color: #f9f9f9; /* Light background */
  border: 1px solid #ddd; /* Light border */
  border-radius: 12px; /* Rounded corners */
  padding: 15px;
  width: 250px; /* Fixed width for bubbles */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bubble:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Deeper shadow on hover */
}

.bubble-content p {
  margin: 8px 0;
  font-size: 14px;
  color: #333; /* Text color */
}

.remove-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #ff4d4d; /* Red button */
  color: #fff; /* White text */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: #e60000; /* Darker red on hover */
}
#back-button {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
    margin-left: 60px;
    margin-right: 50px;
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
  
  