var app4 = new Vue({
  el: '#app-4',
  data: {
    message: ''
  },
  methods: {
    updateMessage: function(e) {
      this.message = e.target.value;
    },
  }
})