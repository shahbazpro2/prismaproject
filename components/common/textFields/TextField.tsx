import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    type?: string
}

const TextField = ({ name, label, type, ...rest }: InputProps) => {
    return (
        <div>
            {label &&
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>}
            <input
                type={type || "text"}
                {...rest}
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[1px] py-2 px-3 border-gray-300 rounded-md"
            />
        </div>
    )
}

export default TextField