import { useState } from 'react'
// import { Navigate } from 'react-router';
import { Sidebar } from '../../widgets/Sidebar';
import { Header } from '../../widgets/Header';

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
//    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [mobileOpen, setMobileOpen] = useState(false);
  function onOpenMobileMenu() {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
    
  }
  function onCloseMobileMenu() {
    setMobileOpen(false);
    document.body.style.overflow = 'auto';
  }
  return (
    // token ?
    <div className=''>
        <Header />
      <div className="relative flex w-full h-full mx-auto   ">
        <Sidebar mobileOpen={mobileOpen} onClose={() => onCloseMobileMenu()} onToggle={() => onOpenMobileMenu()} />
        <main className="flex-1 max-lg:p-4 ">{children}</main>
      </div>
    </div>
    // :<Navigate to="/login" replace={true} />
  )
}
