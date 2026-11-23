// app/(public)/meetings/page.tsx
import Link from 'next/link';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import {
    getFilteredMeetings,
    getMeetingsTotalPages,
} from '@/lib/meetings-db';

type MeetingsPageProps = {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
};

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const params = await searchParams;

    const query = params.query ?? '';
    const currentPage = Math.max(1, Number(params.page) || 1);

    const [meetings, totalPages] = await Promise.all([
        getFilteredMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Sacrament Meetings
                    </h1>
                    <p className="mt-2 text-gray-100">
                        Browse all meeting programs.
                    </p>
                </div>

                <Link
                    href="/meetings/new"
                    className="rounded bg-indigo-800 px-5 py-2 text-white hover:bg-indigo-700"
                >
                    New Meeting
                </Link>
            </header>

            <MeetingSearch />

            {meetings.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                            showActions
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">
                    No meetings found.
                </p>
            )}

            {totalPages > 0 && (
                <Pagination totalPages={totalPages} />
            )}
        </div>
    );
}