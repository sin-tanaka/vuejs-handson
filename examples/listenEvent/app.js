var app3 = new Vue({
  el: '#app-3',
  data: {
    alertMessage: 'ボタンが押されました'
  },
  methods: {
    popAlert: function() {
      alert(this.alertMessage);
    },
  }
})