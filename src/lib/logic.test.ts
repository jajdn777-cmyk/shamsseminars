import test from 'node:test';
import assert from 'node:assert/strict';
import { toPersianDigits, makeSlots, nextBookableDays, toDateISO } from './date';
import { isAfghanPhone } from './booking';

test('toPersianDigits converts western digits to Persian digits correctly', () => {
  assert.equal(toPersianDigits(12345), '۱۲۳۴۵');
  assert.equal(toPersianDigits('0784996270'), '۰۷۸۴۹۹۶۲۷۰');
  assert.equal(toPersianDigits('SH-1405'), 'SH-۱۴۰۵');
});

test('makeSlots generates 30-minute intervals correctly from 09:00 to 15:30', () => {
  const slots = makeSlots('09:00', '15:30', 30);
  assert.equal(slots[0], '09:00');
  assert.equal(slots[1], '09:30');
  assert.equal(slots[slots.length - 1], '15:30');
  assert.equal(slots.length, 14); // 9:00 to 15:30 inclusive in 30min steps = 14 slots
});

test('nextBookableDays excludes all Fridays', () => {
  const days = nextBookableDays(15, new Date('2026-05-01T08:00:00Z'));
  assert.equal(days.length, 15);
  for (const d of days) {
    // 5 is Friday
    assert.notEqual(d.getDay(), 5, `Expected date ${d.toISOString()} not to be a Friday`);
  }
});

test('toDateISO returns valid YYYY-MM-DD format', () => {
  const d = new Date(2026, 4, 15);
  assert.equal(toDateISO(d), '2026-05-15');
});

test('isAfghanPhone validates 07... numbers correctly', () => {
  assert.equal(isAfghanPhone('0784996270'), true);
  assert.equal(isAfghanPhone('+93784996270'), true);
  assert.equal(isAfghanPhone('0093784996270'), true);
  assert.equal(isAfghanPhone('0799123456'), true);
  assert.equal(isAfghanPhone('0701234567'), true);
  
  // Invalid formats
  assert.equal(isAfghanPhone('12345'), false);
  assert.equal(isAfghanPhone('0202201234'), false); // Kabul landline
  assert.equal(isAfghanPhone(''), false);
  assert.equal(isAfghanPhone('0884996270'), false);
});
