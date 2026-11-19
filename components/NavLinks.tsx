'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-6">
            <Link href="/" className={pathname === '/'
                ? 'text-blue-200 font-semibold'
                : 'text-gray-300 hover:text-green-300'}>
                Home
            </Link>

            <Link href="/meetings" className={pathname.startsWith('/meetings')
                ? 'text-blue-200 font-semibold'
                : 'text-gray-300 hover:text-green-300'}>
                  Meetings
            </Link>
        </nav>
    );
}