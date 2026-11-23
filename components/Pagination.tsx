//components/Pagination.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-center gap-6 py-6"
        >
            {currentPage > 1 && (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="rounded-md px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-green-300"
                >
                    Previous
                </Link>
            )}

            <span className="font-medium text-gray-100">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="rounded-md px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-green-300"
                >
                    Next
                </Link>
            )}
        </nav>
    );
}
