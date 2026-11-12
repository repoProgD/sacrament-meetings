
import { Suspense } from 'react';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

async function CurrentMeetingContent() {
    await connection();

    const today = new Date();
    const dayOfWeek = today.getDay();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    const date = [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, '0'),
        String(sunday.getDate()).padStart(2, '0')
    ].join('-');

    const meetings = getMeetings(date);

    if (meetings.length === 0) {
        return <p>No meeting found for this Sunday.</p>;
    }

    redirect(`/meetings/${meetings[0].id}`);
}

export default function CurrentMeetingPage() {
    return (
        <Suspense fallback={<p className="p-6">Finding current meeting...</p>}>
            <CurrentMeetingContent />
        </Suspense>
    );
}
