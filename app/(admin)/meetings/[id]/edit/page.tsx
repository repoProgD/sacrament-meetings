// app/(admin)/meetings/[id]/edit/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId < 1) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <MeetingForm
            action={updateMeeting.bind(null, id)}
            meeting={meeting}
            submitLabel="Update Meeting"
        />
    );
}

export default function EditMeetingPage(props: EditMeetingPageProps) {
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">Edit Meeting</h1>

            <Suspense fallback={<p>Loading meeting...</p>}>
                <EditMeetingContent params={props.params} />
            </Suspense>
        </main>
    );
}