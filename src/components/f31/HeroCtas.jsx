import { useState } from "react";
import { Link } from "../../router/RouterProvider";

const AppStoreIcon = () => {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 2.2c.1 1.1-.3 2.2-1 3-.8.9-1.9 1.5-3 1.4-.1-1.1.4-2.2 1.1-3 .8-.9 2-1.5 2.9-1.4Z" />
      <path d="M20.2 17.3c-.4.9-.7 1.3-1.2 2.1-.8 1.2-1.9 2.8-3.3 2.8-1.2 0-1.6-.8-3.3-.8-1.7 0-2.1.8-3.3.8-1.4 0-2.5-1.4-3.3-2.7-2.3-3.5-2.5-7.6-1.1-9.8 1-1.5 2.5-2.4 3.9-2.4 1.5 0 2.4.8 3.6.8 1.2 0 2-.8 3.7-.8 1.3 0 2.7.7 3.7 2-3.2 1.8-2.7 6.3.1 8Z" />
    </svg>
  );
};

const PlayStoreIcon = () => {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.3 2.6c-.2.3-.3.7-.3 1.2v16.4c0 .5.1.9.3 1.2l9-9.4-9-9.4Z" />
      <path d="m14.4 10.9 2.7-2.8L6.5 2.2c-.4-.2-.8-.3-1.1-.2l9 8.9Z" />
      <path d="m14.4 13.1-9 8.9c.3.1.7 0 1.1-.2l10.6-5.9-2.7-2.8Z" />
      <path d="m18.3 8.8-2.9 3.2 2.9 3.2 1.9-1.1c1.1-.6 1.1-1.6 0-2.2l-1.9-1.1Z" />
    </svg>
  );
};

export const DownloadAppCta = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative h-[22px] w-[116px] md:h-[34px] md:w-[178px]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex h-[22px] w-full items-center justify-center rounded-full border text-[8px] font-normal uppercase leading-none tracking-[0] transition hover:border-[#154527] hover:bg-[#154527] hover:text-[#fff2a8] md:h-[34px] md:text-[15px] ${isOpen ? "border-[#154527] bg-[#154527] text-[#fff2a8]" : "border-[#fff2a8] bg-transparent text-[#fff2a8]"}`}
      >
        Download the App
      </button>
      <div className={`absolute left-0 top-[34px] z-20 ${isOpen ? "grid" : "hidden"} w-full grid-cols-2 gap-[6px] group-hover:grid md:top-[54px]`}>
        <a
          href="https://www.apple.com/app-store/"
          className="flex h-[20px] items-center justify-center rounded-full bg-[#154527] text-[#fff2a8] transition hover:bg-[#154527] md:h-[26px]"
          aria-label="Download on the App Store"
        >
          <AppStoreIcon />
        </a>
        <a
          href="https://play.google.com/store"
          className="flex h-[20px] items-center justify-center rounded-full bg-[#154527] text-[#fff2a8] transition hover:bg-[#154527] md:h-[26px]"
          aria-label="Get it on Google Play"
        >
          <PlayStoreIcon />
        </a>
      </div>
    </div>
  );
};

export const BookCourtCta = () => {
  return (
    <Link
      to="/booking/court"
      className="flex h-[22px] w-[91px] items-center justify-center rounded-full bg-[#fff2a8] text-[8px] font-normal uppercase leading-none tracking-[0] text-epic-green transition hover:bg-[#154527] hover:text-[#fff2a8] md:h-[34px] md:w-[153px] md:text-[15px]"
    >
      Book a Court
    </Link>
  );
};
