<template>
    <div class="theatre-list">
      <div class="user-profile-title">
    <router-link :to="{ path: '/home', query: { username: username }}" class="back-button">Back to Home</router-link>
    <div class="user-profile" @click="openProfile">
    <img src="../assets/person_50dp__FILL0_wght400_GRAD0_opsz48.svg" alt="User Profile" class="profile-icon" />
  </div>
</div>
    <div class="header">
    <h2 class="title">Show List</h2>
    <button class="logout-button" @click="logout">Logout</button></div>
      <table>
        <thead>
          <tr>
            <th>Theatre Name</th>
            <th>Show Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Screen Number</th>
            <th>Seats Left</th>
            <th>Select Number of Seats</th>
            <th>Confirm Booking</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="show in shows" :key="show.id">
            <td>{{ show.theatre_name }}</td>
            <td>{{ show.show_name }}</td>
            <td>{{ show.date }}</td>
            <td>{{ show.start_time }}</td>
            <td>{{ show.screen_number }}</td>
            <td>{{ show.numberOfSeats }}</td>
            <td>
      <select v-model="selectedTickets[show.id]">
        <option v-for="n in show.numberOfSeats" :key="n" :value="n">{{ n }}</option>
      </select>
    </td>
    <td>
      <button @click="bookTickets(show.id)">Book</button>
    </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        shows: [],
        selectedTickets: {},
        username: this.$route.query.username,
      };
    },
    watch: {
    // Watch for changes in the route query parameters to update the username if needed
    '$route.query.username'(newUsername) {
      this.username = newUsername;
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.message = response.data.logged_in_as.username;
        this.fetchShows();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Redirect to login page on error
        this.$router.push('/');
      });
    } else {
      console.error('No token found');
      this.$router.push('/');
    }
  },
    
    methods: {
      fetchShows() {
        const showName = this.$route.query.showName;
        console.log('this is the showName',showName);
        axios.get('http://127.0.0.1:5000/showTimings?showName='+showName)
          .then(response => {
            this.shows = response.data;
          })
          .catch(error => {
            console.error('Error fetching shows:', error);
          });
      },
      logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/');
    },
    openProfile(){
      this.$router.push({path:'/userProfile',query:{
        username:this.username
      }})
    },
      bookTickets(showId) {
      const selectedSeats = this.selectedTickets[showId] || 0;
      if (selectedSeats === 0) {
        alert('Please select the number of seats.');
      } else {
        const axios = require("axios");
        const show = this.shows.find(show => show.id === showId);
        const bookingData = {
          theatre_name: show.theatre_name,
          show_name: show.show_name,
          username:this.username,
          date: show.date,
          start_time: show.start_time,
          screen_number: show.screen_number,
          numberOfSeats: selectedSeats
        };
        axios.post('http://127.0.0.1:5000/booking', bookingData,
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
        console.log(`Booking ${selectedSeats} seats for show ${showId}`);
        alert('Show successfully booked')
        this.$router.push({ path: '/home', query: { username: this.username } });
      }
    },
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
  .header{
    display:flex;
    
    justify-content: space-between;
    align-items: center;
  }
  button:active {
    background-color: #b71c1c;
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
.title {
  display: flex;
  justify-content: center;
  
  flex-grow: 1; /* Allows the title to expand and occupy the center */
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-left:60px;
}
.user-profile {
  cursor: pointer;
  
}

.profile-icon {
  font-size: 40px; /* Adjust size as needed */
  color: #000; /* Set icon color to black */
  transition: color 0.3s, transform 0.3s;
  justify-content: right;
  align-items: right;
}

.profile-icon:hover {
  border-color: #007bff; /* Blue hover effect */
  transform: scale(1.1); /* Slight zoom effect */
}
.user-profile-title{
  display:flex;
  
  justify-content: space-between;
}
.back-button{
  display: flex;
  justify-content: center;
  
  flex-grow: 1; /* Allows the title to expand and occupy the center */
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-left:60px;
}
  </style>
  
  