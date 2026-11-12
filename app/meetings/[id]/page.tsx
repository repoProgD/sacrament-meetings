import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingPageProps) {
    const { id } = await params;

    const meeting = getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return (
        <div className="px-6 py-10">
            <MeetingDetail meeting={meeting} />
        </div>
    );
}

export default function MeetingPage({ params }: MeetingPageProps) {
    return (
        <Suspense fallback={<p className="p-6">Loading meeting...</p>}>
            <MeetingContent params={params} />
        </Suspense>
    );
}