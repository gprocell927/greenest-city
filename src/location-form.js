import React from 'react'

const LocationForm = (props) => {
  const { handleSubmit } = props
  return (
    <div>
      <form>
        <input
          className="city-input"
          type="input"
          placeholder="City"
          />
        <input
          className="state-input"
          type="input"
          placeholder="State"
        />
        <input
          className="zipcode-input"
          type="input"
          placeholder="Zipcode"
        />
        <input
          className="submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  )
}

export default LocationForm
