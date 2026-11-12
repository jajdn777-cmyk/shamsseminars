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
      pipeBio: 'بنیانگذار مرکز شمس | استاد پوهنتون و متخصص تعلیم و تربیه | بیش از ۱۵ سال تجربه در آموزش، مدیریت مکتب و رهبری آموزشی',
      tags: ['بنیانگذار مرکز شمس', 'استاد پوهنتون', 'متخصص تعلیم و تربیه', '۱۵+ سال سابقه آموزشی'],
      bio: 'فهیمه شمس، آموزگار، استاد پوهنتون و متخصص تعلیم و تربیه با بیش از ۱۵ سال تجربه در عرصه آموزش و رهبری آموزشی است. او در طول سال‌های کاری خود در بخش‌های تدریس، مدیریت مکتب و آموزش عالی فعالیت داشته است.',
    },
    {
      id: 'nasir-popalzai',
      name: 'نصیراحمد پوپلزی',
      alias: 'ملک محمد پوپل',
      role: 'مشاور ارشد حقوقی و آموزش معارف',
      initials: 'ن.پ',
      photo: '/team/nasir-popalzai.jpg',
      photoPosition: 'object-center',
      badge: '۲۰ سال سابقه معارف',
      degree: 'کارشناسی ارشد حقوق خصوصی | لیسانس حقوق',
      pipeBio: 'کارشناسی ارشد حقوق خصوصی | ۲۰ سال سابقه در معارف | ۸ سال استاد پوهنتون | متخصص حقوق تعلیمی و حاکمیت مکاتب',
      tags: ['۲۰ سال سابقه معارف', '۸ سال استاد پوهنتون', 'کارشناسی ارشد حقوق خصوصی', 'لیسانس حقوق'],
      bio: 'کارشناس ارشد حقوق خصوصی با دو دهه خدمت مستمر در وزارت معارف و ۸ سال تدریس پوهنتونی، متخصص ساختارهای سازمانی و حقوقی مکاتب.',
      linkedinUrl: 'https://www.linkedin.com',
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
      pipeBio: 'ماستر تعلیم و تربیه | مدیر عمومی پیشین منابع بشری معینیت سوادآموزی وزارت معارف | توسعه مسلکی و نیازسنجی آموزشی',
      tags: ['ماستر تعلیم و تربیه', 'مدیر عمومی پیشین منابع بشری معارف', 'ساکن کابل', 'توسعه مسلکی معلمان'],
      bio: 'ماستر تعلیم و تربیه و مدیر عمومی پیشین منابع بشری در معینیت سوادآموزی وزارت معارف، کارشناس توانمندسازی معلمان و ارتقای ظرفیت سازمانی.',
      linkedinUrl: 'https://www.linkedin.com',
      phone: '0786057274',
    },
    {
      id: 'masouda-anwari',
      name: 'استاد مسعوده انوری',
      role: 'عضو علمی دیپارتمنت ادبیات و تربیت معلم',
      initials: 'م.ا',
      photo: '/team/masouda-anwari.jpg',
      photoPosition: 'object-[center_35%]',
      badge: 'رتبه علمی: شوونیار (پوهنیار)',
      degree: 'ماستر زبان و ادبیات فارسی دری و تعلیم و تربیت',
      pipeBio: 'رتبه علمی: شوونیار (پوهنیار) | ماستر زبان و ادبیات فارسی دری و تعلیم و تربیت | عضو علمی ریاست انکشاف مسلکی تربیت معلم | متودولوژی تدریس',
      tags: ['رتبه علمی: شوونیار', 'ماستر زبان و ادبیات دری', 'ماستر تعلیم و تربیت', 'عضو علمی انکشاف مسلکی'],
      bio: 'شوونیار مسعوده انوری، عضو علمی بخش زبان و ادبیات دری در ریاست انکشاف مسلکی تربیت معلم با تمرکز بر روش‌های فعال تدریس و طراحی آموزشی.',
      linkedinUrl: 'https://www.linkedin.com',
    },
    {
      id: 'zabiullah-fazli',
      name: 'استاد ذبیح‌الله فضلی',
      role: 'معاون علمی پوهنتون و متخصص رهبری آموزشی',
      initials: 'ذ.ف',
      photo: '/team/zabiullah-fazli.jpg',
      photoPosition: 'object-[center_25%]',
      badge: 'دانشجوی دکتری | رئیس پیشین پوهنتون',
      degree: 'دانشجوی دکتری مدیریت دولتی | ماستر مدیریت تعلیمی | لیسانس پداگوژی',
      pipeBio: 'دانشجوی دکتری مدیریت دولتی | ماستر مدیریت تعلیمی | لیسانس پداگوژی کابل | معاون علمی پوهنتون هیواد | رئیس پیشین پوهنتون افغان سویس | پژوهشگر رهبری و هوش مصنوعی',
      tags: ['معاون علمی پوهنتون هیواد', 'رئیس پیشین پوهنتون افغان سویس', 'دانشجوی دکتری مدیریت دولتی', 'ماستر مدیریت تعلیمی', 'پژوهشگر هوش مصنوعی و رهبری'],
      bio: 'پژوهشگر و مدرس دانشگاهی، معاون علمی پوهنتون هیواد و رئیس پیشین پوهنتون‌های افغان سویس و ترکستان، مؤلف مقالات علمی در زمینه رهبری مبتنی بر هوش مصنوعی و تضمین کیفیت آموزشی.',
      linkedinUrl: 'https://www.linkedin.com',
    },
  ],
  adminPasscode: 'shams1405',
};
