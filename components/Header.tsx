
import { Suspense } from 'react';
import { connection } from 'next/server';
import NavLinks from './NavLinks';

export default async function Header() {
    await connection();

    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
    }).format(new Date());

    return (
        <header className="bg-gray-900 text-white p-4"> 
            <div>
                <p className="text-xl font-semibold">San Miguel Ward</p>
                <p>{currentDate}</p>
            </div>

            <Suspense fallback={<nav />}>
                <NavLinks />
            </Suspense>
        </header>
    );
}
