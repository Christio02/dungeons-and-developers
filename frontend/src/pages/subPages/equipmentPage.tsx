import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import EquipmentCard from '../../components/SubPages/EquipmentCard.tsx';
import useEquipments from '../../hooks/useEquipments.ts';
import { useToast } from '../../hooks/useToast.ts';
import { Equipment } from '../../interfaces/EquipmentProps.ts';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import useEquipmentSuggestions from '../../hooks/useEquipmentsSuggestions.ts';
import CustomButton from '../../components/CustomButton/CustomButton.tsx';
import { useMediaQuery } from 'react-responsive';
import LoadingHourglass from '../../components/LoadingHourglass/LoadingHourglass.tsx';
import { useCharacterContext } from '../../context/CharacterContext.ts';
import { useReactiveVar } from '@apollo/client';
import { equipmentsVar } from '../../utils/apolloVars.ts';
import { useLocation } from 'react-router-dom';
import { handleError } from '../../utils/handleError.ts';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

/**
 * EquipmentPage Component
 *
 * A comprehensive equipment management page for D&D character creation.
 *
 * Features:
 * - Equipment search with auto-suggestions
 * - Paginated equipment grid display
 * - Add/remove equipment functionality with undo support
 * - Inventory limit management (max 10 items)
 * - Responsive layout with mobile/desktop variants
 * - Animated transitions between pages
 *
 * State Management:
 * - Search term persistence using sessionStorage
 * - Equipment state through Apollo reactive variables
 * - Pagination state with session persistence
 * - Loading states for async operations
 *
 * Component Structure:
 * - MainPageLayout wrapper
 * - SearchBar with suggestions
 * - Animated equipment grid
 * - Pagination controls
 * - Toast notifications for user feedback
 *
 * User Interactions:
 * - Search equipment with debounced input
 * - Add/remove individual items
 * - Remove all equipment with undo option
 * - Navigate paginated results
 * - Mobile-responsive view switching
 *
 * Loading States:
 * - Loading indicator during data fetch
 * - No results message for empty searches
 * - Disabled states for inventory limits
 *
 * @returns Rendered EquipmentPage component
 */

