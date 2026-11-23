// components/MeetingForm.tsx

'use client';

import { useActionState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import type { State } from '@/lib/actions';

interface MeetingFormProps {
    action: (prevState: State, formData: FormData) => Promise<State>;
    meeting?: SacramentMeeting;
    submitLabel: string;
}

const initialState: State = { message: null, errors: {} };

const inputClass =
    'w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none ring-indigo-400 placeholder:text-slate-400 [color-scheme:dark] focus:ring-2';
const MIN_SPEAKER_ROWS = 4;

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            ))}
        </div>
    );
}

export default function MeetingForm({
    action,
    meeting,
    submitLabel,
}: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const errors = state.errors;

    const speakers = meeting?.speakers ?? [];
    const speakerRows = Math.max(MIN_SPEAKER_ROWS, speakers.length);

    return (
        <form action={formAction} className="max-w-2xl space-y-6">
            <div>
                <label htmlFor="date" className="mb-2 block">Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={meeting?.date}
                    required
                    className={inputClass}
                    aria-describedby="date-error"
                />
                <FieldError id="date-error" errors={errors?.date} />
            </div>

            <div>
                <label htmlFor="meetingType" className="mb-2 block">
                    Meeting Type
                </label>
                <select
                    id="meetingType"
                    name="meetingType"
                    defaultValue={meeting?.meetingType ?? ''}
                    required
                    className={inputClass}
                    aria-describedby="meetingType-error"
                >
                    <option value="" disabled>Select a type</option>
                    <option value="regular">Regular</option>
                    <option value="testimony">Testimony</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                    <option value="special">Special</option>
                </select>
                <FieldError id="meetingType-error" errors={errors?.meetingType} />
            </div>

            <div>
                <label htmlFor="presiding" className="mb-2 block">Presiding</label>
                <input
                    id="presiding"
                    name="presiding"
                    defaultValue={meeting?.presiding}
                    required
                    className={inputClass}
                    aria-describedby="presiding-error"
                />
                <FieldError id="presiding-error" errors={errors?.presiding} />
            </div>

            <div>
                <label htmlFor="conducting" className="mb-2 block">Conducting</label>
                <input
                    id="conducting"
                    name="conducting"
                    defaultValue={meeting?.conducting}
                    required
                    className={inputClass}
                    aria-describedby="conducting-error"
                />
                <FieldError id="conducting-error" errors={errors?.conducting} />
            </div>

            <div>
                <label htmlFor="announcements" className="mb-2 block">
                    Announcements (one per line)
                </label>
                <textarea
                    id="announcements"
                    name="announcements"
                    rows={3}
                    defaultValue={(meeting?.announcements ?? []).join('\n')}
                    className={inputClass}
                    aria-describedby="announcements-error"
                />
                <FieldError id="announcements-error" errors={errors?.announcements} />
            </div>

            <fieldset className="space-y-3 rounded border p-4">
                <legend className="px-2 font-semibold">Opening Hymn</legend>
                <div>
                    <label htmlFor="openingHymnNumber" className="mb-2 block">Number</label>
                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        defaultValue={meeting?.openingHymn.number}
                        required
                        className={inputClass}
                        aria-describedby="openingHymn-error"
                    />
                </div>
                <div>
                    <label htmlFor="openingHymnTitle" className="mb-2 block">Title</label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        defaultValue={meeting?.openingHymn.title}
                        required
                        className={inputClass}
                        aria-describedby="openingHymn-error"
                    />
                </div>
                <FieldError id="openingHymn-error" errors={errors?.openingHymn} />
            </fieldset>

            <div>
                <label htmlFor="openingPrayer" className="mb-2 block">
                    Opening Prayer
                </label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    defaultValue={meeting?.openingPrayer}
                    required
                    className={inputClass}
                    aria-describedby="openingPrayer-error"
                />
                <FieldError id="openingPrayer-error" errors={errors?.openingPrayer} />
            </div>

            <div>
                <label htmlFor="wardBusiness" className="mb-2 block">
                    Ward Business (one item per line)
                </label>
                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    defaultValue={(meeting?.wardBusiness ?? [])
                        .map((item) => item.description)
                        .join('\n')}
                    className={inputClass}
                    aria-describedby="wardBusiness-error"
                />
                <FieldError id="wardBusiness-error" errors={errors?.wardBusiness} />
            </div>

            <div>
                <div className="flex items-center gap-2">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        defaultChecked={meeting?.stakeBusiness ?? false}
                        className="outline-none ring-indigo-500 focus:ring-2"
                        aria-describedby="stakeBusiness-error"
                    />
                    <label htmlFor="stakeBusiness">Stake business</label>
                </div>
                <FieldError id="stakeBusiness-error" errors={errors?.stakeBusiness} />
            </div>

            <fieldset className="space-y-3 rounded border p-4">
                <legend className="px-2 font-semibold">Sacrament Hymn</legend>
                <div>
                    <label htmlFor="sacramentHymnNumber" className="mb-2 block">Number</label>
                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        defaultValue={meeting?.sacramentHymn.number}
                        required
                        className={inputClass}
                        aria-describedby="sacramentHymn-error"
                    />
                </div>
                <div>
                    <label htmlFor="sacramentHymnTitle" className="mb-2 block">Title</label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        defaultValue={meeting?.sacramentHymn.title}
                        required
                        className={inputClass}
                        aria-describedby="sacramentHymn-error"
                    />
                </div>
                <FieldError id="sacramentHymn-error" errors={errors?.sacramentHymn} />
            </fieldset>

            <fieldset className="space-y-4 rounded border p-4">
                <legend className="px-2 font-semibold">
                    Speakers and Musical Numbers (leave unused rows empty)
                </legend>
                {Array.from({ length: speakerRows }, (_, index) => {
                    const speaker = speakers[index];

                    return (
                        <div key={index} className="grid gap-3 md:grid-cols-3">
                            <div>
                                <label htmlFor={`speakerName-${index}`} className="mb-2 block">
                                    Name {index + 1}
                                </label>
                                <input
                                    id={`speakerName-${index}`}
                                    name="speakerName"
                                    defaultValue={speaker?.name}
                                    className={inputClass}
                                    aria-describedby="speakers-error"
                                />
                            </div>
                            <div>
                                <label htmlFor={`speakerTopic-${index}`} className="mb-2 block">
                                    Topic {index + 1}
                                </label>
                                <input
                                    id={`speakerTopic-${index}`}
                                    name="speakerTopic"
                                    defaultValue={speaker?.topic}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor={`speakerType-${index}`} className="mb-2 block">
                                    Type {index + 1}
                                </label>
                                <select
                                    id={`speakerType-${index}`}
                                    name="speakerType"
                                    defaultValue={speaker?.type ?? 'speaker'}
                                    className={inputClass}
                                >
                                    <option value="speaker">Speaker</option>
                                    <option value="musical-number">Musical number</option>
                                </select>
                            </div>
                        </div>
                    );
                })}
                <FieldError id="speakers-error" errors={errors?.speakers} />
            </fieldset>

            <fieldset className="space-y-3 rounded border p-4">
                <legend className="px-2 font-semibold">Closing Hymn</legend>
                <div>
                    <label htmlFor="closingHymnNumber" className="mb-2 block">Number</label>
                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        defaultValue={meeting?.closingHymn.number}
                        required
                        className={inputClass}
                        aria-describedby="closingHymn-error"
                    />
                </div>
                <div>
                    <label htmlFor="closingHymnTitle" className="mb-2 block">Title</label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        defaultValue={meeting?.closingHymn.title}
                        required
                        className={inputClass}
                        aria-describedby="closingHymn-error"
                    />
                </div>
                <FieldError id="closingHymn-error" errors={errors?.closingHymn} />
            </fieldset>

            <div>
                <label htmlFor="closingPrayer" className="mb-2 block">
                    Closing Prayer
                </label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    defaultValue={meeting?.closingPrayer}
                    required
                    className={inputClass}
                    aria-describedby="closingPrayer-error"
                />
                <FieldError id="closingPrayer-error" errors={errors?.closingPrayer} />
            </div>

            <div aria-live="polite">
                {state.message ? (
                    <p className="text-sm text-red-600">{state.message}</p>
                ) : null}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded bg-indigo-800 px-5 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}