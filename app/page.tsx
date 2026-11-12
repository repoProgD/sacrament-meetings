
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-8 px-6 py-12">

            <Image
                src="/images/sacramental.webp"
                alt="Interior of sacrament meeting room"
                width={948}
                height={542}
                priority
                className="w-full max-w-3xl h-auto rounded-xl shadow-md"
            />

            <section className="max-w-3xl text-center space-y-4">
                <h1 className="text-3xl font-bold">
                    Welcome to San Miguel Ward
                </h1>

                <p className="text-gray-100">
                    View and manage sacrament meeting programs,
                    including hymns, speakers, prayers, and announcements.
                </p>
            </section>

        </main>
    );
}
