<template>
  <div id="app">
    <h2>Treasure hunt administration page</h2>
    <br>
    <div v-if="!$store.state.loggedIn">
    <h3>Log in</h3>
    Name : <input v-model="adminName">
      Password: <input v-model="password">
      <button type="button" class="btn btn-green" @click="login" aria-label="Send">
        Log in
      </button>
    </div>

    <div v-if="$store.state.loggedIn">
      <div class="section">
        <h3>Create a new team</h3>
        Team identifier: <input v-model="newName">
        <button type="button" class="btn btn-green" @click="create" aria-label="Send">
          Create
        </button>
      </div>
      <div class="section">
        <h3>Roster</h3>
        <table>
          <tr>
            <th>Team name</th>
            <th>Key</th>
            <th>Completed puzzles</th>
          </tr>
          <tr v-for="team in teams" :key="team.id">
            <td>{{ team.name }}</td>
            <td>{{ team.key }}</td>
            <td>{{ team.completedQuestions }}</td>
          </tr>
        </table>
      </div>
    </div>
    <p class="error">{{errorMsg}}</p>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Submit',
  data () {
    return {
      teams: [],
      newName: this.$route.query.newName,
      password: this.$route.query.password,
      adminName: this.$route.query.adminName,
      errorMsg: ''
    }
  },
  ready () {
    this.refreshRoster()
  },
  beforeCreate: function () {
    axios.get('https://treasure-puzzle.herokuapp.comapi/adminPuzzle/team')
      .then(response => {
        // JSON responses are automatically parsed.
        let teams = response.data

        teams.forEach(function (team, index) {
          teams[index] = team
        })
        this.teams = teams
      })
      .catch(e => {
        console.log(e)
        this.$notify({
          text: 'Error when retrieving teams',
          duration: 5000,
          type: 'error'
        })
      })
  },
  methods: {
    refreshRoster () {
      var self = this
      axios.get('https://treasure-puzzle.herokuapp.com/api/adminPuzzle/team')
        .then(response => {
          // JSON responses are automatically parsed.
          let teams = response.data

          teams.forEach(function (team, index) {
            teams[index] = team
          })
          self.teams = teams
        })
        .catch(e => {
          console.log(e)
          self.$notify({
            text: 'Error when retrieving teams',
            duration: 5000,
            type: 'error'
          })
        })
    },
    create () {
      var self = this
      axios.post('https://treasure-puzzle.herokuapp.com/api/adminPuzzle/team',
        {
          teamName: this.newName
        })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error)
          self.errorMsg = 'Creation error'
        })
    },
    login () {
      var self = this
      axios.post('https://treasure-puzzle.herokuapp.com/api/adminPuzzle/login',
        {
          adminName: this.adminName,
          password: this.password
        })
        .then(function (response) {
          self.$store.commit('logIn')
        })
        .catch(function (error) {
          console.log(error)
          self.errorMsg = 'Login error'
        })
    },
    setkey () {
      this.$store.key = this.key
    }
  }
}
</script>

<style scoped>
#app {
  padding-top: 50px;
}
.error {
  color: red;
}
input {
  width: 275px;
  padding: 5px;
}
.btn {
  margin-top: 10px;
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  font-size: 20px;
}
.section {
  padding: 20px;
}
table {
  width: 100%;
}
</style>
