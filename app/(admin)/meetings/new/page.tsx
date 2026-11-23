// app/(admin)/meetings/new/page.tsx
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">Create Meeting</h1>
            <MeetingForm action={createMeeting} submitLabel="Save Meeting" />
        </main>
    );
}