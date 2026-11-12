export interface AppConfig {
  brand: string;
  short: string;
  proposalNote: string;
  phone: string;
  whatsapp: string; // international format without + sign
  address: string;
  hours: string;
  email: string;
  slot: {
    start: string;
    end: string;
    stepMin: number;
  };
  sheetWebhookUrl: string; // Google Apps Script web app URL (optional)
  social: {
    instagram: string;
    tiktok: string;
    threads: string;
    telegram?: string;
  };
  provinces: string[];
  team: {
    id: string;
    name: string;
    role: string;
    initials: string;
    bio: string;
    badge: string;
  }[];
  adminPasscode: string; // For local admin booking viewer
}

export const CONFIG: AppConfig = {
  brand: 'مرکز توانمندسازی معلمان شمس',
  short: 'مرکز شمس',
  proposalNote: 'طرح پیشنهادی برای وزارت معارف',
  phone: '0784996270',
  whatsapp: '93784996270',
  address: 'کابل، افغانستان',
  hours: 'شنبه تا پنج‌شنبه، ۰۹:۰۰ الی ۱۶:۰۰ (جمعه رخصتی)',
  email: 'info@shams-center.af',
  slot: {
    start: '09:00',
    end: '15:30',
    stepMin: 30,
  },
  sheetWebhookUrl: '', // URL وب‌هوک Google Apps Script برای ثبت خودکار در شیت
  social: {
    instagram: 'https://instagram.com',
    tiktok: '',
    threads: '',
    telegram: '',
  },
  provinces: [
    'کابل (آغاز فعالیت)',
    'هرات',
    'بلخ (مزار شریف)',
    'ننگرهار (جلال‌آباد)',
    'کندهار',
    'بامیان',
    'غزنی',
    'کندز',
    'بغلان',
    'پروان',
    'کاپیسا',
    'سایر ولایات',
  ],
  team: [
    {
      id: 'member-1',
      name: 'فهیمه شمس',
      role: 'مسئول پیشنهادی مرکز',
      initials: 'ف.ش',
      bio: 'متخصص برنامه‌ریزی درسی و رهبری آموزشی با سال‌ها تجربه در نظارت و ارتقای ظرفیت معلمین مکاتب خصوصی و معارف.',
      badge: 'مدیریت و طرح',
    },
    {
      id: 'member-2',
      name: 'استاد رحیمی (نام نمونه)',
      role: 'ترینر ارشد روش‌های نوین تدریس',
      initials: 'ا.ر',
      bio: 'سابقه تدریس و برگزاری ده‌ها دوره آموزشی در حوزه مدیریت صنف، روانشناسی یادگیری و تدریس فعال.',
      badge: 'به‌زودی تکمیل می‌شود',
    },
    {
      id: 'member-3',
      name: 'استاد احمدی (نام نمونه)',
      role: 'متخصص منجمنت و نظارت آموزشی',
      initials: 'ا.ا',
      bio: 'کارشناس ارشد مدیریت تعلیمی با تمرکز بر حل چالش‌های اداری، توانمندسازی سرمعلمین و تدوین شاخص‌های ارزیابی.',
      badge: 'به‌زودی تکمیل می‌شود',
    },
  ],
  adminPasscode: 'shams1405',
};
