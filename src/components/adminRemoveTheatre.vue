<template>
  <div class="theatre-list">
    <router-link to="/admin" id="back-button">Back to Admin Panel</router-link>
    <h2>Theatre List</h2>
    <div class="bubbles-container">
      <div class="bubble" v-for="theatre in theatres" :key="theatre.theatre_id">
        <h3>{{ theatre.theatre_name }}</h3>
        <p><strong>ID:</strong> {{ theatre.theatre_id }}</p>
        <p><strong>Location:</strong> {{ theatre.location }}</p>
        <p><strong>Number of Screens:</strong> {{ theatre.num_screens }}</p>
        <button @click="removeTheatre(theatre.theatre_id)">Delete</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    created() {
    this.fetchTheatres();
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
        theatres: []
      };
    },
    methods: {
      fetchTheatres() {
        axios.get('http://127.0.0.1:5000/theatres')
          .then(response => {
            this.theatres = response.data;
          })
          .catch(error => {
            console.error('Error fetching theatres:', error);
          });
      },
      removeTheatre(theatreId) {
        console.log('this is the id',theatreId);        
        axios.post('http://127.0.0.1:5000/removetheatre', {
          theatre_id: theatreId
        })
        .then(response => {
          if (response.data.success) {
            this.fetchTheatres(); // Refresh the theatre list
            alert(response.data.message);
          } else {
            alert('Failed to remove theatre. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error removing theatre:', error);
          alert('Failed to remove theatre. Please try again.');
        });
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
  .theatre-list {
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  display: inline-block;
}

.bubbles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.bubble {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.bubble:hover {
  transform: translateY(-5px);
}

.bubble h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.bubble p {
  margin: 5px 0;
  font-size: 14px;
}

.bubble button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.bubble button:hover {
  background-color: #ff4c4c;
}
#back-button {
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
  
  