"use client";

import React from "react";

interface SearchInputProps {
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    label: string;
    type?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    id,
    onChange,
    value,
    label,
    type,
}) => {
    return (
        <div className="relative w-full">
            <input 
                id={id}
                value={value}
                type={type}
                onChange={onChange}
                className="block rounded-full 
                           px-6 py-3 w-full 
                           text-black bg-white 
                           appearance-none 
                           border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#ff9901]
                           peer"
                placeholder=" "
            />
            <label 
                className="absolute 
                          left-6 top-1/2 -translate-y-1/2
                          text-gray-500 
                          duration-150 transform
                          pointer-events-none
                          peer-focus:text-sm peer-focus:-translate-y-5 peer-focus:top-1"
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    )
}

export default SearchInput;