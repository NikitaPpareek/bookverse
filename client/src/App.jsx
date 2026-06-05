// import { lazy, Suspense } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { ToastProvider } from "./contexts/ToastContext";
// import { UserProvider } from "./contexts/UserContext";
// import { LibraryProvider } from "./contexts/LibraryContext";
// import { SearchProvider } from "./contexts/SearchContext";
// import MainLayout from "./layouts/MainLayout";
// import LoadingSpinner from "./components/common/LoadingSpinner";

// const HomePage = lazy(() => import("./pages/HomePage"));
// const DiscoverPage = lazy(() => import("./pages/DiscoverPage"));
// const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage"));
// const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
// const TrendingPage = lazy(() => import("./pages/TrendingPage"));
// const AboutPage = lazy(() => import("./pages/AboutPage"));
// const LibraryPage = lazy(() => import("./pages/LibraryPage"));
// const SignInPage = lazy(() => import("./pages/SignInPage"));

// function PageLoader() {
//   return (
//     <div className="min-h-[50vh] flex items-center justify-center">
//       <LoadingSpinner size="lg" />
//     </div>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <ToastProvider>
//         <UserProvider>
//           <LibraryProvider>
//             <SearchProvider>
//               <Suspense fallback={<PageLoader />}>
//                 <Routes>
//                   <Route element={<MainLayout />}>
//                     <Route index element={<HomePage />} />
//                     <Route path="discover" element={<DiscoverPage />} />
//                     <Route path="books" element={<Navigate to="/discover" replace />} />
//                     <Route path="books/:id" element={<BookDetailsPage />} />
//                     <Route path="categories" element={<CategoriesPage />} />
//                     <Route path="trending" element={<TrendingPage />} />
//                     <Route path="about" element={<AboutPage />} />
//                     <Route path="library" element={<LibraryPage />} />
//                     <Route path="wishlist" element={<Navigate to="/library" replace />} />
//                     <Route path="signin" element={<SignInPage />} />
//                     <Route path="login" element={<Navigate to="/signin" replace />} />
//                     <Route path="contact" element={<Navigate to="/about" replace />} />
//                   </Route>
//                 </Routes>
//               </Suspense>
//             </SearchProvider>
//           </LibraryProvider>
//         </UserProvider>
//       </ToastProvider>
//     </ThemeProvider>
//   );
// }

// export default App;

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LibraryProvider } from "./contexts/LibraryContext";
import { SearchProvider } from "./contexts/SearchContext";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/common/LoadingSpinner";

const HomePage = lazy(() => import("./pages/HomePage"));
const DiscoverPage = lazy(() => import("./pages/DiscoverPage"));
const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const AdminPage = lazy(() => import("./pages/AdminPage"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <LibraryProvider>
            <SearchProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route element={<MainLayout />}>
                    {/* Public Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="discover" element={<DiscoverPage />} />
                    <Route path="books" element={<Navigate to="/discover" replace />} />
                    <Route path="books/:id" element={<BookDetailsPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="trending" element={<TrendingPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<Navigate to="/about" replace />} />

                    {/* User Routes */}
                    <Route path="library" element={<LibraryPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />

                    {/* Authentication */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    {/* Admin */}
                    <Route path="admin" element={<AdminPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </SearchProvider>
          </LibraryProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;