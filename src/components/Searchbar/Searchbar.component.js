import { useState } from "react";

const Searchbar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setInputValue('');
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="search" className='search__label hidden'>Search a song or artist</label>
      <input
        type="text"
        name="search"
        className="search__input"
        placeholder='Search your song...'
        value={inputValue}
        onChange={handleChange}
      />
      <input type="submit" className='hidden'/>
    </form>
  )
}

export default Searchbar;