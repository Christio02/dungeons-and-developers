import React, { useEffect, useRef, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

type InputProps = {
  placeholder: string;
  inputName: string;
  value: string;
  onSave: (newValue: string) => void;
};
/**
 * CustomInput component allows editing and saving a text value in place with a toggle between view and edit modes.
 * It displays a value, and when clicked, switches to an input field for editing.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.placeholder - Placeholder text shown when the input field is empty.
 * @param {string} props.inputName - The label/name for the input field (used for accessibility and alerts).
 * @param {string} props.value - The initial value to display.
 * @param {Function} props.onSave - Callback function triggered when the input value is saved.
 *                                   It receives the new value as an argument.
 *
 * @example
 * // Usage example:
 * <CustomInput
 *   placeholder="Enter your name"
 *   inputName="Name"
 *   value="John Doe"
 *   onSave={(newValue) => console.log(newValue)}
 * />
 */

const CustomInput = ({ placeholder, inputName, value, onSave }: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  /**
   * Handles logic when entering editMode
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * When user clicks saveIcon while in editing-mode, this verifies that value is not empty or equal to placeholder
   * If true, then alerts user, if not then triggers onSave callback function
   */

  const handleSaveClick = () => {
    const currentValue = inputValue.trim();

    if (currentValue === '' || currentValue === placeholder) {
      alert(`${inputName} cannot be empty!`);
      setInputValue(placeholder);
    } else {
      onSave(currentValue);
    }
    setIsEditing(false);
  };

  /**
   * Saves value when input loses focus, i.e. user clicks outside input field (onBlur event)
   */
  const handleBlur = () => {
    handleSaveClick();
  };

  /**
   * Handles the change event when user are writing inside input, limits value to 20 characters
   * @param{React.ChangeEvent<HTMLInputElement>} e - The change event
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;

    if (newName.length > 20) {
      newName = newName.substring(0, 20);
    }
    setInputValue(newName);
  };

  return (
    <>
      <section className="flex flex-row items-center justify-center gap-4 ">
        {isEditing ? (
          <>
            <label htmlFor={inputName} className="sr-only">
              {inputName}
            </label>
            <input
              ref={inputRef}
              id={inputName}
              type="text"
              value={inputValue}
              aria-label="Edit name"
              data-testid="dungeon-input"
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              className="border-none rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent w-[65vw] lg:w-fit lg:p-y-5 text-6xl md:text-5xl lg:text-4xl xl:text-3xl 2xl:text-2xl text-center"
            />
          </>
        ) : (
          <h2
            className=" text-6xl md:text-5xl lg:text-4xl xl:text-3xl 2xl:text-2xl"
            aria-label="Name of your dungeon"
            data-testid="dungeon-name"
          >
            {inputValue}
          </h2>
        )}

        <button
          className=" p-[2px] lg:p-[5px] rounded-lg bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed transition-colors duration-100 group"
          aria-label={isEditing ? `Save ${inputName}` : `Edit ${inputName}`}
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? (
            <SaveIcon className="text-white group-hover:text-customRed duration-100 lg:!w-6 lg:!h-6 xl:!w-8 xl:!h-8" />
          ) : (
            <ModeEditOutlineIcon className="text-white group-hover:text-customRed duration-100 lg:!w-6 lg:!h-6 xl:!w-8 xl:!h-8" />
          )}
        </button>
      </section>
    </>
  );
};

export default CustomInput;
