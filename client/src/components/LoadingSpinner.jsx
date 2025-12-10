import React from 'react'
import { Loader } from 'lucide-react'

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* The Spinning Icon */}
            <Loader className="animate-spin h-16 w-16 text-blue-600" />

            {/* The Text Below */}
            <p className="mt-4 text-lg font-semibold text-gray-700">
                Loading...
            </p>
        </div>
    )
}

export default LoadingSpinner