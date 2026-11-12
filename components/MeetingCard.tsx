
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (

        <Link
            href={`/meetings/${meeting.id}`}
            className="group block rounded-xl border-2 border-blue-400 bg-blue-100 p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20"
        >
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

    );
}
