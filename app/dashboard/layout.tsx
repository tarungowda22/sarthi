'use client';

import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('sarthi-auth');
    localStorage.removeItem('sarthi-user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}