'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MeetingsNavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-6 border-b border-gray-200 px-6 py-4">
            <Link
                href="/meetings"
                className={pathname === '/meetings' || /^\/meetings\/\d+$/.test(pathname)
                    ? 'font-semibold text-blue-200'
                    : 'text-gray-300 hover:text-green-300'}
            >
                All Meetings
            </Link>

            <Link
                href="/meetings/current"
                className={pathname === '/meetings/current'
                    ? 'font-semibold text-blue-200'
                    : 'text-gray-300 hover:text-green-300'}
            >
                Current Meeting
            </Link>
        </nav>
    );
}