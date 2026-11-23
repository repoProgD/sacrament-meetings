// components/MeetingCard.tsx
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
    meeting: SacramentMeeting;
    showActions?: boolean;
}

export default function MeetingCard({ meeting, showActions = false }: MeetingCardProps) {
    return (
        <div className="group rounded-xl border-2 border-blue-400 bg-blue-100 p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20">
            <Link href={`/meetings/${meeting.id}`} className="block">
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-blue-200/80 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                        {meeting.date}
                    </span>
                </div>

                <p className="mt-3 text-lg font-bold capitalize text-slate-950 transition-colors group-hover:text-emerald-950">
                    {meeting.meetingType} Meeting
                </p>

                <p className="mt-1.5 text-sm font-bold text-slate-950">
                    Presiding: <span className="font-semibold text-slate-700">{meeting.presiding}</span>
                </p>
            </Link>

            {showActions && (
                <div className="mt-4 flex gap-3">
                    <Link
                        href={`/meetings/${meeting.id}/edit`}
                        className="rounded bg-indigo-800 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                        Edit
                    </Link>

                    <form action={deleteMeeting.bind(null, String(meeting.id))}>
                        <button
                            type="submit"
                            aria-label={`Delete meeting of ${meeting.date}`}
                            className="rounded bg-purple-900 px-4 py-2 text-sm text-white hover:bg-purple-800"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}