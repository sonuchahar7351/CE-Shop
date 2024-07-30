import React from 'react'

const Loader = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    </div>
  )
}

export default Loader