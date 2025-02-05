<template>
  <div class="admin-create-show">
    <router-link to="/admin" id="back-button"
      >Back to Admin Panel</router-link
    >
    <h2>Create Show Timings</h2>
    <form @submit.prevent="addShowTimings">
      <label for="theatre_name">Theatre Name:</label>
      <select
        v-model="theatreName"
        id="theatre_name"
        @change="getNumScreens(allTheatres, theatreName)"
      >
        <option v-for="theatre in theatres" :key="theatre.id" :value="theatre">
          {{ theatre }}
        </option>
      </select>

      <label for="show_name">Show Name:</label>
      <select v-model="showName" id="show_name">
        <option v-for="show in shows" :key="show.id" :value="show">
          {{ show }}
        </option>
      </select>

      <label for="date">Date:</label>
      <input type="date" v-model="date" id="date" :min="minDate" />

      <label for="start_time">Start Time:</label>
      <input
        type="time"
        v-model="startTime"
        id="start_time"
        min="10:00"
        max="23:00"
      />

      <label for="screen_number">Screen Number:</label>
      <select v-model="screenNumber" id="screen_number">
        <option v-for="num in numberOfScreens" :key="num" :value="num">
          {{ num }}
        </option>
      </select>

      <label for="seat_number">Number of Seats:</label>
<select v-model="seatNumber" id="seat_number">
  <option v-for="num in numberOfSeats" :key="num" :value="num">
    {{ num }}
  </option>
</select>

      <button type="submit">Create Show Timings</button>
    </form>
    <!-- <div v-if="message">{{ message }}</div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.fetchTheatres();
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
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    now.setMinutes(0, 0, 0); // Reset minutes and seconds to 0
    now.setHours(now.getHours() + 1); // Increment the hour by 1

    const nextHour = now.toTimeString().slice(0, 5);
    return {
      
      showName: "",
      duration: "2",
      language: "English",
      message: "",
      showCreated: false,
      theatres: {},
      shows: {},
      num_screens: {},
      theatreName: "",
      allTheatres: {},
      numberOfScreens: 0,
      screenNumber: 0,
      startTime: nextHour,
      date: today,
      seatNumber: null,
      numberOfSeats: [50, 100, 150, 200]
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      const year = today.getFullYear();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    fetchTheatres() {
      axios
        .get("http://127.0.0.1:5000/theatres")
        .then((response) => {
          this.theatres = {};
          this.allTheatres = response.data;
          response.data.forEach((theatre) => {
            this.theatres[theatre.theatre_id] = theatre.theatre_name;
          });
        })
        .catch((error) => {
          console.error("Error fetching theatres:", error);
        });
    },
    fetchShows() {
      axios
        .get("http://127.0.0.1:5000/shows")
        .then((response) => {
          this.shows = {};
          response.data.forEach((show) => {
            this.shows[show.show_id] = show.show_name;
          });
        })
        .catch((error) => {
          console.error("Error fetching shows:", error);
        });
    },
    getNumScreens(allTheatres, theatreName) {
      const filteredTheatre = allTheatres.find(
        (theatre) => theatre.theatre_name === theatreName
      );
      this.numberOfScreens = filteredTheatre
        ? filteredTheatre.num_screens
        : null;
      console.log("this is the number of screens", this.numberOfScreens);
    },
    addShowTimings() {
      // Make a POST request to Flask backend
      axios
        .post(
          "http://127.0.0.1:5000/addshowtimings",
          {
            theatre_name: this.theatreName,
            show_name: this.showName,
            date: this.date,
            start_time: this.startTime,
            screen_number: this.screenNumber,
            numberOfSeats:this.seatNumber
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$router.push({ path: '/admin'});
        })
        .catch((error) => {
          console.error("Error adding show timings:", error);
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
#back-button{
  margin-right:50px;
}
</style>
