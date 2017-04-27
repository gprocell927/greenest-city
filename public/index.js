const city = document.querySelector('.city-input')
const state = document.querySelector('.state-input')
const zipcode = document.querySelector('.zipcode-input')

document.querySelector('.zipcode-input').addEventListener('change', ()=> {
  if(zipcode.value.length > 0){
    city.disabled = true
    state.disabled = true
  } else {
    city.disabled = false
    state.disabled = false
  }
})

document.querySelector('.state-input').addEventListener('change', () => {
  if(state.value.length > 0 && city.value.length > 0){
    zipcode.disabled = true
  } else {
    zipcode.disabled = false
  }
})

document.querySelector('.location-form').addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(city.value)
  console.log(state.value)
  console.log(zipcode.value)
  fetch(`https://api.data.gov/nrel/alt-fuel-stations/v1.json?limit=1&api_key=${config.CLIENT_ID}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => console.log(res))

})
