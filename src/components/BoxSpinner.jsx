import React from 'react'

function BoxSpinner({col}) {
  return (
    <div className=" h-5/6 flex items-center justify-center mt-20">
        <span className={`loading loading-bars w-24 text-${col}`}></span>
    </div>
  )
}

export default BoxSpinner