const EquipmentPage = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1024 });

  const currentUserEquipments = useReactiveVar(equipmentsVar);

  const { addToEquipments, removeFromEquipments, removeAllEquipments } = useCharacterContext();

  const { showToast } = useToast();

  const location = useLocation();
  const currentPath = location.pathname;

  const undoRemoveRef = useRef<Equipment | Equipment[] | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>(sessionStorage.getItem('equipmentSearchTerm') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
    sessionStorage.getItem('equipmentSearchTerm') || ''
  );

  const [direction, setDirection] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(sessionStorage.getItem('equipmentCurrentPage') || '1', 10)
  );

  const equipmentsPerPage = 20;
  const maxEquipments = 10;

  const { suggestions: equipmentSuggestions } = useEquipmentSuggestions(searchTerm);
  const [noResults, setNoResults] = useState(false);

  const shouldFetchEquipments = currentPath.includes('/equipment') || currentPath.includes('/mycharacter');

  const {
    equipments: fetchedEquipments,
    totalEquipments: fetchedTotalEquipments,
    loading,
  } = useEquipments(debouncedSearchTerm, currentPage, equipmentsPerPage, shouldFetchEquipments);

  const [equipments, setEquipments] = useState<Equipment[]>(fetchedEquipments);

  useEffect(() => {
    setEquipments(fetchedEquipments);

    if (!loading && debouncedSearchTerm) {
      setNoResults(fetchedTotalEquipments === 0);
    }
  }, [fetchedEquipments, fetchedTotalEquipments, debouncedSearchTerm, loading]);

  useEffect(() => {
    sessionStorage.setItem('equipmentSearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    sessionStorage.setItem('equipmentCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const savedSearchTerm = sessionStorage.getItem('equipmentSearchTerm');
    const savedPage = sessionStorage.getItem('equipmentCurrentPage');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      setDebouncedSearchTerm(savedSearchTerm);
    }
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('equipmentSearchTerm');
      sessionStorage.removeItem('equipmentCurrentPage');
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const triggerSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setDebouncedSearchTerm(trimmedSearchTerm);
      setCurrentPage(1);
    } else {
      showToast({
        message: 'Please enter a valid search term.',
        type: 'warning',
        duration: 2000,
      });
      setNoResults(false);
    }
  };

  const undoRemoveEquipment = async () => {
    if (undoRemoveRef.current && !Array.isArray(undoRemoveRef.current)) {
      const equipment = undoRemoveRef.current;
      undoRemoveRef.current = null;
      //equipmentsVar([...equipmentsVar(), equipment]);

      addToEquipments(equipment);
      showToast({
        message: `${equipment.name} restored to equipments`,
        type: 'success',
        duration: 3000,
      });
    }
  };

  const undoRemoveAllEquipments = async () => {
    if (undoRemoveRef.current && Array.isArray(undoRemoveRef.current)) {
      const equipmentsToRestore = undoRemoveRef.current;
      undoRemoveRef.current = null;
      try {
        await Promise.all(equipmentsToRestore.map((equipment) => addToEquipments(equipment)));

        const updatedEquipments = [...equipmentsVar(), ...equipmentsToRestore];
        equipmentsVar(updatedEquipments);

        showToast({
          message: 'All equipments restored',
          type: 'success',
          duration: 3000,
        });
      } catch (error) {
        handleError(error, 'Error adding back equipment', 'critical', showToast);
      }
    }
  };

  const handleEquipmentChange = async (checked: boolean, equipment: Equipment) => {
    try {
      if (checked) {
        if (currentUserEquipments.length >= maxEquipments) {
          showToast({
            message: 'Cannot add any more items, inventory is full',
            type: 'warning',
            duration: 2000,
          });
          return;
        }

        addToEquipments(equipment);
        showToast({
          message: `${equipment.name} was added to your equipments`,
          type: 'success',
          duration: 3000,
        });
      } else {
        removeFromEquipments(equipment);
        undoRemoveRef.current = equipment;
        showToast({
          message: `${equipment.name} removed from equipments`,
          type: 'info',
          duration: 5000,
          undoAction: undoRemoveEquipment,
        });
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  const handleRemoveAllEquipments = async () => {
    if (currentUserEquipments.length === 0) return;
    undoRemoveRef.current = [...currentUserEquipments];

    try {
      removeAllEquipments();
      showToast({
        message: 'All equipments removed',
        type: 'info',
        duration: 5000,
        undoAction: undoRemoveAllEquipments,
      });
    } catch (error) {
      console.error('Error removing all equipments:', error);
      showToast({
        message: 'Failed to remove all equipments',
        type: 'error',
        duration: 3000,
      });
    }
  };

  const totalPages = Math.ceil(fetchedTotalEquipments / equipmentsPerPage);
  const handlePageChange = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setDirection(newDirection);

      if (isMobileOrTablet) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <MainPageLayout>
      <main className="main xl:before:bg-equipments">
        <div className="black-overlay opacity-60" role="banner" />
        <section className="wrapper py-20 min-w-[70%] flex gap-y-32 2xl:gap-0 mt-10 items-center justify-center">
          <section>
            <header className="text-center mb-10">
              <h1 id="equipment-page-title" className="header">
                Equipments
              </h1>
            </header>

            <section className="flex flex-col xl:flex-row gap-10 items-center" aria-labelledby="search-section">
              <h2 id="search-section" className="sr-only">
                Search Equipments
              </h2>
              <button
                aria-label="Remove all equipment from your inventory"
                onClick={handleRemoveAllEquipments}
                className="text px-1 rounded-md bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed hover:text-customRed transition-colors duration-200"
              >
                Remove All Equipments
              </button>
              <SearchBar
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                suggestions={
                  Array.isArray(equipmentSuggestions.equipments)
                    ? equipmentSuggestions.equipments.map((e: { name: never }) => e.name)
                    : []
                }
                onSuggestionClick={(suggestion) => {
                  setSearchTerm(suggestion);
                  setDebouncedSearchTerm(suggestion);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') triggerSearch();
                }}
                placeholder="Search for equipment..."
              />
              <CustomButton text="Search" onClick={triggerSearch} aria-label="Trigger equipment search" />
            </section>
            {debouncedSearchTerm && (
              <div className="mt-5 flex flex-col items-center">
                <p className="text">
                  Search results for: <span className="bold">{debouncedSearchTerm}</span>
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                    setCurrentPage(1);
                    setNoResults(false);
                  }}
                  className="text mt-2 px-1 rounded-md bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed hover:text-customRed transition-colors duration-200"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
          <section className="w-full h-full min-h-[60vh]">
            {noResults ? (
              <div className="flex justify-center items-center w-full h-[40vh]">
                <h2 className="text-center sub-header">No Equipments Found</h2>
              </div>
            ) : isMobileOrTablet ? (
              loading ? (
                <div className="flex justify-center items-center w-full h-[40vh]">
                  <LoadingHourglass />
                </div>
              ) : (
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10 p-10 w-full h-full min-h-[40vh] auto-rows-fr">
                  {equipments.map((equipment, index) => {
                    const isChecked = currentUserEquipments.some((userEquip) => userEquip.id === equipment.id);
                    const isDisabled = currentUserEquipments.length >= maxEquipments && !isChecked;

                    return (
                      <EquipmentCard
                        key={index}
                        equipment={equipment}
                        isChecked={isChecked}
                        onChange={handleEquipmentChange}
                        disabled={isDisabled}
                        onDisabledClick={() => {
                          showToast({
                            message: 'Cannot add any more items, inventory is full',
                            type: 'warning',
                            duration: 2000,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              )
            ) : (
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10 p-10 w-full h-full min-h-[40vh] auto-rows-fr"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {equipments.map((equipment, index) => {
                    const isChecked = currentUserEquipments.some((userEquip) => userEquip.id === equipment.id);
                    const isDisabled = currentUserEquipments.length >= maxEquipments && !isChecked;

                    return (
                      <EquipmentCard
                        key={index}
                        equipment={equipment}
                        isChecked={isChecked}
                        onChange={handleEquipmentChange}
                        disabled={isDisabled}
                        onDisabledClick={() => {
                          showToast({
                            message: 'Cannot add any more items, inventory is full',
                            type: 'warning',
                            duration: 2000,
                          });
                        }}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </section>

          <div className="min-h-[10vh]">
            {fetchedTotalEquipments > equipmentsPerPage && (
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
            )}
            <div />
          </div>
        </section>
      </main>
    </MainPageLayout>
  );
};
export default EquipmentPage;
