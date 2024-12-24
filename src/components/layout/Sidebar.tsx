import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex w-[100vw] min-h-screen">
      <AppSidebar setColps={setCollapsed} />
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? '' : 'ml-2'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
