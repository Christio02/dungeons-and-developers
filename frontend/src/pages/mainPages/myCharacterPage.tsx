// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import MainPageLayout from '../../components/Layouts/MainPageLayout.tsx';
// import raceImageMapping from '../../utils/raceImageMapping.ts';
// import classImageMapping from '../../utils/classImageMapping.ts';
// import useRaces from '../../hooks/useRaces.ts';
// import useClasses from '../../hooks/useClasses.ts';
// import useAbilityScores from '../../hooks/useAbilityScores.ts';
// import Counter from '../../components/Counter/Counter.tsx';
import TutorialModal from '../../components/MyCharacter/TutorialModal.tsx';
import useUserEquipments from '../../hooks/useUserEquipments.ts';

const MyCharacterPage = () => {
  const { userEquipments, loading } = useUserEquipments();
  // const raceNames = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling'];
  // const classNames = [
  //   'barbarian',
  //   'bard',
  //   'cleric',
  //   'druid',
  //   'fighter',
  //   'monk',
  //   'paladin',
  //   'ranger',
  //   'rogue',
  //   'sorcerer',
  //   'warlock',
  //   'wizard',
  // ];

  // const raceData = raceNames.map(useRaces);
  // const classData = classNames.map(useClasses);

  // const [raceIndex, setRaceIndex] = useState(0);
  // const [classIndex, setClassIndex] = useState(0);

  // const [raceImageLoaded, setRaceImageLoaded] = useState(false);
  // const [classImageLoaded, setClassImageLoaded] = useState(false);

  // const handleNextRace = () => setRaceIndex((prevIndex) => (prevIndex + 1) % raceData.length);
  // const handlePrevRace = () => setRaceIndex((prevIndex) => (prevIndex - 1 + raceData.length) % raceData.length);
  //
  // const handleNextClass = () => setClassIndex((prevIndex) => (prevIndex + 1) % classData.length);
  // const handlePrevClass = () => setClassIndex((prevIndex) => (prevIndex - 1 + classData.length) % classData.length);

  // const currentRace = raceData[raceIndex];
  // const currentClass = classData[classIndex];

  // const currentRaceImage = currentRace ? raceImageMapping[currentRace.index] : '';
  // const currentClassImage = currentClass ? classImageMapping[currentClass.index] : '';

  // Ability Score Logic
  // const abilities = ['cha', 'con', 'dex', 'int', 'str', 'wis'];
  // const abilityData = abilities.map(useAbilityScores);
  // const [abilityValue, setAbilityValue] = useState([0, 0, 0, 0, 0, 0]);

  // const handleAbilityChange = (index: number, newValue: number) => {
  //   const updatedAbilities = [...abilityValue];
  //   updatedAbilities[index] = newValue;
  //   setAbilityValue(updatedAbilities);
  // };

  return (
    <MainPageLayout>
      <main className="main before:bg-myCharacter">
        <div className="black-overlay" />
        <div className="wrapper w-full py-[15vh] gap-32">
          <h1 className="header">My Character</h1>
          <TutorialModal />
          {/* Race section */}
          <section className="w-full flex flex-col lg:flex-row justify-between">
            <article className="w-full xl:w-1/2 flex flex-col items-center">
              <h2 className="header">Race:</h2>
              <div className="flex items-center">
                {/*<button className="arrow-button" onClick={handlePrevRace}>*/}
                {/*  /!* <FaChevronLeft /> *!/*/}
                {/*</button>*/}
                {/*{currentRace && (*/}
                {/*  <article className="flex flex-col justify-center items-center gap-4 min-w-52">*/}
                {/*    /!*<h3 className="sub-header">{currentRace.name}</h3>*!/*/}
                {/*    <div className="flex justify-center items-center w-[70vw] h-[30vh] lg:w-[20vw] lg:h-[25vh] overflow-hidden">*/}
                {/*      {!raceImageLoaded && <div className="flex justify-center w-full">Loading image...</div>}*/}
                {/*      /!* <img*/}
                {/*        src={currentRaceImage}*/}
                {/*        alt={currentRace.name}*/}
                {/*        className="w-full h-full object-contain shadow-none"*/}
                {/*        onLoad={() => setRaceImageLoaded(true)}*/}
                {/*        style={{ display: raceImageLoaded ? 'block' : 'none' }}*/}
                {/*      /> *!/*/}
                {/*    </div>*/}
                {/*  </article>*/}
                {/*)}*/}
                {/*<button className="arrow-button" onClick={handleNextRace}>*/}
                {/*  /!* <FaChevronRight /> *!/*/}
                {/*</button>*/}
              </div>
            </article>

            {/* Class section */}
            <article className="w-full xl:w-1/2 flex flex-col items-center mt-[10vh] lg:mt-0">
              <h2 className="header">Class:</h2>
              <div className="flex items-center gap-4">
                {/*<button className="arrow-button" onClick={handlePrevClass}>*/}
                {/*  /!* <FaChevronLeft /> *!/*/}
                {/*</button>*/}
                {/*{currentClass && (*/}
                {/*  <article className="flex flex-col items-center gap-4">*/}
                {/*    /!*<h3 className="sub-header">{currentClass.name}</h3>*!/*/}
                {/*    <div className="flex justify-center items-center w-[65vw] h-[25vh] lg:w-[25vw] lg:h-[25vh] overflow-hidden">*/}
                {/*      {!classImageLoaded && <div className="flex justify-center w-full py-24">Loading image...</div>}*/}
                {/*      /!* <img*/}
                {/*        src={currentClassImage}*/}
                {/*        alt={currentClass.name}*/}
                {/*        className="w-full h-full object-contain shadow-none"*/}
                {/*        onLoad={() => setClassImageLoaded(true)}*/}
                {/*        style={{ display: classImageLoaded ? 'block' : 'none' }}*/}
                {/*      /> *!/*/}
                {/*    </div>*/}
                {/*  </article>*/}
                {/*)}*/}
                {/*<button className="arrow-button" onClick={handleNextClass}>*/}
                {/*  /!* <FaChevronRight /> *!/*/}
                {/*</button>*/}
              </div>
            </article>
          </section>

          {/* Ability scores section */}
          <article className="flex flex-col items-center w-full">
            <h2 className="header mb-[8vh]">Ability Scores:</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[12vh] gap-x-[25vw]">
              {/* {abilityData.map((ability, index) => (
                <div key={index} className="flex items-center">
                  <label className="sub-header w-32 mr-[85px]">{ability.full_name}:</label>
                  <Counter
                    scale={1.5}
                    value={abilityValue[index]}
                    onChange={(newValue) => handleAbilityChange(index, newValue)}
                  />
                </div>
              ))} */}
            </div>
          </article>

          {/* Equipment section */}
          <article className="flex flex-col items-center w-full mt-10">
            <h2 className="header mb-[5vh]">Equipments:</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[5vh] gap-x-[40vw] xl:gap-y-[10vh]">
              {loading && <div>Loading equipments...</div>}
              {userEquipments.length < 1 && <p>No equipments added yet...</p>}
              <ul>
                {userEquipments.map((equipment, index) => (
                  <li key={index} className="list-disc list-inside sub-header">
                    {equipment.name}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </main>
    </MainPageLayout>
  );
};

export default MyCharacterPage;
