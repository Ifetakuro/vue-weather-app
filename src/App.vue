<template>
 <div id="app" :class="typeof weather.main != 'undefined' && weather.weather[0].main !== 'clear' ? 'cloud' : ''">
    <header class="flex gap-4 p-5">
      <h1 class="text-white text-xl">Weather App</h1>
      <img :src="gif" alt="loading gif" class="w-8 h-8"/>
    </header>
  <main class="p-5 container mx-auto">
    <div>
      <input 
      type="text" 
      class="mt-1 block w-full md:w-3/5 px-3 py-2 border border-slate-300 rounded-b-md text-sm shadow-xl mx-auto placeholder-gray-700" 
      placeholder="Search..."
      spellcheck="false"
      v-model="city"
      @keypress.enter="fetchWeather">
    </div>
    <div 
    class="text-white text-center mt-5" 
    v-if="typeof weather.main != 'undefined'">
      <div class="location-box">
        <div class="location font-medium text-3xl p-3">{{ weather.name }}</div>
        <div class="date text-gray-300 p-3"> {{ createDate() }}</div>
      </div>
      <div class="weather-box mt-5">
        <div class="temp text-6xl font-extrabold inline-block py-9 px-12 rounded shadow-xl">{{ Math.round(weather.main.temp) }}°c</div>
        <div class="italic text-2xl font-bold p-3"> {{ weather.weather[0].main }}</div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-96 gap-9">
      <div class="font-medium text-3xl p-9 text-white rounded temp">Type in your city
      </div>
    </div>
  </main>
 </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      apiKey: 'ddcc0f7917ea565687de6b4b9aeb799c',
      city: '',
      weather: {},
  
      gif: require('./assets/search.gif')
    }
  },
  methods: {
    fetchWeather() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`)
      .then(res => {
        return res.json()
      }).then(this.setResults)
    },
    setResults(results) {
      this.weather = results;
      this.city = ''
    },
    createDate() {
      let todaysDate = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[todaysDate.getDay()];
      let date = todaysDate.getDate();
      let month = months[todaysDate.getMonth()];
      let year = todaysDate.getFullYear();

      return `${day} ${date} ${month}, ${year}`;
    }
  },
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&family=Roboto:wght@400;500;700&display=swap');
  body {
    font-family: 'Roboto', sans-serif;
    width: 100%;
  }

  #app {
    background-image: url('./assets/clear.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
    /* -webkit-backdrop-filter: blur(5px); */
    min-height: 100vh;
    transition: 0.4s;
    background-color: rgba(18, 10, 33, 0.7);
    background-blend-mode: darken;
  }

  #app.cloud {
    background-image: url('./assets/cloud.jpg');
  }

  h1 {
    font-family: 'Oleo Script Swash Caps', cursive;
  }

  input {
    background-color: rgba(225,225,225,0.8);
  }

  .temp, .location {
    text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  }

  .temp {
    background-color: rgba(225,225,225,0.5);
  }
</style>
