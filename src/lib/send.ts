import { CONFIG } from '../config';
import { Booking } from './booking';
import { jalali } from './date';

/**
 * Sends booking payload to Google Apps Script Web App webhook (if configured).
 * Uses text/plain and mode: 'no-cors' to prevent CORS preflight blocks.
 */
export async function sendToSheet(b: Booking): Promise<boolean> {
  if (!CONFIG.sheetWebhookUrl) {
    return false;
  }
  try {
    await fetch(CONFIG.sheetWebhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(b),
    });
    return true;
  } catch (err) {
    console.warn('Google Sheets webhook notice (non-fatal):', err);
    return false;
  }
}

/**
 * Generates an instant WhatsApp message link pre-filled with booking details.
 */
export function whatsappLink(b: Booking): string {
  const dateFormatted = jalali(b.dateISO, 'fa');
  const modeText = b.mode === 'online' ? 'آنلاین' : 'حضوری';

  const textLines = [
    'سلام و احترام، وقت ملاقات جدید در مرکز شمس ثبت نمودم:',
    `🔖 کد پیگیری: ${b.code}`,
    `📌 خدمت درخواستی: ${b.service}`,
    `👤 شخص رابط: ${b.name}`,
    `🏫 نام مکتب: ${b.school} (${b.city})`,
    `👥 گروه هدف: ${b.audience} (${b.participants} اشتراک‌کننده)`,
    `📅 تاریخ: ${dateFormatted}`,
    `⏰ ساعت: ${b.time}`,
    `📍 نوعیت: ${modeText}`,
    b.note ? `📝 یادداشت: ${b.note}` : '',
    '',
    'لطفاً جهت هماهنگی و تایید نهایی با بنده تماس حاصل فرمایید. تشکر!',
  ].filter(Boolean);

  const message = encodeURIComponent(textLines.join('\n'));
  return `https://wa.me/${CONFIG.whatsapp}?text=${message}`;
}

/**
 * Generates and triggers download of a standardized .ics calendar event file.
 */
export function downloadICS(b: Booking): void {
  try {
    const rawDate = b.dateISO.replace(/[-:]/g, ''); // YYYYMMDD
    const rawTime = b.time.replace(':', ''); // HHMM
    const start = `${rawDate}T${rawTime}00`;
    
    // Calculate end time (30 min later)
    const [h, m] = b.time.split(':').map(Number);
    const endMinutes = h * 60 + m + 30;
    const eh = String(Math.floor(endMinutes / 60)).padStart(2, '0');
    const em = String(endMinutes % 60).padStart(2, '0');
    const end = `${rawDate}T${eh}${em}00`;

    const summary = `جلسه مرکز شمس - ${b.service}`;
    const description = `کد پیگیری: ${b.code}\\nمکتب: ${b.school}\\nشخص رابط: ${b.name}\\nتلفن: ${b.phone}\\nشماره تماس شمس: ${CONFIG.phone}`;
    const location = b.mode === 'online' ? 'جلسه آنلاین (لینک ارسال می‌شود)' : `${b.school} / مرکز شمس، کابل`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shams Center//Teacher Empowerment//FA',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:shams-${b.code}-${Date.now()}@shams-center.af`,
      `DTSTAMP:${start}Z`,
      `DTSTART;TZID=Asia/Kabul:${start}`,
      `DTEND;TZID=Asia/Kabul:${end}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shams-booking-${b.code}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error generating .ics file:', err);
  }
}

/**
 * Exports all bookings to CSV file for the administrator.
 */
export function exportBookingsCSV(bookings: Booking[]): void {
  if (!bookings || bookings.length === 0) return;

  const headers = [
    'کد پیگیری',
    'وضعیت',
    'خدمت',
    'گروه هدف',
    'مکتب',
    'ولایت',
    'تعداد',
    'نوعیت',
    'تاریخ',
    'ساعت',
    'شخص رابط',
    'تلفن',
    'واتساپ',
    'یادداشت',
    'زمان ثبت',
  ];

  const rows = bookings.map((b) => [
    b.code,
    b.status || 'pending',
    `"${b.service.replace(/"/g, '""')}"`,
    `"${b.audience.replace(/"/g, '""')}"`,
    `"${b.school.replace(/"/g, '""')}"`,
    `"${b.city.replace(/"/g, '""')}"`,
    b.participants,
    b.mode,
    b.dateISO,
    b.time,
    `"${b.name.replace(/"/g, '""')}"`,
    `"${b.phone}"`,
    b.hasWhatsapp ? 'بلی' : 'نخیر',
    `"${(b.note || '').replace(/"/g, '""')}"`,
    b.createdAt,
  ]);

  const csvString = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shams-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
