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
}) =>{
    return (
        <div className="relative flex-grow">
            <input 
                id={id}
                value = {value}
                type = {type}
                onChange = {onChange}
                
                className="block rounded-full 
                            px-6 py-3 w-full 
                            text-white bg-[#331717] 
                            appearance-none 
                            border border-gray-600 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                            peer"

            />
            <label 
                className="absolute 
                            left-10 top-5
                            text-lg text-zinc-400 
                            duration-150 transform 
                            -translate-y-3 
                            origin-0 
                            peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75
                            peer-focus:-translate-y-6
                            htmlFor={id}">
                {label}
            </label>
        </div>
    )
}

export default SearchInput;