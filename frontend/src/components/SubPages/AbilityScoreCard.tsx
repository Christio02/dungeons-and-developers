import { motion } from 'framer-motion';
import AbilityScoreCardProps from '../../interfaces/AbilityScoreProps.ts';
import Counter from '../Counter/Counter.tsx';

/**
 * A card component displaying the ability score with a value and it's corresponding skills.
 *
 * @param {string} name - The name of the ability.
 * @param {string[]} skills - A list recommended skills corresponding for this ability.
 * @param {number} score - The current ability score.
 * @param {function} onChange - Function to update the ability score.
 *
 */

const AbilityScoreCard: React.FC<AbilityScoreCardProps & { score: number; onChange: (value: number) => void }> = ({
  name,
  skills = [],
  score,
  onChange,
}) => {
  return (
    <motion.article
      className="flex flex-col xl:flex-row xl:h-[400px] 2xl:h-[350px] w-full justify-between items-center p-8 xl:p-12 rounded-lg bg-black bg-opacity-90 gap-16 card z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'circInOut' }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      role="region"
      aria-labelledby={`${name}-title`}
      aria-describedby={`${name}-description`}
    >
      <div className="flex items-center gap-16 xl:flex-row flex-col">
        <header id={`${name}-title`}>
          <h3 className="sub-header">{name}</h3>
        </header>
        <Counter
          value={score}
          onChange={(newValue) => console.log('Local update:', newValue)}
          scale={1.5}
          onValueFinalized={(finalValue) => onChange(finalValue)}
        />
      </div>

      <section className="w-full justify-start xl:w-auto xl:justify-center xl:min-w-[15vw] 2xl:min-w-[10vw] text-center xl:text-left">
        <h3 className="bold text">Skills recommended:</h3>
        <ul>
          {skills.map((skill, skillIndex) => (
            <li key={skillIndex} className="text">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </motion.article>
  );
};

export default AbilityScoreCard;
