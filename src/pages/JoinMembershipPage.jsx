import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import OverlayShell from "../components/layout/OverlayShell";
import PillDropdown from "../components/common/PillDropdown";
import { ASSET_PATH } from "../constants/assets";
import { Link, useRouter } from "../router/RouterProvider";
import { getJoinDetails } from "../utils/joinFlow";
import { saveSelectedMembership } from "../utils/membershipFlow";
import { useMembershipPackages } from "../hooks/useMembershipPackages";

const locations = ["Charlotte, NC", "Tyson's Corner, VA", "Milwaukee, WI"];

const PlanOption = ({ plan, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(plan.id)}
    className={`flex h-[56px] w-full items-center rounded-[8px] border-[1px] bg-white px-[16px] text-left transition md:h-[49px] ${
      selected ? "border-[#FCEFA7]" : "border-transparent hover:border-[#e4e4e4]"
    }`}
  >
    <span className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#FCEFA7] bg-[#FCEFA7]" : "border-[#cfcfcf] bg-white"}`}>
      {selected ? <span className="h-[6px] w-[6px] rounded-full bg-white" /> : null}
    </span>
    <span className="ml-[14px]">
      <span className="block text-[13px] font-normal leading-none tracking-[0] text-[#154527]">{plan.title}</span>
      <span className="mt-[5px] block text-[9px] font-light leading-none tracking-[0] text-[#9a9a9a]">more details</span>
    </span>
    <span className="ml-auto text-right">
      <span className="block text-[13px] font-normal leading-none tracking-[0] text-[#154527]">{plan.price}</span>
      <span className="mt-[5px] block text-[9px] font-light leading-none tracking-[0] text-[#9a9a9a]">per month</span>
    </span>
  </button>
);

const SuccessModal = () => (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#154527]/30 px-4">
    <div className="w-[340px] rounded-[24px] bg-white px-[40px] py-[44px] text-center shadow-soft">
      <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#154527] text-[#FCEFA7]">
        <Check size={28} strokeWidth={2.4} />
      </div>
      <h2 className="font-display mt-[22px] text-[26px] font-bold lowercase leading-none tracking-[0] text-[#154527]">you&apos;re all set!</h2>
      <p className="mt-[12px] text-[12px] font-light leading-[17px] tracking-[0] text-[#547257]">
        You&apos;re on the Pay-to-Play plan.
        <br />
        Taking you home to start playing.
      </p>
    </div>
  </div>
);

const JoinMembershipPage = () => {
  const { navigate } = useRouter();
  const firstName = getJoinDetails().firstName?.trim() || "{first name}";
  const { packages } = useMembershipPackages();
  const [location, setLocation] = useState(locations[0]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // The API's default package behaves like the old "pay-to-play": selecting it
  // completes without checkout; any other plan goes to checkout.
  const defaultPlanId = packages.find((plan) => plan.isDefault)?.id ?? packages[0]?.id ?? null;
  const activePlanId = selectedPlanId ?? defaultPlanId;
  const isDefaultSelected = activePlanId === defaultPlanId;

  useEffect(() => {
    if (!showSuccess) {
      return undefined;
    }

    const timerId = window.setTimeout(() => navigate("/"), 2200);
    return () => window.clearTimeout(timerId);
  }, [showSuccess, navigate]);

  const handleContinue = () => {
    if (isDefaultSelected) {
      setShowSuccess(true);
      return;
    }

    const selectedPlan = packages.find((plan) => plan.id === activePlanId);
    if (selectedPlan) {
      saveSelectedMembership(selectedPlan);
    }
    navigate("/join-epic/membership/checkout");
  };

  return (
    <OverlayShell>
      <div className="relative flex min-h-[calc(100vh-71px)] w-full flex-col overflow-hidden rounded-t-[34px] bg-white shadow-none md:grid md:h-[542px] md:min-h-0 md:w-[886px] md:shrink-0 md:grid-cols-[410px_476px] md:rounded-[45px]">
        <Link to="/" aria-label="Close" className="absolute right-[24px] top-[24px] z-10 text-[#154527] transition hover:text-[#FAD7D3] md:right-[39px] md:top-[31px]">
          <X size={17} strokeWidth={2} />
        </Link>

        <section className="relative bg-white px-[40px] pb-[28px] pt-[40px] md:h-[542px] md:pb-[54px] md:pt-[60px]">
          <img src={`${ASSET_PATH}logo-mark-cream.svg`} alt="Epic" className="hidden h-[60px] w-[60px] md:block" />

          <div className="md:mt-[135px]">
            <h1 className="font-display text-[46px] font-bold lowercase leading-[0.98] tracking-[0] text-[#FAD7D3] md:text-[64px]">
              welcome
              <br />
              {firstName}
            </h1>
            <p className="mt-[16px] max-w-[315px] text-[12px] font-light leading-[15px] tracking-[0] text-[#154527] md:mt-[25px]">
              Game on!
              <br />
              The court is waiting, and so is your next win.
            </p>
          </div>

          <Link to="/profile" className="mt-[18px] inline-block text-[10px] font-light leading-none tracking-[0] text-[#547257] md:absolute md:bottom-[54px] md:left-[40px] md:mt-0">
            View your profile
          </Link>
        </section>

        <section className="relative flex-1 bg-[#D9D9D933] px-[40px] pb-[40px] pt-[28px] md:h-[542px] md:px-[58px] md:pb-0 md:pt-[62px]">
          <p className="text-[12px] font-light leading-none tracking-[0] text-[#154527]">Select your default location</p>
          <div className="mt-[12px]">
            <PillDropdown variant="box" label="Select your location" options={locations} value={location} onChange={setLocation} highlightSelected={false} />
          </div>

          <p className="mt-[16px] text-[12px] font-light leading-[16px] tracking-[0] text-[#154527] md:mt-[36px]">
            You are now on a Pay-to-Play default plan. Select your prefered membership plan to unlock more perks, zero booking fees and access to exclusive events.
          </p>

          <div className="plan-scroll mt-[13px] grid max-h-[300px] gap-[14px] overflow-y-auto pr-1 md:mt-[3px] md:max-h-[210px] md:gap-[8px]">
            {packages.map((plan) => (
              <PlanOption key={plan.id} plan={plan} selected={activePlanId === plan.id} onSelect={setSelectedPlanId} />
            ))}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="mt-[24px] h-[48px] w-full rounded-full bg-[#154527] text-[13px] font-light uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:absolute md:inset-x-[58px] md:bottom-[54px] md:mt-0 md:h-[37px] md:w-auto"
          >
            {isDefaultSelected ? "Continue" : "Checkout"}
          </button>
        </section>
      </div>

      {showSuccess ? <SuccessModal /> : null}
    </OverlayShell>
  );
};

export default JoinMembershipPage;
