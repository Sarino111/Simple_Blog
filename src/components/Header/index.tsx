
"use client";

import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isBlogDetail = pathname.startsWith('/blog/') && pathname.split('/').length > 2;

  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
        {isBlogDetail && (
          <button
            onClick={() => router.back()}
            className="text-blue-600 border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-100 cursor-pointer"
          >
            Späť
          </button>
        )}
      </div>
    </header>
  );
}
