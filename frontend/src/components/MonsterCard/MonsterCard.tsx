import React, { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import NoMonsterImageFound from '../../assets/images/no_monster_image_found.jpg';
import { useDungeonContext } from '../../context/DungeonContext.ts';
import { MonsterCardProps } from '../../interfaces/MonsterCardProps.ts';
import DungeonButton from './DungeonButton.tsx';
import MonsterDetailsModal from './MonsterDetailsModal.tsx';
import MonsterReviewModal from './MonsterReviewModal.tsx';

/**
 * A card component that displays monster details
 *
 * @param {string} id - Identification of the monster
 * @param {string} name - Name of the monster.
 * @param {string} type - Type of Monster
 * @param {number} hit_points - The health points of the monster.
 * @param {string} alignment - The alignment of the monster
 * @param {string} size - The size of the monster
 * @param {string | undefined} image - The base64-encoded image or URL of the monster.
 *
 */
const MonsterCard = ({ id, name, type, hit_points, alignment, size, image }: MonsterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toggleDungeon, isInDungeon } = useDungeonContext();

  useEffect(() => {
    if (id && !image) {
      setImageLoaded(true);
    }
  }, [image, id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const monsterImageURL = image
    ? image.startsWith('data:image')
      ? image
      : `data:image/avif;base64,${image}`
    : NoMonsterImageFound;

  const handleToggleDungeon = () => {
    toggleDungeon({ id, name, type, hit_points, alignment, size, image });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article
        role="listitem"
        onClick={handleCardClick}
        aria-labelledby={`${id}-monster-title`}
        className="flex flex-col items-center justify-between bg-black pb-5 w-[75vw] md:w-[42vw] xl:w-[22vw] 2xl:w-[18vw] h-[40vh] sm:h-[45vh] md:h-[35vh] rounded-lg overflow-hidden
           transition-transform duration-300 ease-in-out transform focus:hover:shadow-lg focus:shadow-black focus:scale-105 hover:scale-105 hover:shadow-lg hover:shadow-black cursor-pointer card monster-card"
        aria-label={name}
        data-testid={`${name}-monster-card`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <figure className="relative w-full h-[30vh] overflow-hidden monster-image">
          {!imageLoaded && (
            <Blurhash
              hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
          {imageError ? (
            <img
              src={NoMonsterImageFound}
              alt="No monster image found"
              className="max-w-[15vw] rounded-[15px] shadow-[0_2px_2px_0_rgba(0,0,0,1) top-0 pt-0 mt-0]"
            />
          ) : (
            <div className="relative flex justify-center w-full h-full">
              <img
                src={monsterImageURL}
                alt={image ? `Image of ${name} ` : 'No monster image found'}
                className="object-cover h-full w-full object-top"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
              <div className="absolute left-[75%] top-5" role="button">
                <DungeonButton
                  data-testid={`${name}-dungeon-button`}
                  onAddToDungeonClick={handleToggleDungeon}
                  isInDungeon={isInDungeon(id)}
                  aria-label={isInDungeon(id) ? 'Remove from dungeon' : 'Add to dungeon'}
                />
              </div>
            </div>
          )}
          {!imageLoaded && <div className="flex justify-center w-full py-24">Loading image...</div>}
          <figcaption className="sr-only">{name}</figcaption>
        </figure>
        <div className="flex flex-col gap-1 w-full p-3">
          <header>
            <h2 className="text-xl md:text-lg lg:text-base xl:text-base 2xl:text-lg bold">{name}</h2>
            <p className="text-lg md:text-base lg:text-sm xl:text-sm 2xl:text-base">Type: {type}</p>
            <p className="text-lg md:text-base lg:text-sm xl:text-sm 2xl:text-base">HP: {hit_points}</p>
          </header>

          <div className="flex w-full justify-between">
            {/* stopPropagation to prevent showing the details modal when the review button is clicked */}
            <div onClick={(e) => e.stopPropagation()}>
              <MonsterReviewModal monsterId={id} name={name} image={monsterImageURL} />
            </div>
            <button
              aria-pressed={isInDungeon(id)}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleDungeon();
              }}
              className="xs:text-base sm:text-sm hover:text-customRed transition-all duration-200 monster-text-button"
            >
              {isInDungeon(id) ? 'Remove from dungeon' : 'Add to dungeon'}
            </button>
          </div>
        </div>
      </article>
      {/* Monster Details Modal */}
      {isModalOpen && (
        <MonsterDetailsModal
          id={id}
          name={name}
          hit_points={hit_points}
          type={type}
          image={monsterImageURL}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MonsterCard;
