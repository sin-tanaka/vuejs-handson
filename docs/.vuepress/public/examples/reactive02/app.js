var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'あなたがページを更新した時刻は' + new Date().toLocaleString()
  }
})