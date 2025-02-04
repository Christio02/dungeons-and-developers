import { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import SearchBarProps from '../../interfaces/SearchBarProps.ts';

/**
 * A search bar component that shows results based on user input.
 *
 * @param {string} searchTerm - The current search term.
 * @param {function} handleSearchChange - Handles changes in search terms
 * @param {string[]} suggestions - List of suggestions based on the search term.
 * @param {function} onSuggestionClick - Handles the function of the clicked suggestion
 * @param {string} placeholder='Search for a monster...' - Placeholder text.
 * @param {function} .onKeyDown - Handler of keydown
 *
 */

const SearchBar = ({
  searchTerm,
  handleSearchChange,
  suggestions,
  onSuggestionClick,
  placeholder = 'Search for a monster...',
  onKeyDown,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        onSuggestionClick(suggestions[highlightedIndex]);
        setIsFocused(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
      } else if (onKeyDown) {
        onKeyDown(e);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setIsFocused(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex justify-center items-center">
        <CiSearch size="25" className="absolute left-3 top-1/2 transform -translate-y-[60%] text-gray-400" />
        <label htmlFor="search-input" className="sr-only">
          Search field
        </label>
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          placeholder={placeholder}
          maxLength={50}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          onKeyDown={handleKeyDown}
          className="pl-12 px-[1vw] py-[0.5vh] w-[75vw] sm:w-[60vw] md:w-[50vw] xl:w-[30vw] 2xl:w-[25vw] rounded-lg border !text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 sub-header
          placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg lg:placeholder:text-xl"
        />
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-customGray shadow-xl shadow-black rounded z-10 focus: visible">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`px-4 py-2 cursor-pointer ${
                highlightedIndex === index ? 'bg-customRed text-white' : 'hover:bg-customRed'
              } rounded`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
