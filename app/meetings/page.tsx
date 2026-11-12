
import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
    const meetings = getMeetings();

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">

            <header>
                <h1 className="text-3xl font-bold">
                    Sacrament Meetings
                </h1>
                <p className="mt-2 text-gray-100">
                    Browse all meeting programs.
                </p>
            </header>

            {meetings.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">
                    No meetings available.
                </p>
            )}

        </div>
    );
}
