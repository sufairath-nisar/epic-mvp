import { mainNavigation } from "./routes";

export const f31HomepageData = {
  navigation: mainNavigation,
  locations: [
    {
      id: "charlotte",
      city: "CHARLOTTE, NC",
      image: "home-location-1.png",
      images: ["home-location-1.png", "location-carousel-player.png"],
      path: "/find-epic/charlotte",
      description:
        "Epic Padel is Open Now at Prosperity Athletic Club's outdoor padel courts, flexible membership plans, and a vibrant community waiting for you.",
      cta: "VIEW MEMBERSHIPS"
    },
    {
      id: "tysons-corner",
      city: "TYSON'S CORNER, VA",
      image: "home-location-brand.png",
      images: ["home-location-brand.png", "location-carousel-scoreboard.png"],
      path: "/join-epic",
      description: "We're excited to announce that Epic Padel is coming to Tysons Corner, Virginia in Spring 2026.",
      cta: "STAY UP TO DATE"
    },
    {
      id: "milwaukee",
      city: "MILWAUKEE, WI",
      image: "home-location-2.png",
      images: ["home-location-2.png", "location-carousel-glass-logo.png"],
      path: "/join-epic",
      description: "We're excited to announce that Epic Padel is coming to Milwaukee, Wisconsin in Spring 2026.",
      cta: "STAY UP TO DATE"
    }
  ],
  facilities: [
    {
      label: "STATE-OF-THE-ART COURTS",
      icon: "amenity-icon-courts.svg"
    },
    {
      label: "SPA-LIKE LOCKER ROOMS & SHOWERS",
      icon: "amenity-icon-lockers.svg"
    },
    {
      label: "FULLY STOCKED SHOP",
      icon: "amenity-icon-shop.svg"
    },
    {
      label: "CAFE & JUICE BAR",
      icon: "amenity-icon-cafe.svg"
    },
    {
      label: "PREMIUM FITNESS AREAS",
      icon: "amenity-icon-fitness.svg"
    },
    {
      label: "COWORKING & LOUNGE SPACES",
      icon: "amenity-icon-lounge.svg"
    }
  ],
  sportTabs: ["TENNIS", "PADEL", "PICKLEBALL"],
  bookingTabs: ["BOOK A COURT", "PROGRAMS", "LESSONS", "INSTRUCTORS", "FIND A MATCH"],
  testimonials: [
    {
      quote: "Epic Padel's ability to merge innovation with traditional racquet sports values is exactly what our industry needs.",
      author: "Boris Fetbroyt"
    },
    {
      quote: "Epic Padel's ability to merge innovation with traditional racquet sports values is exactly what our industry needs.",
      author: "Boris Fetbroyt"
    },
    {
      quote: "Epic Padel's ability to merge innovation with traditional racquet sports values is exactly what our industry needs.",
      author: "Boris Fetbroyt"
    }
  ],
  footer: {
    findUs: ["Charlotte, NC", "Tyson's Corner, VA", "Milwaukee, WI"],
    sayHi: ["Contact us", "Work with us", "Investments"],
    knowMore: ["FAQs", "Cancellation policy", "Terms & Conditions", "Privacy policy"]
  }
};
