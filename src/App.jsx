import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";
import { RouterProvider, useRouter } from "./router/RouterProvider";

// Route-level code splitting: each page is fetched only when its route is
// visited, shrinking the initial bundle. HomePage stays eager so the landing
// page paints immediately without a loading flash.
const StoryPage = lazy(() => import("./pages/StoryPage"));
const FindEpicPage = lazy(() => import("./pages/FindEpicPage"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const JoinEpicPage = lazy(() => import("./pages/JoinEpicPage"));
const VerifyOtpPage = lazy(() => import("./pages/VerifyOtpPage"));
const JoinMembershipPage = lazy(() => import("./pages/JoinMembershipPage"));
const WearEpicPage = lazy(() => import("./pages/WearEpicPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const ProfileSignupPage = lazy(() => import("./pages/ProfileSignupPage"));
const ProfileOtpPage = lazy(() => import("./pages/ProfileOtpPage"));
const InvestmentsPage = lazy(() => import("./pages/InvestmentsPage"));
const MembershipCheckoutPage = lazy(() => import("./pages/MembershipCheckoutPage"));

const AppRoutes = () => {
  const { path } = useRouter();

  if (path === "/" || path === "") {
    return <HomePage />;
  }

  if (path === "/our-story") return <StoryPage />;
  if (path === "/our-journal") return <JournalPage />;
  if (path === "/our-journal/blog" || path.startsWith("/our-journal/blog/")) return <ArticlePage />;
  if (path === "/find-epic") return <FindEpicPage />;
  if (path === "/join-epic/membership/checkout") return <MembershipCheckoutPage />;
  if (path === "/join-epic/membership") return <JoinMembershipPage />;
  if (path === "/join-epic/otp") return <VerifyOtpPage />;
  if (path === "/join-epic" || path.startsWith("/join-epic/membership")) return <JoinEpicPage />;
  if (path === "/wear-epic" || path === "/wear-epic/all") return <WearEpicPage />;
  if (path === "/wear-epic/product") return <ProductPage />;
  if (path === "/wear-epic/cart") return <CartPage />;
  if (path === "/booking" || path === "/booking/court" || path === "/booking/programs") return <BookingPage />;
  if (path === "/booking/checkout") return <BookingPage mode="checkout" />;
  if (path === "/booking/confirmation") return <BookingPage mode="confirmation" />;
  if (path === "/account") return <AccountPage section="menu" />;
  if (path.startsWith("/account/")) return <AccountPage section={path.split("/")[2] || "info"} />;
  if (path === "/profile/otp") return <ProfileOtpPage />;
  if (path === "/signin") return <ProfileSignupPage />;
  if (path === "/profile") return <LoginPage />;
  if (path === "/investments") return <InvestmentsPage />;

  return <HomePage />;
};

// Shown briefly while a lazily-loaded page chunk downloads. Matches the app
// background so there's no jarring flash.
const PageFallback = () => <div className="min-h-screen bg-[#FFFCF2]" />;

const App = () => {
  return (
    <RouterProvider>
      <Suspense fallback={<PageFallback />}>
        <AppRoutes />
      </Suspense>
    </RouterProvider>
  );
};

export default App;
