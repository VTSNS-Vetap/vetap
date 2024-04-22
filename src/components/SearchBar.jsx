import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 4,
  marginLeft: '35px',
  padding: '5px 10px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
});

const SearchIconWrapper = styled('div')({
  marginRight: 8,
  color: '#666',
});

const SearchInput = styled(InputBase)({
  flex: 1,
});

const SearchBar = ({name, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <SearchBarContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        name={name}
        placeholder="Pretraži..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
