<template>
  <div class="login-container">
    <h1>Welcome to Our EntroPass App!</h1>
    <div class="login-form">
      <h2>User Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <router-link to="/sign_up" class="admin-link">Sign Up</router-link>
    <router-link to="/admin_login" class="admin-link">Admin Login</router-link>
  </div>
</template>
  
  <script>
export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
    const axios = require("axios");

    const username = this.username;
    const password = this.password;

    axios
        .post(
            "http://127.0.0.1:5000/login",
            {
                username: username,
                password: password,
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
    if (response.status === 200 && response.data.authenticated) {
        // Save the JWT token to localStorage
        localStorage.setItem('token', response.data.access_token);

        // Navigate to the home page with the username as a query parameter
        this.$router.push({ path: '/home', query: { username: this.username } });
    } else {
        // Handle authentication failure
        console.error('Authentication failed:', response.data.message);
    }
})
        .catch((error) => {
            console.error("Error:", error);
        });
},
  },
};
</script>
  
  <style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.login-form {
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: auto;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.admin-link {
  display: block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.admin-link:hover {
  text-decoration: underline;
}
</style>
  