<template>
    <div class="user-rating">
        <div class="header">
      
      <h1 class="title">Welcome to the Home Page</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  
      <div v-if="booking">
        <h2>{{ booking.movie_title }}</h2>
        <p><strong>Show Name:</strong> {{ booking.show_name }}</p>
  
        <div class="rating-section">
          <h3>Rate this Movie:</h3>
          <div class="stars">
            <span 
              v-for="star in 5" 
              :key="star" 
              class="star" 
              :class="{ active: star <= selectedRating }"
              @click="selectRating(star)"
            >
              ★
            </span>
          </div>
          <button class="submit-button" @click="submitRating(selectedRating)">Submit Rating</button>
        </div>
      </div>
  
      <p v-else>Loading booking details...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRating',
    data() {
      return {
        booking: null, // Holds the booking details
        selectedRating: 0, // Stores the selected rating
      };
    },
    created() {
        const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.message = response.data.logged_in_as.username;
        this.fetchBookingDetails();
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
      fetchBookingDetails() {
        const bookingId = this.$route.query.booking_id; // Get booking_id from query parameter
        axios
          .get(`http://127.0.0.1:5000/userRating?booking_id=${bookingId}`) // Adjust the API endpoint as needed
          .then((response) => {
            this.booking = response.data; // Assign the booking details
          })
          .catch((error) => {
            console.error('Error fetching booking details:', error);
          });
      },
      selectRating(rating) {
        this.selectedRating = rating; // Set the selected rating
      },
      logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/');
    },
      submitRating(rating) {
        const bookingId = this.$route.query.booking_id;
        const username = this.$route.query.username;
        const requestData = {
            booking_id: bookingId,
            rating: rating,
            show_name:this.booking.show_name,
            username:username,
        };

        axios.post('http://127.0.0.1:5000/submitRating', requestData, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => {
            if (response.data.success) {
                alert("Rating submitted successfully!");
                this.$router.push({path:'/userProfile',query:{
        username:this.$route.query.username}})
            } else {
                alert(`Failed to submit rating: ${response.data.message}`);
            }
        })
        .catch((error) => {
            console.error("Error submitting rating:", error);
            alert("An error occurred while submitting the rating.");
        });
    },
    },
  };
  </script>
  
  <style scoped>
  .user-rating {
    padding: 20px;
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
  .rating-section {
    margin-top: 20px;
  }
  .stars {
    display: flex;
    gap: 10px;
    font-size: 24px;
    cursor: pointer;
    justify-content: center;
  }
  .star {
    color: #ccc;
  }
  .star.active {
    color: gold;
  }
  .submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .submit-button:hover {
    background-color: #0056b3;
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
  