const city = document.querySelector('.city-input')
const state = document.querySelector('.state-input')
const zipcode = document.querySelector('.zipcode-input')
const dataDisplay = document.querySelector('.solar-data')
const totalInstalls = document.querySelector('.total-installs')
let gabiKey

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
  const server = (`http://developer.nrel.gov/api/solar/open_pv/installs/summaries?api_key=${gabiKey}&state=${state.value}`)
  fetch(server, {
    method: 'GET',
    headers: {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => dataDisplay.innerHTML = `<ul>
                <li>City: ${city.value || 'undefined'}</li>
                <li>State: ${state.value || 'undefined'}</li>
                <li>Zipcode: ${zipcode.value || 'undefined'}</li>
                <li>Total Installs: ${res.result.total_installs}</li>
                <li>Cap: ${res.result.total_capacity} Mw</li>
                <li>Total Cost: $${res.result.total_installs_with_cost}</li>
                <li>Date that data was taken: ${Date()}</li>
              </ul> <button class="save-button">Save This Location</button>`)
})

// document.querySelector('.save-button').addEventListener('click',(e) => {
//   const server = ('/api/locations')
//   fetch(server, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       id: Date.now(),
    //     content: dataDisplay.innerHTML.value(),
//     })
//   })
//
// })
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
    .then(res => gabiKey = res.myKey)
}

window.onload = getMyKey()
