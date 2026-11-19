import { Suspense } from 'react';
import MeetingsNavLinks from '@/components/MeetingsNavLinks';

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Suspense fallback={<nav />}>
                <MeetingsNavLinks />
            </Suspense>

            {children}
        </section>
    );
}