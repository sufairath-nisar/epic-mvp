import { ASSET_PATH } from "../../constants/assets";
import { mainNavigation } from "../../data/routes";
import F31Header from "../f31/F31Header";

// Full-screen blurred backdrop + shared site header that centers a modal card.
// Shared by the Join Epic ("create an account"), Verify OTP and Membership pages.
const OverlayShell = ({ children }) => (
  <main className="relative min-h-screen overflow-hidden bg-[#c7beb0] font-sans text-[#154527]">
    <img
      src={`${ASSET_PATH}home-hero-player.png`}
      alt=""
      className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-center blur-[22px]"
    />
    <div className="absolute inset-0 bg-[#d3cabd]/60" />
    <F31Header navigation={mainNavigation} />

    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-start justify-center px-0 pt-[71px] md:overflow-x-auto md:px-4 md:pb-[48px] md:pt-[151px]">
      {children}
    </section>
  </main>
);

export default OverlayShell;
