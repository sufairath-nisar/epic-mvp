import HomePage from "./pages/HomePage";
import { RouterProvider, useRouter } from "./router/RouterProvider";
import StoryPage from "./pages/StoryPage";
import FindEpicPage from "./pages/FindEpicPage";
import JournalPage from "./pages/JournalPage";
import ArticlePage from "./pages/ArticlePage";
import JoinEpicPage from "./pages/JoinEpicPage";
import WearEpicPage from "./pages/WearEpicPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import InvestmentsPage from "./pages/InvestmentsPage";

const AppRoutes = () => {
  const { path } = useRouter();

  if (path === "/" || path === "") {
    return <HomePage />;
  }

  if (path === "/our-story") return <StoryPage />;
  if (path === "/our-journal") return <JournalPage />;
  if (path === "/our-journal/blog") return <ArticlePage />;
  if (path === "/find-epic/charlotte") return <FindEpicPage />;
  if (path === "/join-epic" || path === "/join-epic/otp" || path.startsWith("/join-epic/membership")) return <JoinEpicPage />;
  if (path === "/wear-epic" || path === "/wear-epic/all") return <WearEpicPage />;
  if (path === "/wear-epic/product") return <ProductPage />;
  if (path === "/wear-epic/cart") return <CartPage />;
  if (path === "/booking" || path === "/booking/court" || path === "/booking/programs") return <BookingPage />;
  if (path === "/booking/checkout") return <BookingPage mode="checkout" />;
  if (path === "/booking/confirmation") return <BookingPage mode="confirmation" />;
  if (path === "/profile") return <ProfilePage />;
  if (path === "/profile/new" || path === "/profile/edit" || path === "/profile/save") {
    return <ProfilePage state={path.split("/").pop()} />;
  }
  if (path === "/investments") return <InvestmentsPage />;

  return <HomePage />;
};

const App = () => {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
};

export default App;
