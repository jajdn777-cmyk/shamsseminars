/**
 * Solar Hijri (Jalali) date helpers with Afghan month names and Persian digits
 * Timezone: Asia/Kabul
 * Friday is the weekly holiday (no bookings).
 */

export const AFGHAN_MONTHS = [
  'حمل',
  'ثور',
  'جوزا',
  'سرطان',
  'اسد',
  'سنبله',
  'میزان',
  'عقرب',
  'قوس',
  'جدی',
  'دلو',
  'حوت',
];

export const AFGHAN_WEEKDAYS = [
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
  'شنبه',
];

export function toPersianDigits(val: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(val).replace(/[0-9]/g, (d) => persianDigits[Number(d)]);
}

/**
 * Formats a Date object into Jalali calendar representation with Afghan month names.
 */
export function jalali(date: Date | string, lang: 'fa' | 'en' = 'fa'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Kabul',
    }).format(d);
  }

  try {
    const formatter = new Intl.DateTimeFormat('fa-AF-u-ca-persian-nu-arabext', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kabul',
    });
    return formatter.format(d);
  } catch {
    // Fallback if environment doesn't support u-ca-persian
    return d.toLocaleDateString();
  }
}

/**
 * Short representation for day pills (e.g. "شنبه، ۱۲ ثور")
 */
export function jalaliShort(date: Date | string, lang: 'fa' | 'en' = 'fa'): {
  weekday: string;
  day: string;
  month: string;
  fullShort: string;
} {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return { weekday: '', day: '', month: '', fullShort: '' };
  }

  if (lang === 'en') {
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Asia/Kabul' }).format(d);
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'Asia/Kabul' }).format(d);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'Asia/Kabul' }).format(d);
    return { weekday, day, month, fullShort: `${weekday}, ${day} ${month}` };
  }

  try {
    const weekday = new Intl.DateTimeFormat('fa-AF-u-ca-persian-nu-arabext', {
      weekday: 'short',
      timeZone: 'Asia/Kabul',
    }).format(d);
    const day = new Intl.DateTimeFormat('fa-AF-u-ca-persian-nu-arabext', {
      day: 'numeric',
      timeZone: 'Asia/Kabul',
    }).format(d);
    const month = new Intl.DateTimeFormat('fa-AF-u-ca-persian-nu-arabext', {
      month: 'long',
      timeZone: 'Asia/Kabul',
    }).format(d);
    return { weekday, day, month, fullShort: `${weekday}، ${day} ${month}` };
  } catch {
    return { weekday: '', day: String(d.getDate()), month: '', fullShort: d.toLocaleDateString() };
  }
}

/**
 * Returns the next N bookable days (Fridays skipped because Friday is weekend in Afghanistan).
 */
export function nextBookableDays(count = 21, from = new Date()): Date[] {
  const out: Date[] = [];
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);

  // We start from tomorrow so that bookings are planned ahead
  d.setDate(d.getDate() + 1);

  while (out.length < count) {
    // 5 = Friday in JS Date (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)
    if (d.getDay() !== 5) {
      out.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/**
 * Generates slots between start and end times at specified step minutes.
 */
export function makeSlots(start = '09:00', end = '15:30', stepMin = 30): string[] {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const slots: string[] = [];
  for (let m = sh * 60 + sm; m <= eh * 60 + em; m += stepMin) {
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

export function toDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
