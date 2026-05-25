'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <iframe 
        src="/index.html" 
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block'
        }}
        title="AfroSite Agency"
      />
      {/* Admin Access Link - Fixed Position */}
      <Link 
        href="/admin/login"
        className="fixed bottom-[100px] right-[26px] z-[7999] px-4 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold no-underline transition-all hover:bg-zinc-800 hover:scale-105"
      >
        Admin
      </Link>
    </div>
  );
}
