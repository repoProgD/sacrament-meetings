import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    return (
        <div className="mx-auto max-w-3xl space-y-8 rounded-2xl border-2 border-blue-400 bg-blue-100 p-8 shadow-md">

            {/* General Information */}
            <section className="border-b border-blue-200 pb-6">
                <span className="inline-flex items-center rounded-md bg-blue-200/80 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                    {meeting.date}
                </span>
                <h1 className="mt-3 text-3xl font-extrabold capitalize tracking-tight text-slate-950">
                    {meeting.meetingType} Meeting
                </h1>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <p className="text-sm font-bold text-slate-900">
                        Presiding: <span className="font-semibold text-slate-900">{meeting.presiding}</span>
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                        Conducting: <span className="font-semibold text-slate-900">{meeting.conducting}</span>
                    </p>
                </div>
            </section>

            {/* Announcements */}
            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="border-b border-blue-200 pb-6">
                    <h2 className="text-xl font-bold text-slate-900">Announcements</h2>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-900">
                        {meeting.announcements.map((item, index) => (
                            <li key={index} className="text-sm">{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Opening */}
            <section className="border-b border-blue-200 pb-6">
                <h2 className="text-xl font-bold text-slate-900">Opening</h2>
                <div className="mt-3 space-y-2 text-slate-900">
                    <p className="text-sm">
                        <strong className="font-bold text-slate-900">Hymn ({meeting.openingHymn.number}):</strong> <span className="font-semibold text-slate-900">{meeting.openingHymn.title}</span>
                    </p>
                    <p className="text-sm">
                        <strong className="font-bold text-slate-900">Prayer:</strong> <span className="font-semibold text-slate-900">{meeting.openingPrayer}</span>
                    </p>
                </div>
            </section>

            {/* Ward Business */}
            <section className="border-b border-blue-200 pb-6">
                <h2 className="text-xl font-bold text-slate-900">Ward Business</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-900">
                    {meeting.wardBusiness.map((item, index) => (
                        <li key={index} className="text-sm">{item.description}</li>
                    ))}
                </ul>
                {meeting.stakeBusiness && (
                    <p className="mt-3 text-sm font-semibold text-slate-900">Stake Business included</p>
                )}
            </section>

            {/* Sacrament */}
            <section className="border-b border-blue-200 pb-6">
                <h2 className="text-xl font-bold text-slate-900">Sacrament</h2>
                <div className="mt-3 text-slate-900">
                    <p className="text-sm">
                        <strong className="font-bold text-slate-900">Hymn ({meeting.sacramentHymn.number}):</strong> <span className="font-semibold text-slate-900">{meeting.sacramentHymn.title}</span>
                    </p>
                </div>
            </section>

            {/* Speakers and Musical Numbers */}
            <section className="border-b border-blue-200 pb-6">
                <h2 className="text-xl font-bold text-slate-900">Speakers and Musical Numbers</h2>
                <ul className="mt-3 space-y-2 pl-5 list-disc text-slate-900">
                    {meeting.speakers.map((item, index) => (
                        <li key={index} className="text-sm">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            {' — '}
                            <span className="font-semibold text-slate-900">{item.topic}</span>
                            <span className="text-xs font-medium text-slate-700"> ({item.type})</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Closing */}
            <section>
                <h2 className="text-xl font-bold text-slate-900">Closing</h2>
                <div className="mt-3 space-y-2 text-slate-900">
                    <p className="text-sm">
                        <strong className="font-bold text-slate-900">Hymn ({meeting.closingHymn.number}):</strong> <span className="font-semibold text-slate-900">{meeting.closingHymn.title}</span>
                    </p>
                    <p className="text-sm">
                        <strong className="font-bold text-slate-900">Prayer:</strong> <span className="font-semibold text-slate-900">{meeting.closingPrayer}</span>
                    </p>
                </div>
            </section>

        </div>
    );
}