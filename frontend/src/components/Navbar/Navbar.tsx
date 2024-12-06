import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccessibilityContext } from '../../context/AccessibilityContext.ts';
import logo from '../../assets/images/logo.svg';
import Accessibility from '../AccessibilityToggle/AccessibilityToggle.tsx';
import CustomButton from '../CustomButton/CustomButton.tsx';

/**
 * Navbar component renders a component with links, dropdown menus, and accessibility options.
 *
 *
 * What it includes and functionality:
 * - Menus for Monster, Dungeon, My Character(Dropdown menu)
 * - Drop down menu with Races, Classes, Ability Scores and Equipment
 * - Accessibility toggle
 * - Log out functionality that clears the token. Sending you to the login page.
 */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const { isAccessibilityMode } = useAccessibilityContext();

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent scrolling when slide-in menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isHamburgerMenu = window.innerWidth < 1024;
      if (isHamburgerMenu) {
        setShowNavbar(true);
        return;
      }
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
        return;
      }

      const scrollThreshold = 10;

      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header>
      <nav
        className={`${
          showNavbar ? 'top-0' : '-top-20'
        } fixed w-full bg-customRed text-white p-2 z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="flex xl:justify-center justify-between items-center xl:w-full">
          <Link to={'/home'} aria-label="Go to home">
            <img src={logo} alt="Dungeons & Developers logo" className="w-12 ml-6 xl:hidden shadow-none z-60" />
          </Link>

          {/* Hamburger Icon */}
          <div className="flex items-center mr-6 xl:hidden">
            <button
              onClick={toggleMenu}
              className="text-[2rem]"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Menu for large screens */}
          <div className="hidden xl:flex justify-between items-center w-11/12">
            <Link to={'/home'}>
              <img src={logo} alt="Dungeons & Developers logo" className="w-12 xl:block hidden shadow-none" />
            </Link>

            <Accessibility checked={isAccessibilityMode} />

            <section className="flex justify-between 4xl:w-3/5 w-[65%] ">
              <CustomButton
                text={'Monsters'}
                linkTo={'/monsters'}
                isActive={location.pathname === '/monsters'}
                className="sub-header"
              />
              <CustomButton text={'Dungeon'} linkTo={'/dungeon'} isActive={location.pathname === '/dungeon'} />

              <div
                className="relative"
                onMouseEnter={() => setIsDropdownHovered(true)}
                onMouseLeave={() => setIsDropdownHovered(false)}
                onFocus={() => setIsDropdownHovered(true)}
                onBlur={() => setIsDropdownHovered(false)}
              >
                <CustomButton
                  text={'My character'}
                  linkTo={'/mycharacter'}
                  className={`flex items-center space-x-3 sub-header`}
                  isActive={location.pathname.startsWith('/mycharacter')}
                >
                  <FaChevronDown
                    className={`transition-transform duration-300 ${isDropdownHovered ? 'rotate-180' : ''}`}
                  />
                </CustomButton>

                {/* Dropdown menu */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 min-w-60 w-[18vw] bg-customRed rounded overflow-hidden duration-300 ease-in-out max-h-0 ${
                    isDropdownHovered ? 'max-h-96 opacity-100' : 'opacity-0'
                  }`}
                >
                  <ul className="flex flex-col gap-10 p-10">
                    <li className="w-fit">
                      <CustomButton text={'Races'} linkTo={'/race'} isActive={location.pathname === '/race'} />
                    </li>
                    <li className="w-fit">
                      <CustomButton text={'Classes'} linkTo={'/class'} isActive={location.pathname === '/class'} />
                    </li>
                    <li className="w-fit text-nowrap">
                      <CustomButton
                        text={'Ability Scores'}
                        linkTo={'/abilityscore'}
                        isActive={location.pathname === '/abilityscore'}
                      />
                    </li>
                    <li className="w-fit">
                      <CustomButton
                        text={'Equipments'}
                        linkTo={'/equipment'}
                        isActive={location.pathname === '/equipment'}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <CustomButton text={'Log out'} onClick={handleLogout}>
                <IoIosLogOut className="ml-2 mt-0.5" />
              </CustomButton>
            </section>
          </div>
        </div>
      </nav>

      {/* Slide-in Menu for small screens */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-customRed text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:hidden pl-4 pt-10 z-50`}
      >
        {/* Close button for the slide-in menu */}
        <button onClick={toggleMenu} className="absolute top-4 right-10 text-[2rem]" aria-label="Close menu">
          <FiX />
        </button>

        <ul className="mt-16 space-y-10">
          <li>
            <CustomButton
              text={'Monsters'}
              linkTo={'/monsters'}
              className="sub-header"
              noUnderline={true}
              isActive={location.pathname === '/monsters'}
            />
          </li>
          <li>
            <CustomButton
              text={'Dungeon'}
              linkTo={'/dungeon'}
              className="sub-header"
              noUnderline={true}
              isActive={location.pathname === '/dungeon'}
            />
          </li>

          <li>
            <div className="space-y-2">
              <div className="flex">
                <CustomButton
                  text={'My character'}
                  linkTo={'/mycharacter'}
                  className="sub-header"
                  noUnderline={true}
                  isActive={location.pathname.startsWith('/mycharacter')}
                  onFocus={() => setIsMobileDropdownOpen(true)}
                  onBlur={() => setIsMobileDropdownOpen(false)}
                />
                <FaChevronDown
                  onClick={toggleMobileDropdown}
                  className={`transition-transform duration-300 ml-11 size-6 ${isMobileDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isMobileDropdownOpen ? 'max-h-[80vw] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2 pl-4">
                  <li>
                    <CustomButton
                      text={'Race'}
                      linkTo={'/race'}
                      className="px-4 py-2 sub-header"
                      noUnderline={true}
                      isActive={location.pathname === '/race'}
                      onFocus={() => setIsMobileDropdownOpen(true)}
                    />
                  </li>
                  <li>
                    <CustomButton
                      text={'Class'}
                      linkTo={'/class'}
                      className="px-4 py-2 sub-header"
                      noUnderline={true}
                      isActive={location.pathname === '/class'}
                      onFocus={() => setIsMobileDropdownOpen(true)}
                    />
                  </li>
                  <li>
                    <CustomButton
                      text={'Ability Scores'}
                      linkTo={'/abilityscore'}
                      className="px-4 py-2 sub-header"
                      noUnderline={true}
                      isActive={location.pathname === '/abilityscore'}
                      onFocus={() => setIsMobileDropdownOpen(true)}
                    />
                  </li>
                  <li>
                    <CustomButton
                      text={'Equipments'}
                      linkTo={'/equipment'}
                      className="px-4 py-2 sub-header"
                      noUnderline={true}
                      isActive={location.pathname === '/equipment'}
                      onFocus={() => setIsMobileDropdownOpen(true)}
                      onBlur={() => setIsMobileDropdownOpen(false)}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </li>

          {/* Log out button */}
          <li>
            <CustomButton
              text={'Log out'}
              linkTo={'/'}
              className="sub-header flex items-center"
              noUnderline={true}
              isActive={location.pathname === ''}
            >
              <IoIosLogOut className="ml-2" />
            </CustomButton>
          </li>

          {/* Accessibility toggle */}
          <li>
            <Accessibility checked={isAccessibilityMode} />
          </li>
        </ul>
      </div>

      {/* Blur effect on background when slide-in menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
