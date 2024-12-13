import React from 'react';

const SearchForo = ({ value, onChange, placeholder }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
};

export default SearchForo;
