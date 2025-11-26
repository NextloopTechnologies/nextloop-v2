import React, { useEffect, useRef, useState } from 'react'; // Added useRef and useEffect

interface OptionType {
  label: string;
  value: string; // or whatever type your value is
}

interface CustomDropdownProps {
  selected?: OptionType | null;
  onChange?: (option: OptionType) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null); // Define OptionType appropriately
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  useEffect(() => {
    if (selected !== selectedOption)
      setSelectedOption(selected ?? null);
  }, [selected, selectedOption]);

  // Effect to handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const options: OptionType[] = [
    { value: 'general', label: 'General Enquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'feedback', label: 'Feedback' },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 text-left text-black'
      >
        {selectedOption ? selectedOption.label : 'Please Select Subject'}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 9l6 6 6-6'
          />
        </svg>
      </button>
      {isOpen && (
        <ul className='absolute w-full mt-1 bg-[#1A1A1A] border border-gray-700 shadow-lg z-50'>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className='px-3 py-2 hover:bg-gray-700 cursor-pointer text-white'
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
