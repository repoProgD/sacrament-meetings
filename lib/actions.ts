'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
} from '@/lib/meetings-db';

const hymnSchema = (label: string) =>
    z.object({
        number: z.coerce
            .number(`${label} number must be a number.`)
            .int(`${label} number must be a whole number.`)
            .min(1, `${label} number must be 1 or greater.`),
        title: z
            .string(`${label} title is required.`)
            .trim()
            .min(1, `${label} title is required.`),
    });

const MeetingFormSchema = z.object({
    date: z
        .string('Date is required.')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date is required.'),
    meetingType: z.enum(
        ['testimony', 'special', 'regular', 'stake', 'general'],
        'Select a meeting type.'
    ),
    presiding: z
        .string('Presiding is required.')
        .trim()
        .min(1, 'Presiding is required.'),
    conducting: z
        .string('Conducting is required.')
        .trim()
        .min(1, 'Conducting is required.'),
    announcements: z.array(z.string().trim().min(1)),
    openingHymn: hymnSchema('Opening hymn'),
    openingPrayer: z
        .string('Opening prayer is required.')
        .trim()
        .min(1, 'Opening prayer is required.'),
    wardBusiness: z.array(z.object({ description: z.string().trim().min(1) })),
    stakeBusiness: z.boolean(),
    sacramentHymn: hymnSchema('Sacrament hymn'),
    speakers: z.array(
        z.object({
            name: z
                .string()
                .trim()
                .min(1, 'Each speaker or musical number needs a name.'),
            topic: z.string().trim(),
            type: z.enum(['speaker', 'musical-number'], 'Invalid speaker type.'),
        })
    ),
    closingHymn: hymnSchema('Closing hymn'),
    closingPrayer: z
        .string('Closing prayer is required.')
        .trim()
        .min(1, 'Closing prayer is required.'),
});

export type State = {
    errors?: Partial<Record<keyof z.infer<typeof MeetingFormSchema>, string[]>>;
    message?: string | null;
};

// Groups Zod issues by top-level field name (hymns and speakers are nested)
function getFieldErrors(error: z.ZodError): State['errors'] {
    const errors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const field = String(issue.path[0] ?? '');

        if (!errors[field]) {
            errors[field] = [];
        }

        if (!errors[field].includes(issue.message)) {
            errors[field].push(issue.message);
        }
    }

    return errors as State['errors'];
}

// Textarea -> one item per non-empty line
function getLines(formData: FormData, field: string): string[] {
    return String(formData.get(field) ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function getSpeakers(formData: FormData) {
    const names = formData.getAll('speakerName');
    const topics = formData.getAll('speakerTopic');
    const types = formData.getAll('speakerType');

    return names
        .map((name, index) => ({
            name: String(name).trim(),
            topic: String(topics[index] ?? '').trim(),
            type: String(types[index] ?? 'speaker'),
        }))
        .filter((speaker) => speaker.name !== '' || speaker.topic !== '');
}

function getMeetingData(formData: FormData) {
    return {
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: getLines(formData, 'announcements'),
        openingHymn: {
            number: formData.get('openingHymnNumber'),
            title: formData.get('openingHymnTitle'),
        },
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: getLines(formData, 'wardBusiness').map((description) => ({
            description,
        })),
        stakeBusiness: formData.get('stakeBusiness') === 'on',
        sacramentHymn: {
            number: formData.get('sacramentHymnNumber'),
            title: formData.get('sacramentHymnTitle'),
        },
        speakers: getSpeakers(formData),
        closingHymn: {
            number: formData.get('closingHymnNumber'),
            title: formData.get('closingHymnTitle'),
        },
        closingPrayer: formData.get('closingPrayer'),
    };
}

function parseMeetingId(id: string): number {
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId < 1) {
        throw new Error('Invalid meeting ID.');
    }

    return meetingId;
}

// CREATE
export async function createMeeting(
    prevState: State,
    formData: FormData
): Promise<State> {
    const parsed = MeetingFormSchema.safeParse(getMeetingData(formData));

    if (!parsed.success) {
        return {
            errors: getFieldErrors(parsed.error),
            message: 'Missing or invalid fields. Failed to create meeting.',
        };
    }

    try {
        await addMeeting(parsed.data);
    } catch (error) {
        console.error('Error creating meeting:', error);
        throw new Error('Failed to create meeting. Please try again later.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

// UPDATE
export async function updateMeeting(
    id: string,
    prevState: State,
    formData: FormData
): Promise<State> {
    const meetingId = parseMeetingId(id);

    const parsed = MeetingFormSchema.safeParse(getMeetingData(formData));

    if (!parsed.success) {
        return {
            errors: getFieldErrors(parsed.error),
            message: 'Missing or invalid fields. Failed to update meeting.',
        };
    }

    let updated;

    try {
        updated = await updateMeetingInDb(meetingId, parsed.data);
    } catch (error) {
        console.error('Error updating meeting:', error);
        throw new Error('Failed to update meeting. Please try again later.');
    }

    if (!updated) {
        throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

// DELETE
export async function deleteMeeting(id: string) {
    const meetingId = parseMeetingId(id);

    try {
        await deleteMeetingInDb(meetingId);
    } catch (error) {
        console.error('Error deleting meeting:', error);
        throw new Error('Failed to delete meeting. Please try again later.');
    }

    revalidatePath('/meetings');
}