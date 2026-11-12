import { toPersianDigits } from './date';

export type BookingMode = 'online' | 'inperson';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  code: string;
  service: string;
  audience: string;
  school: string;
  city: string;
  participants: number;
  mode: BookingMode;
  dateISO: string;
  time: string;
  name: string;
  phone: string;
  hasWhatsapp?: boolean;
  note?: string;
  createdAt: string;
  status?: BookingStatus;
}

const STORAGE_KEY = 'shams.bookings.v1';

export function loadBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load bookings from localStorage:', err);
    return [];
  }
}

export function isTaken(dateISO: string, time: string): boolean {
  const all = loadBookings();
  return all.some(
    (b) => b.dateISO === dateISO && b.time === time && b.status !== 'cancelled'
  );
}

export function saveBooking(data: Omit<Booking, 'code' | 'createdAt'>): Booking {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const code = `SH-${randomSuffix}`;
  const fullBooking: Booking = {
    ...data,
    code,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  const current = loadBookings();
  const updated = [...current, fullBooking];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving booking to localStorage:', err);
    throw new Error('عدم توانایی در ذخیره درخواست در حافظه محلی مرورگر.');
  }

  return fullBooking;
}

export function updateBookingStatus(code: string, status: BookingStatus): boolean {
  const current = loadBookings();
  const index = current.findIndex((b) => b.code === code);
  if (index === -1) return false;
  current[index].status = status;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates Afghan mobile phone number:
 * Acceptable formats:
 * - 07XXXXXXXX (10 digits starting with 07)
 * - +937XXXXXXXX or 00937XXXXXXXX
 * - 7XXXXXXXX (9 digits starting with 7)
 */
export function isAfghanPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Match +93 7X XXX XXXX, 0093 7X XXX XXXX, 07X XXX XXXX, or 7X XXX XXXX
  return /^(\+93|0093|0)?7[0-9]{8}$/.test(cleaned);
}

/**
 * Returns formatted code in Persian digits: e.g. SH-۴۸۲۷
 */
export function formatBookingCode(code: string): string {
  if (!code.startsWith('SH-')) return toPersianDigits(code);
  const numPart = code.replace('SH-', '');
  return `SH-${toPersianDigits(numPart)}`;
}
