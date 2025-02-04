import { useQuery } from '@apollo/client';
import { Box, Slider } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { GET_MONSTER_HP_RANGE } from '../../graphql/queries/monsterQueries.ts';
import { useToast } from '../../hooks/useToast.ts';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.tsx';
import MonsterFilterProps from '../../interfaces/MonsterFilterProps.ts';

/**
 * Renders a MonsterFilter component and allows the users to filter monsters based on hit points and type.
 *
 * @param {Set<string>} selectedFilters - Selected filters.
 * @param {function} setSelectedFilters - Updates the selected filters.
 * @param {function} onHpChange - Function to handle HP range change.
 * @param {function} setCurrentPage - Function to reset the current page when filters change.
 * @param {function} onClearFilters - Function to clear all selected filters.
 * @param {object} monsterCounts - Record holding the name and amount of monsters for each filter option.
 * @param {string[]} monsterTypes - List of available monster types to filter by.
 * @param {string} searchTerm - Search term for monsters, in this case you need to clear it fore use of the filter.
 *
 */

export default function MonsterFilter({
  selectedFilters,
  setSelectedFilters,
  onHpChange,
  setCurrentPage,
  onClearFilters,
  monsterCounts,
  monsterTypes,
  searchTerm,
}: MonsterFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: hpRangeData, loading: hpRangeLoading } = useQuery(GET_MONSTER_HP_RANGE);
  const initialHpRange = hpRangeData ? [hpRangeData.monsterHpRange.minHp, hpRangeData.monsterHpRange.maxHp] : [1, 546];
  const [hpRange, setHpRange] = useState<number[]>(initialHpRange);
  const [outOfRangeFilters, setOutOfRangeFilters] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toastContext = useToast();
  const showToast = toastContext ? toastContext.showToast : () => {};

  useEffect(() => {
    if (hpRangeData && !hpRangeLoading) {
      setHpRange([hpRangeData.monsterHpRange.minHp, hpRangeData.monsterHpRange.maxHp]);
    }
  }, [hpRangeData, hpRangeLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setOutOfRangeFilters((prevOutOfRange) => {
      const updatedOutOfRange = new Set(prevOutOfRange);
      let modified = false;

      selectedFilters.forEach((filter) => {
        if (monsterCounts[filter] === 0) {
          updatedOutOfRange.add(filter);
          modified = true;
        } else if (updatedOutOfRange.has(filter)) {
          updatedOutOfRange.delete(filter);
          modified = true;
        }
      });

      return modified ? updatedOutOfRange : prevOutOfRange;
    });
  }, [monsterCounts, selectedFilters]);

  const handleCheckboxChange = (option: string) => {
    setSelectedFilters((prev: Set<string>) => {
      const newFilters = new Set<string>(prev);
      const outOfRange = new Set(outOfRangeFilters);

      if (newFilters.has(option)) {
        newFilters.delete(option);
        outOfRange.delete(option);
      } else {
        newFilters.add(option);
        if (monsterCounts[option] === 0) {
          outOfRange.add(option);
        }
      }

      setOutOfRangeFilters(outOfRange);
      return newFilters;
    });
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    if (searchTerm) {
      showToast({
        message: 'Please clear the search bar before using the filters.',
        type: 'warning',
        duration: 4000,
      });
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setHpRange([min, max]);
    onHpChange(min, max);
  };

  const handleClearFilters = () => {
    if (selectedFilters.size > 0 || hpRange[0] !== initialHpRange[0] || hpRange[1] !== initialHpRange[1]) {
      setSelectedFilters(new Set<string>());
      setHpRange(initialHpRange);
      onHpChange(initialHpRange[0], initialHpRange[1]);
      setOutOfRangeFilters(new Set());
      onClearFilters();
    }
  };

  return (
    <section className="relative text-white" ref={dropdownRef} aria-labelledby="monster-filters">
      <button
        onClick={toggleDropdown}
        className={`sub-header flex items-center px-1 rounded-md border-2 transition-colors duration-200 text-nowrap ${
          searchTerm
            ? 'bg-customGray text-gray-500 border-gray-500 cursor-not-allowed'
            : 'bg-customRed hover:bg-transparent border-customRed hover:border-customRed hover:text-customRed'
        }`}
        style={{ pointerEvents: searchTerm ? 'auto' : 'initial' }}
        aria-expanded={isDropdownOpen}
        aria-controls="monster-filters-dropdown"
      >
        Filter Monsters
        <FaChevronDown className="inline ml-3" />
      </button>
      {isDropdownOpen && (
        <div
          className="absolute bg-customGray shadow-xl shadow-black p-8 rounded min-w-[30vw] w-max z-50 min-h-fit
        xl:top-1/2 xl:left-2 xl:transform xl:-translate-x-2 xl:-translate-y-[-22px]
        left-1/2 transform -translate-x-1/2 "
          role="group"
        >
          <div className="flex gap-3 items-center justify-between" role="group">
            <button
              onClick={handleClearFilters}
              className="transition-colors hover:text-customRed sub-header focus:outline-none focus-visible:ring-2 focus-visible:ring-customRed"
            >
              Clear Filters
            </button>
            <FiX
              className="h-8 w-8 text-white hover:text-customRed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-customRed"
              onClick={toggleDropdown}
              tabIndex={0}
              aria-label="Close"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown();
                }
              }}
            />
          </div>
          <Box>
            <legend className="text bold mt-2">Hit Points:</legend>
            <Slider
              value={hpRange}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={initialHpRange[0]}
              max={initialHpRange[1]}
              sx={{
                '& .MuiSlider-thumb': { color: '#DB3232', width: 24, height: 24 },
                '& .MuiSlider-track': { color: '#DB3232', height: 10 },
                '& .MuiSlider-rail': { color: '#DB3232', height: 10 },
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <em className="xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">min: {hpRange[0]}</em>
              <em className="xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">max: {hpRange[1]}</em>
            </Box>
          </Box>
          <fieldset>
            <legend className="text bold mt-4">Type:</legend>
            <ul className="grid grid-cols-1 gap-x-8 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[...new Set([...monsterTypes, ...Array.from(selectedFilters)])].map((option) => {
                const count = monsterCounts[option] || 0;
                const isDisabled = count === 0 && !selectedFilters.has(option);

                return (
                  <li key={option}>
                    <label
                      className={`flex items-center gap-x-6 text ${isDisabled ? 'text-gray-500' : ''}`}
                      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                    >
                      <CustomCheckbox
                        key={`${option}-${selectedFilters.has(option)}`}
                        checked={selectedFilters.has(option)}
                        onChange={() => handleCheckboxChange(option)}
                        scale={0.8}
                        disabled={isDisabled}
                      />
                      <em className="text">
                        {option} ({count})
                      </em>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>
      )}
    </section>
  );
}
