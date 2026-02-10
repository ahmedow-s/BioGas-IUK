import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar';
import { Header } from '../../widgets/Header';
import { useSelector } from 'react-redux';
import type { RootState } from '../../shared/lib/redux/store';
import BreadCrumbs from '../../shared/ui/BreadCrumbs';

export default function ProtectedLayout() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage =
    location.pathname === '/' || location.pathname === '/home';

  console.log('ProtectedLayout:', { token, isAuthenticated, user });

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const onOpenMobileMenu = () => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const onCloseMobileMenu = () => {
    setMobileOpen(false);
    document.body.style.overflow = 'auto';
  };

  const onToggleMobileMenu = () => {
    if (mobileOpen) {
      onCloseMobileMenu();
    } else {
      onOpenMobileMenu();
    }
  };

  return (
    <div className="min-h-screen">
      <Header onBurgerClick={onToggleMobileMenu} onCloseMobile={onCloseMobileMenu} />

      <div className="flex">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={onCloseMobileMenu}
          onToggle={onOpenMobileMenu}
        />

        <main className="flex-1 p-6 pb-12 overflow-y-auto h-[calc(100vh-87px)]">
          {!isHomePage && (
            <div className="mb-6">
              <BreadCrumbs />
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
