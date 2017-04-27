const city = document.querySelector('.city-input')
const state = document.querySelector('.state-input')
const zipcode = document.querySelector('.zipcode-input')
let myKey

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
  const server = ('http://localhost:3000/key')
  fetch(server, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => console.log(res))

})
function getMyKey(){
  const server = ('http://localhost:3000/key')
  fetch(server, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => res.myKey)
}

window.onload = getMyKey()
