var app6 = new Vue({
  el: '#app-6',
  data: {
    message: ''
  },
  computed: {
    messageLength: function() {
      // `this` は vm インスタンスを指します
      return this.message.length;
    },
    reversedMessage: function() {
      return this.message.split('').reverse().join('');
    },
  }
})