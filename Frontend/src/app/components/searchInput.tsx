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
                           focus:outline-none focus:ring-2 focus:ring-[#ff9901]"
                placeholder={label}
            />
        </div>
    )
}

export default SearchInput;