import { Link } from "../../router/RouterProvider";

const SiteFooter = () => {
  return (
    <footer className="bg-[#fff2a8] font-sans text-[#154527]">
      <div className="mx-auto max-w-[1440px] px-4 pb-9 pt-[91px] md:min-h-[603px] md:px-[50px] md:pt-[89px]">
        <div>
          <p className="text-[11px] font-light uppercase leading-[20px] tracking-[0] md:text-[14px] md:leading-[30px]">Be the first to know</p>
          <p className="mt-[14px] text-[12px] font-light leading-[17px] tracking-[0] md:mt-[4px] md:text-[14px] md:leading-[20px]">
            Join our newsletter and get access to exclusive events, promos and more.
          </p>
          <form className="mt-[30px] flex flex-col gap-3 md:mt-[42px] md:flex-row md:gap-6" onSubmit={(event) => event.preventDefault()}>
            <input
              className="h-[32px] w-full rounded-full border border-[#154527] bg-transparent px-[22px] text-[11px] font-light leading-[20px] tracking-[0] outline-none placeholder:text-[#154527]/70 md:h-[34px] md:w-[484px] md:text-[14px]"
              placeholder="e.g., email@example.com"
            />
            <button className="h-[32px] w-full rounded-full bg-[#154527] text-[11px] font-light uppercase leading-[20px] tracking-[0] text-[#fff2a8] transition hover:bg-[#154527] md:h-[34px] md:w-[153px] md:text-[13px]">
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-[103px] grid grid-cols-3 gap-x-6 gap-y-10 md:mt-[160px] md:grid-cols-[178px_178px_260px_1fr] md:gap-[49px]">
          <FooterColumn title="Find us" items={["Charlotte, NC", "Tyson's Corner, VA", "Milwaukee, WI"]} />
          <FooterColumn title="Say hi" items={["Contact us", "Work with us", "Investments"]} paths={["/profile", "/join-epic", "/investments"]} />
          <FooterColumn title="Get to know more" items={["FAQs", "Cancellation policy", "Terms & Conditions", "Privacy policy"]} />
          <div className="col-span-3 mt-8 flex flex-row items-start justify-start gap-[14px] text-[#154527] md:col-span-1 md:mt-0 md:flex-col md:items-end md:pt-[68px]">
            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="transition hover:opacity-70">
              <LinkedInIcon />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram" className="transition hover:opacity-70">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <p className="mt-[50px] text-[10px] font-light leading-[20px] tracking-[0] md:mt-[51px] md:text-[13px]">Copyright (c) 2025 EPIC Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

const LinkedInIcon = () => {
  return (
    <svg className="h-[21px] w-[21px]" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <path
        d="M2.40268 0.00404539C5.96138 -0.175555 5.96068 5.68795 1.95698 5.05435C-0.764324 4.62374 -0.676625 0.159545 2.40268 0.00404539ZM2.21908 1.49655C0.895675 1.74205 1.21268 3.97525 2.79228 3.65015C4.09428 3.38225 3.86598 1.19115 2.21908 1.49655Z"
        fill="currentColor"
      />
      <path
        d="M0.4145 0.0163002L4.6008 0L5.0666 0.4113L5.0867 11.7226C5.077 11.992 4.9076 12.2358 4.6722 12.361L0.5768 12.374C0.3305 12.3403 0.1324 12.1741 0.0412 11.9447L0 0.6546C0.0097 0.3852 0.1791 0.1415 0.4145 0.0163002ZM3.6826 1.403H1.4041V10.9742H3.6826V1.403Z"
        fill="currentColor"
        transform="translate(0 8)"
      />
      <path
        d="M5.5933 0.0261755C8.8796 -0.285524 12.1114 2.22368 12.3626 5.57288C12.5369 7.89738 12.2217 10.4335 12.3638 12.7813L12.0067 13.3015H7.7167C7.3913 13.0684 7.3095 12.817 7.2732 12.4287C7.0808 10.3707 7.4279 8.02218 7.2716 5.93248C6.9658 4.81188 5.2602 4.84998 5.0938 6.02328C4.8129 8.00348 5.3274 10.5938 5.0879 12.6031C5.0382 13.0196 4.8638 13.2983 4.4302 13.349C3.6669 13.4383 1.3145 13.4518 0.5681 13.352C0.3088 13.3173 0.2097 13.1877 0.0489001 12.9941L0 5.57308C0.316 2.67548 2.6964 0.300876 5.5933 0.0261755ZM10.957 11.9425V5.48848C10.957 3.36168 8.186 1.39918 6.181 1.39798C4.0592 1.39668 1.405 3.42638 1.405 5.66408V11.9425H3.6835V5.66408C3.6835 5.61548 3.9397 5.02228 3.9959 4.92338C5.2434 2.72578 8.7662 3.78288 8.7662 6.01538V11.9425H10.957Z"
        fill="currentColor"
        transform="translate(8 7)"
      />
    </svg>
  );
};

const InstagramIcon = () => {
  return (
    <svg className="h-[25px] w-[25px]" viewBox="0 0 25 25" fill="none" aria-hidden="true">
      <rect x="3.75" y="3.75" width="17.5" height="17.5" rx="5.25" stroke="#154527" strokeWidth="1.8" />
      <circle cx="12.5" cy="12.5" r="4" stroke="#154527" strokeWidth="1.8" />
      <circle cx="17.2" cy="7.75" r="1.15" fill="#154527" />
    </svg>
  );
};

const FooterColumn = ({ title, items, paths = [] }) => {
  return (
    <div className="font-sans">
      <h3 className="text-[10px] font-light uppercase leading-[20px] tracking-[0] md:text-[14px] md:leading-[30px]">{title}</h3>
      <ul className="mt-[28px] space-y-0 text-[9px] font-light leading-[13px] tracking-[0] md:mt-[30px] md:text-[14px] md:leading-[20px]">
        {items.map((item, index) => (
          <li key={item}>
            {paths[index] ? (
              <Link to={paths[index]} className="transition hover:opacity-70">
                {item}
              </Link>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteFooter;
