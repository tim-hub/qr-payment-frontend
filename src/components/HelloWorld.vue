<template>
  <div class="hello">
    <button @click="getCard()">
      Pay 10 dollars to get my Virtual Hop.
    </button>
    <qrcode-stream
    @decode="onDecode"
    @init="onInit"
    :camera="{
      audio: false, // don't request microphone access
      video: {
        width: { min: 360, ideal: 680, max: 1920 }, // constrain video width resolution
        height: { min: 240, ideal: 480, max: 1080 }, // constrain video height resolution
      }
    }
    "
    >
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      error: '',
      cardId: '',
      machineUUID: '',
      baseUrl: "https://nzta.herokuapp.com",
      getACardUrl: "https://nzta.herokuapp.com/issue_a_card",
      scanUrl: "https://nzta.herokuapp.com/scan/",
      balance: 0
    }
  },
  methods: {
    onDecode (decodedString) {
      // ...
      alert(decodedString)
      let url = decodedString.split('/')
      alert(url)
      if (typeof url[url.length-2] !== 'undefined'){
        this.scanUrl += url[url.length-2]
        alert(this.scanUrl)
        this.tagIt(this.scanUrl)
      }
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    getCard(){
      this.axios(
        {
          method:'get',
          url:this.getACardUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((response) => {
          this.cardId = response.data.data.uuid
          this.balance = response.data.data.balance
          alert(this.cardId)
        }
      )
    },
    tagIt(scanUrl){
      alert(scanUrl)
      this.axios(
        {
          method:'get',
          url: scanUrl+'/?card_id='+this.cardId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((response) => {
          this.balance = response.data.data.balance
          alert(this.balance)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
