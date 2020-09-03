<template>
  <div id="app">
    <h2>Pirate puzzle submission page</h2>
    Your ID: <input v-model="id">
    Answer Key: <input v-model="key">
    <br>
    <button type="button" class="btn btn-green" @click="confirm" aria-label="Send">
      Send!
    </button>
    <p class="error">{{errorMsg}}</p>

    <div v-if="$store.state.completed != false">
      <h1>Congratulations!</h1>
      <img v-bind:src="'/static/' + $store.state.completed + '.jpg'">
    </div>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Submit',
  data () {
    return {
      key: this.$route.query.key,
      id: this.$route.query.id,
      errorMsg: '',
      map: ''
    }
  },
  methods: {
    confirm () {
      var self = this
      this.setkey()
      self.errorMsg = ''
      axios.post('/api/answer/',
        {
          key: this.key,
          id: this.id
        })
        .then(function (response) {
          if (response.data.startsWith('6')) {
            self.$store.commit('finished', response.data)
          }
          self.errorMsg = 'Correct! Answer submitted.'
        })
        .catch(function (error) {
          console.log(error)
          self.errorMsg = 'Error - ' + error.response.data
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
</style>
