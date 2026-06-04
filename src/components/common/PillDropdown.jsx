import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Shared dropdown with two looks:
//  - variant="pill" (default): green outlined pill — booking section.
//  - variant="box": white rounded box — Join Epic membership location selector.
const PillDropdown = ({ label, options, value, onChange, highlightSelected = true, variant = "pill" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isBox = variant === "box";

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const triggerClass = isBox
    ? "flex h-[44px] w-full items-center justify-between rounded-[10px] border border-transparent bg-white px-[18px] text-[12px] font-light leading-none tracking-[0] text-[#9a9a9a] outline-none transition"
    : `flex h-7 w-full items-center justify-between rounded-full border border-[#154527] bg-transparent px-4 text-[10px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition ${isOpen ? "bg-[#fff2a8]" : ""}`;

  const menuClass = isBox
    ? "absolute left-0 right-0 top-[50px] z-20 overflow-hidden rounded-[10px] border border-[#154527] bg-[#FFFCF2] py-1 shadow-sm"
    : "absolute left-0 right-0 top-[34px] z-20 overflow-hidden rounded-[10px] border border-[#154527] bg-[#FFFCF2] py-1 shadow-sm";

  const optionClass = (option) =>
    isBox
      ? `flex h-[40px] w-full items-center px-[18px] text-left text-[12px] font-light leading-none tracking-[0] text-[#154527] transition hover:bg-[#fff2a8] ${highlightSelected && value === option ? "bg-[#fff2a8]" : ""}`
      : `block h-7 w-full px-4 text-left text-[10px] font-normal uppercase leading-none tracking-[0] text-[#154527] transition hover:bg-[#fff2a8] ${highlightSelected && value === option ? "bg-[#fff2a8]" : ""}`;

  return (
    <div className="relative font-sans">
      <button type="button" aria-expanded={isOpen} className={triggerClass} onClick={() => setIsOpen((current) => !current)}>
        <span>{value ?? label}</span>
        <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""} ${isBox ? "text-[#154527]" : ""}`} size={isBox ? 16 : 13} strokeWidth={1.8} />
      </button>

      {isOpen && (
        <div className={menuClass}>
          {options.map((option) => (
            <button key={option} type="button" className={optionClass(option)} onClick={() => handleSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PillDropdown;
