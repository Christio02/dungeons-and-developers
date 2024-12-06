import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiHelpCircle, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import abilityScoreGif from '../../assets/images/abilityscore.gif';
import classGif from '../../assets/images/class.gif';
import raceGif from '../../assets/images/race.gif';

/**
 * Renders a TutorialModal component and gives the user a
 * tutorial modal with information about the game's character customization.
 **/
const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Question Mark Button */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          color: 'white',
          backgroundColor: '#DB3232',
          '&:hover': {
            backgroundColor: 'black',
            color: '#DB3232',
          },
        }}
        aria-label="Help"
      >
        <FiHelpCircle size={35} />
      </IconButton>

      {/* Modal Dialog */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            paddingTop: 10,
            backgroundColor: 'black',
            color: 'white',
            position: 'relative',
          },
        }}
      >
        {/* "X" Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '1%',
            right: '1%',
            color: 'white',
            '&:hover': {
              color: '#DB3232',
            },
          }}
          aria-label="Close"
        >
          <FiX size={40} />
        </IconButton>

        {/* Scrollable Content */}
        <DialogContent className="w-full gap-20 flex flex-col">
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header bold">Race</h2>
            <p className="text">
              The race of your character determines only their appearance in the game. It allows you to customize how
              your character looks, but it doesn’t affect gameplay, abilities, or stats. Choose the race that best fits
              the visual style you want for your character. Use the left and right arrows to navigate between different
              races. To learn more about each race, click{' '}
              <Link to="/race" className="underline text-customRed">
                here
              </Link>
              .
            </p>
            <img src={raceGif} alt="Race tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Class</h2>
            <p className="text">
              The class defines your character’s role in the game, determining their skills and HP. Use the left and
              right arrows to navigate between different classes. Each class specializes in various aspects of gameplay,
              such as animal handling or survival. Some ability scores have recommended skills associated with them,
              providing guidance on which skills might complement those scores. However, you are free to increase any
              ability score as you see fit, regardless of the recommended skills. To learn more about each class’s HP
              and available skills, click{' '}
              <Link to="/class" className="underline text-customRed">
                here
              </Link>
              .
            </p>
            <img src={classGif} alt="Class tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Ability scores</h2>
            <p className="text">
              These scores define your character’s basic attributes, affecting everything from combat effectiveness to
              interactions with others in the game. Each ability score has recommended skills, which suggest how certain
              classes may better utilize that score. However, the recommended skills are only suggestions, and you are
              free to allocate points to any ability score regardless of the class you select. To learn more about
              ability scores and their recommended skills, click{' '}
              <Link to="/abilityscore" className="underline text-customRed">
                here
              </Link>
              .
            </p>
            <img src={abilityScoreGif} alt="Ability Score tutorial" />
          </section>
          <section className="w-full flex flex-col items-center gap-5">
            <h2 className="header">Equipments</h2>
            <p className="text">
              Here you can see all the equipment you have equipped. Each piece of equipment has a value, so strategize
              carefully when selecting your items. Decide with your fellow players how many coins you will have to spend
              on equipment—this can also be determined by the dungeon master. Your choice of equipment can significantly
              impact your character’s effectiveness in combat and exploration. You can equip up to 10 items. To remove
              an item, click the
              <span className="inline-block">
                <FaTrash className="shadow-none md:w-8 w-6 mx-1"></FaTrash>
              </span>
              next to it on this page or uncheck it on the equipment page. To view all available equipment, see what
              you’re currently using, and modify your selection, click{' '}
              <Link to="/equipment" className="underline text-customRed">
                here
              </Link>
              .
            </p>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorialModal;
