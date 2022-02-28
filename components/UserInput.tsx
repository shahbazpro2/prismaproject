import React from 'react'

const UserInput = () => {
    return (
        <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
            </label>
            <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[1px] py-2 px-3 border-gray-300 rounded-md"
            />
        </div>
    )
}

export default UserInput