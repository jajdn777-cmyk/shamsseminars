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
    alias?: string;
    role: string;
    initials: string;
    bio: string;
    badge: string;
    photo: string;
    photoPosition?: string;
    degree: string;
    pipeBio: string;
    tags: string[];
    linkedinUrl?: string;
    phone?: string;
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
      id: 'fahima-shams',
      name: 'فهیمه شمس',
      role: 'بنیانگذار مرکز توانمندسازی معلمان شمس',
      initials: 'ف.ش',
      photo: '/team/fahima-shams.jpg',
      photoPosition: 'object-[center_20%]',
      badge: 'بنیانگذار | ۱۵+ سال تجربه',
      degree: 'متخصص تعلیم و تربیه و استاد پوهنتون',
      pipeBio: 'بنیانگذار مرکز شمس | استاد پوهنتون و متخصص تعلیم و تربیه | بیش از ۱۵ سال تجربه در آموزش، مدیریت مکتب و آموزش عالی',
      tags: ['بنیانگذار مرکز شمس', 'استاد پوهنتون', 'متخصص تعلیم و تربیه', '۱۵+ سال سابقه'],
      bio: 'فهیمه شمس، آموزگار، استاد پوهنتون و متخصص تعلیم و تربیه با بیش از ۱۵ سال تجربه در عرصه آموزش و رهبری آموزشی است. او در طول سال‌های کاری خود در بخش‌های تدریس، مدیریت مکتب و آموزش عالی فعالیت داشته است.',
    },
    {
      id: 'zabiullah-fazli',
      name: 'ذبیح‌الله فضلی',
      role: 'معاون علمی پوهنتون و متخصص رهبری آموزشی',
      initials: 'ذ.ف',
      photo: '/team/zabiullah-fazli.jpg',
      photoPosition: 'object-[center_25%]',
      badge: 'دانشجوی دکتری | رئیس پیشین پوهنتون',
      degree: 'دانشجوی دکتری مدیریت دولتی | ماستر مدیریت تعلیمی',
      pipeBio: 'دانشجوی دکتری مدیریت دولتی | ماستر مدیریت تعلیمی | معاون علمی پوهنتون هیواد | رئیس پیشین پوهنتون افغان سویس',
      tags: ['معاون علمی پوهنتون هیواد', 'رئیس پیشین پوهنتون افغان سویس', 'دانشجوی دکتری مدیریت دولتی', 'ماستر مدیریت تعلیمی'],
      bio: 'ذبیح‌الله فضلی، معاون علمی پوهنتون، پژوهشگر و متخصص رهبری آموزشی، دارای مدرک ماستری مدیریت تعلیمی و دانشجوی دکتری مدیریت دولتی.',
    },
    {
      id: 'nasir-popalzai',
      name: 'نصیراحمد پوپلزی',
      alias: 'ملک محمد پوپل',
      role: 'مشاور حقوقی و عضو ارشد مرکز شمس',
      initials: 'ن.پ',
      photo: '/team/nasir-popalzai.jpg',
      photoPosition: 'object-center',
      badge: '۲۰ سال تجربه معارف',
      degree: 'کارشناسی ارشد حقوق خصوصی | لیسانس حقوق',
      pipeBio: 'کارشناسی ارشد حقوق خصوصی و لیسانس حقوق | ۲۰ سال تجربه کاری در معارف | متخصص حقوق تعلیمی و ارتقای کیفیت آموزش',
      tags: ['۲۰ سال تجربه معارف', 'کارشناسی ارشد حقوق خصوصی', 'لیسانس حقوق', 'مشاور حقوقی مرکز شمس'],
      bio: 'دارای مدرک لیسانس حقوق و کارشناسی ارشد حقوق خصوصی، با بیست سال تجربه کاری در عرصه معارف. ایشان با برخورداری از دانش تخصصی حقوقی و تجارب ارزشمند در حوزه معارف، از اعضای تیم مرکز توانمندسازی معلمان شمس بوده و در راستای تحقق اهداف آموزشی همکاری خواهند کرد.',
    },
    {
      id: 'masouda-anwari',
      name: 'استاد مسعوده انوری',
      role: 'عضو علمی و همکار مرکز توانمندسازی معلمان شمس',
      initials: 'م.ا',
      photo: '/team/masouda-anwari.jpg',
      photoPosition: 'object-[center_35%]',
      badge: 'شوونیار (پوهنیار) | ماستر ادبیات',
      degree: 'ماستر زبان و ادبیات فارسی دری و تعلیم و تربیه',
      pipeBio: 'شوونیار (پوهنیار) | ماستر زبان و ادبیات فارسی دری و تعلیم و تربیت | عضو علمی ریاست انکشاف مسلکی تربیت معلم',
      tags: ['درجه علمی: شوونیار', 'ماستر زبان و ادبیات دری', 'عضو علمی انکشاف مسلکی', 'همکار مرکز شمس'],
      bio: 'مسعوده انوری، شوونیار و دارای درجه ماستری در رشته زبان و ادبیات فارسی دری و تعلیم و تربیه است. وی در حال حاضر به‌عنوان عضو علمی بخش زبان و ادبیات دری در ریاست انکشاف مسلکی تربیت معلم فعالیت دارد.',
    },
    {
      id: 'hakima-karimi',
      name: 'حکیمه کریمی',
      role: 'مدیر توسعه منابع بشری و آموزش',
      initials: 'ح.ک',
      photo: '/team/hakima-karimi.jpg',
      photoPosition: 'object-[center_55%]',
      badge: 'ماستر تعلیم و تربیه',
      degree: 'ماستر تعلیم و تربیه',
      pipeBio: 'ماستر تعلیم و تربیه | مدیر عمومی پیشین منابع بشری معینیت سوادآموزی وزارت معارف | متخصص برنامه‌های آموزشی',
      tags: ['ماستر تعلیم و تربیه', 'مدیر عمومی پیشین منابع بشری معارف', 'توسعه برنامه‌های آموزشی', 'همکار مرکز شمس'],
      bio: 'دارای مدرک ماستری در رشته تعلیم و تربیه و از مدیران پیشین عمومی منابع بشری معینیت سوادآموزی وزارت معارف افغانستان. ایشان در پیشبرد برنامه‌های آموزشی و تحقق اهداف مرکز شمس نقش ارزنده‌ای ایفا می‌نمایند.',
      phone: '0786057274',
    },
  ],
  adminPasscode: 'shams1405',
};
