import { motion } from 'framer-motion';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.tsx';
import raceImageMapping from '../../utils/raceImageMapping.ts';
import RaceCardProps from '../../interfaces/RaceCardProps.ts';

/**
 * Renders a RaceCard component showing information about name, alignment, size, speed, and an image of the race.
 *
 * @param {string} id - The id of the race
 * @param {number} index - The index of the race
 * @param {string} name - The name of the race.
 * @param {string} alignment - The alignment of the race.
 * @param {string} size - The size of the race.
 * @param {string} speed - The speed of the race.
 * @param {string} selectedRaceId - The ID of the selected race.
 * @param {function} onSelect - Function to handle selection of race.
 */

const RaceCard = ({ id, index, name, alignment, size, speed, selectedRaceId, onSelect }: RaceCardProps) => {
  const raceImage = raceImageMapping[index];
  const handleSelectRace = () => {
    if (selectedRaceId !== id) {
      onSelect(id);
    }
  };

  return (
    <motion.article
      className="flex flex-col xl:flex-row xl:h-90 w-full justify-between items-center p-8 xl:p-12 rounded-lg bg-black bg-opacity-90 gap-10 card z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      role="article"
      aria-labelledby={`${id}-name`}
      aria-describedby={`${id}-details`}
    >
      <div className="flex flex-col xl:flex-row gap-5 justify-center items-center ">
        <figure className="min-w-36 xl:min-w-28">
          <img src={raceImage} alt={`${name} race illustration`} className="w-36 xl:w-28 h-auto shadow-none" />
          <figcaption className="sr-only">{name}</figcaption>
        </figure>
        <div role="group">
          <h2 id={`${id}-name`} className="sub-header bold">
            {name}
          </h2>
          <p id={`${id}-details`} className="text">
            {alignment}
          </p>
          <p className="text">
            <span className="bold">Size:</span> {size}
          </p>
          <p className="text">
            <span className="bold">Speed:</span> {speed}
          </p>
        </div>
      </div>
      <div className="w-1/5 flex items-center justify-center xl:justify-end">
        <CustomCheckbox
          scale={2}
          checked={selectedRaceId === id}
          onChange={handleSelectRace}
          disableUncheck={true}
          aria-label={`Select ${name} race`}
        />
      </div>
    </motion.article>
  );
};

export default RaceCard;
