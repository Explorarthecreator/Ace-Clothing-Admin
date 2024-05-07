import React from 'react'

function Spinner() {
  return (
    <div className=" h-screen flex items-center justify-center">
        <span className="loading loading-infinity w-40 text-white"></span>
    </div>
  )
}

export default Spinner