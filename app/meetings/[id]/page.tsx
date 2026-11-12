
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { getBaseUrl } from '@/lib/get-base-url';

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingPageProps) {
    const { id } = await params;

    const response = await fetch(
        `${getBaseUrl()}/api/meetings/${id}`
    );

    if (response.status === 400 || response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error('Failed to fetch meeting');
    }

    const meeting: SacramentMeeting = await response.json();

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
