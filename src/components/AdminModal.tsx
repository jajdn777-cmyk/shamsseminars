import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import {
  Booking,
  loadBookings,
  updateBookingStatus,
  formatBookingCode,
} from '../lib/booking';
import { exportBookingsCSV } from '../lib/send';
import { jalali, toPersianDigits } from '../lib/date';
import {
  X,
  Lock,
  Download,
  CheckCircle,
  XCircle,
  Search,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setBookings(loadBookings());
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === CONFIG.adminPasscode) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setBookings(loadBookings());
    } else {
      setErrorMsg('رمز عبور وارد شده نادرست است.');
    }
  };

  const handleStatusChange = (code: string, status: 'confirmed' | 'cancelled') => {
    updateBookingStatus(code, status);
    setBookings(loadBookings());
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.code.toLowerCase().includes(term) ||
      b.name.toLowerCase().includes(term) ||
      b.school.toLowerCase().includes(term) ||
      b.phone.includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#070E18]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl border border-[#D5CEBE] overflow-hidden text-right">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E6E2D6] flex items-center justify-between bg-[#F5F3EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0D1929] text-[#F59E0B] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#0D1929]">
                دفتر مدیریت درخواست‌های مرکز شمس
              </h3>
              <span className="text-[11px] text-[#596B82]">
                مشاهده و دریافت گزارش نوبت‌ها
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg hover:bg-white text-[#7E8E9E] hover:text-[#0D1929] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-sm mx-auto text-center space-y-4 my-auto">
            <p className="text-xs sm:text-sm text-[#3A4B60]">
              جهت مشاهده پرونده نوبت‌ها، رمز عبور مدیریت را وارد نمایید:
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="رمز عبور..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#D5CEBE] text-center font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                autoFocus
              />

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#0D1929] hover:bg-[#182C44] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                ورود به دفتر
              </button>
            </form>

            <p className="text-[11px] text-[#7E8E9E]">
              رمز پیش‌فرض: <code className="font-mono bg-[#F5F3EC] px-1 py-0.5 rounded">{CONFIG.adminPasscode}</code>
            </p>
          </div>
        ) : (
          <div className="p-6 flex-1 flex flex-col overflow-hidden space-y-4">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو بر اساس نام، مکتب یا شماره..."
                  className="w-full pl-3 pr-9 py-2 rounded-lg border border-[#D5CEBE] text-xs bg-[#FDFCF7] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
                <Search className="w-4 h-4 text-[#7E8E9E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-[#596B82]">
                  مجموع: <b>{toPersianDigits(bookings.length)}</b> مورد
                </span>
                <button
                  onClick={() => exportBookingsCSV(bookings)}
                  disabled={bookings.length === 0}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#14532D] hover:bg-[#166534] text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دریافت اکسل (CSV)</span>
                </button>
              </div>
            </div>

            {/* Bookings Ledger */}
            <div className="flex-1 overflow-y-auto border border-[#E6E2D6] rounded-xl bg-[#FDFCF7]">
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-xs text-[#7E8E9E]">
                  هیچ درخواستی ثبت نشده است.
                </div>
              ) : (
                <div className="divide-y divide-[#E6E2D6] text-xs">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.code}
                      className="p-4 hover:bg-white transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                            {formatBookingCode(b.code)}
                          </span>
                          <span className="font-bold text-[#0D1929]">
                            {b.service}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {b.status === 'confirmed'
                              ? 'تایید شده'
                              : b.status === 'cancelled'
                              ? 'لغو شده'
                              : 'در انتظار هماهنگی'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#596B82]">
                          <span>مکتب: <b>{b.school}</b> ({b.city})</span>
                          <span>شخص رابط: <b>{b.name}</b></span>
                          <span className="font-mono dir-ltr">{b.phone}</span>
                          <span>تاریخ: <b>{jalali(b.dateISO, 'fa')}</b> · ساعت: <b>{toPersianDigits(b.time)}</b></span>
                          <span>گروه: {b.audience} ({toPersianDigits(b.participants)} نفر)</span>
                        </div>

                        {b.note && (
                          <div className="text-[11px] text-[#3A4B60] bg-white p-2 rounded border border-[#E6E2D6] mt-1">
                            یادداشت: {b.note}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleStatusChange(b.code, 'confirmed')}
                          type="button"
                          className="px-2.5 py-1.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>تایید</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(b.code, 'cancelled')}
                          type="button"
                          className="px-2.5 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>لغو</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
