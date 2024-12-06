import React from 'react';
import { motion } from 'framer-motion';
import classImages from '../../utils/classImageMapping.ts';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox.tsx';
import ClassCardProps from '../../interfaces/ClassCardProps.ts';

/**
 * A card component showing information about a character class: name, hit die, skills, and an image.
 *
 * @param {string} id - Identification of the class
 * @param {string} name - The name of the class
 * @param {number} hit_die - The hit die for the class.
 * @param {number} index - Index of the class
 * @param {string[]} skills=[] - A list of skills for the class.
 * @param {string} selectedClassId - The ID of the currently selected class.
 * @param {function} onSelect - Function to select the class.
 *
 */

const ClassCard: React.FC<ClassCardProps> = ({ id, name, hit_die, index, skills = [], selectedClassId, onSelect }) => {
  const classImage = classImages[index];

  const handleSelectClass = () => {
    if (selectedClassId !== id) {
      onSelect(id);
    }
  };

  return (
    <motion.section
      className="flex flex-col xl:flex-row xl:h-60 w-full justify-between items-center p-8 xl:p-12 rounded-lg bg-black bg-opacity-90 gap-10 card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex flex-col xl:flex-row gap-5 justify-center items-center">
        <img src={classImage} alt={name} className="max-w-44 shadow-none" />
        <div>
          <h2 className="sub-header bold">{name}</h2>
          <p className="text">
            <span className="bold">HP:</span> {hit_die}
          </p>
          <p className="text">
            <span className="bold">Skills:</span> {skills.join(', ')}
          </p>
        </div>
      </div>
      <div className="w-1/5 flex items-center justify-center xl:justify-end">
        <CustomCheckbox scale={2} checked={selectedClassId === id} onChange={handleSelectClass} disableUncheck={true} />
      </div>
    </motion.section>
  );
};

export default ClassCard;
