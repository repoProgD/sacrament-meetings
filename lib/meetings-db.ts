import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-05-03',
        meetingType: 'Regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: May 10']
    },

    {
        id: 2,
        date: '2026-05-10',
        meetingType: 'Testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Miller',
        announcements: ['Youth activity: May 15'],
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Brother Anderson',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
        speakers: [
            { name: 'Sister Taylor', topic: 'Personal Testimony', type: 'speaker' },
            { name: 'Brother Clark', topic: 'The Power of Prayer', type: 'speaker' }
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Sister Wilson'
    },
    {
        id: 3,
        date: '2026-05-17',
        meetingType: 'Regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Ward picnic: May 24'],
        openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
        openingPrayer: 'Sister Davis',
        wardBusiness: [
            { description: 'Sustaining of new Sunday School teachers' }
        ],
        stakeBusiness: true,
        sacramentHymn: { number: 195, title: 'How Great the Wisdom and the Love' },
        speakers: [
            { name: 'Brother White', topic: 'Service and Discipleship', type: 'speaker' },
            { name: 'Sister Green', topic: 'Finding Peace Through Christ', type: 'speaker' }
        ],
        closingHymn: { number: 134, title: 'I Believe in Christ' },
        closingPrayer: 'Brother Harris'
    },
    {
        id: 4,
        date: '2026-05-24',
        meetingType: 'Stake',
        presiding: 'Stake President Johnson',
        conducting: 'Bishop Smith',
        openingHymn: { number: 6, title: 'Redeemer of Israel' },
        openingPrayer: 'Brother Thompson',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 188, title: 'Thy Will, O Lord, Be Done' },
        speakers: [
            { name: 'Stake President Johnson', topic: 'Strengthening Our Faith', type: 'speaker' },
            { name: 'Stake Choir', topic: 'Come, Thou Fount of Every Blessing', type: 'musical-number' }
        ],
        closingHymn: { number: 116, title: 'Come, Follow Me' },
        closingPrayer: 'Sister Moore'
    },
    {
        id: 5,
        date: '2026-05-31',
        meetingType: 'General',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Temple preparation class: June 3'],
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Brown',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Adams', topic: 'The Gospel of Jesus Christ', type: 'speaker' },
            { name: 'Sister Carter', topic: 'Serving Others', type: 'speaker' }
        ],
        closingHymn: { number: 89, title: 'The Lord Is My Light' },
        closingPrayer: 'Brother Davis'
    },
    {
        id: 6,
        date: '2026-11-08',
        meetingType: 'Regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Miller',
        announcements: ['Ward Christmas activity: December 12'],
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Taylor',
        wardBusiness: [
            { description: 'Sustaining of new Primary teachers' }
        ],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [
            { name: 'Brother Anderson', topic: 'Gratitude in Our Daily Lives', type: 'speaker' },
            { name: 'Sister Brown', topic: 'Following Jesus Christ', type: 'speaker' }
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Brother Davis'
    }

];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}