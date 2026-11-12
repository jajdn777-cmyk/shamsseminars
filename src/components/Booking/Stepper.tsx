import React, { useState, useEffect } from 'react';
import { CONTENT, Language } from '../../content';
import { Booking, saveBooking, isAfghanPhone } from '../../lib/booking';
import { sendToSheet } from '../../lib/send';
import { StepService } from './StepService';
import { StepWho } from './StepWho';
import { StepDate } from './StepDate';
import { StepContact } from './StepContact';
import { Summary, BookingFormData } from './Summary';
import { Success } from './Success';
import { ArrowLeft, ArrowRight, Check, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StepperProps {
  currentLang: Language;
  preselectedAudience?: string;
  preselectedTopic?: string;
  onClearPreselections?: () => void;
}

export const Stepper: React.FC<StepperProps> = ({
  currentLang,
  preselectedAudience,
  preselectedTopic,
  onClearPreselections,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const [formData, setFormData] = useState<BookingFormData>({
    service: 'مشوره و نیازسنجی (رایگان)',
    audience: isRtl ? 'مدیران، معاونین و سرمعلمین' : 'Principals, Deputies & Head Teachers',
    school: '',
    city: isRtl ? 'کابل (آغاز فعالیت)' : 'Kabul (Active Operations)',
    participants: 15,
    mode: 'inperson',
    dateISO: '',
    time: '',
    name: '',
    phone: '',
    hasWhatsapp: true,
    note: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedAudience) {
      setFormData((prev) => ({
        ...prev,
        audience: preselectedAudience,
      }));
      setCurrentStep(2);
      onClearPreselections?.();
    }
  }, [preselectedAudience, onClearPreselections]);

  useEffect(() => {
    if (preselectedTopic) {
      setFormData((prev) => ({
        ...prev,
        service: 'ثبت‌نام در سمینار',
        note: isRtl
          ? `علاقه‌مند به سمینار: «${preselectedTopic}»`
          : `Interested in workshop topic: "${preselectedTopic}"`,
      }));
      setCurrentStep(2);
      onClearPreselections?.();
    }
  }, [preselectedTopic, onClearPreselections, isRtl]);

  const updateFormData = (fields: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    const updatedErrors = { ...errors };
    Object.keys(fields).forEach((key) => {
      delete updatedErrors[key];
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.service) {
        newErrors.service = t.booking.errors.service;
      }
    } else if (step === 2) {
      if (!formData.audience) {
        newErrors.audience = t.booking.errors.audience;
      }
      if (!formData.school.trim()) {
        newErrors.school = t.booking.errors.school;
      }
    } else if (step === 3) {
      if (!formData.dateISO) {
        newErrors.dateISO = t.booking.errors.dateISO;
      }
      if (!formData.time) {
        newErrors.time = t.booking.errors.time;
      }
    } else if (step === 4) {
      if (!formData.name.trim()) {
        newErrors.name = t.booking.errors.name;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t.booking.errors.phone;
      } else if (!isAfghanPhone(formData.phone)) {
        newErrors.phone = t.booking.errors.phoneInvalid;
      }
      if (!formData.consent) {
        newErrors.consent = t.booking.errors.consent;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const saved = saveBooking({
        service: formData.service,
        audience: formData.audience,
        school: formData.school,
        city: formData.city,
        participants: formData.participants,
        mode: formData.mode,
        dateISO: formData.dateISO,
        time: formData.time,
        name: formData.name,
        phone: formData.phone,
        hasWhatsapp: formData.hasWhatsapp,
        note: formData.note,
      });

      sendToSheet(saved).catch((err) => console.log('Sheets hook notice:', err));
      setCompletedBooking(saved);
    } catch (err: any) {
      setErrors({ form: err?.message || t.booking.errors.form });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCompletedBooking(null);
    setCurrentStep(1);
    setFormData({
      service: 'مشوره و نیازسنجی (رایگان)',
      audience: isRtl ? 'مدیران، معاونین و سرمعلمین' : 'Principals, Deputies & Head Teachers',
      school: '',
      city: isRtl ? 'کابل (آغاز فعالیت)' : 'Kabul (Active Operations)',
      participants: 15,
      mode: 'inperson',
      dateISO: '',
      time: '',
      name: '',
      phone: '',
      hasWhatsapp: true,
      note: '',
      consent: false,
    });
    setErrors({});
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-transparent border-b border-[#E8E2D4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with On-Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-start"
        >
          <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#B45309] rounded-full" />
            <span>{t.booking.kicker}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.booking.title}
          </h2>
          <p className="text-[#5E7086] text-sm sm:text-base mt-2">
            {t.booking.subtitle}
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Executive Ledger Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto celestial-card rounded-3xl p-6 sm:p-10 border border-[#D2C9B6] shadow-md relative"
        >
          {completedBooking ? (
            <Success
              booking={completedBooking}
              onReset={handleReset}
              currentLang={currentLang}
            />
          ) : (
            <div>
              {/* Stepper Progress Bar */}
              <div className="mb-8 pb-6 border-b border-[#E8E2D4]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-start">
                  {t.booking.steps.map((st, index) => {
                    const stepNumber = index + 1;
                    const isDone = currentStep > stepNumber;
                    const isActive = currentStep === stepNumber;

                    return (
                      <div
                        key={st.num}
                        onClick={() => {
                          if (stepNumber < currentStep) setCurrentStep(stepNumber);
                        }}
                        className={`p-3 rounded-2xl border text-xs transition-all select-none ${
                          stepNumber < currentStep ? 'cursor-pointer hover:border-[#B45309]' : ''
                        } ${
                          isActive
                            ? 'bg-[#0B1524] border-[#0B1524] text-white font-bold shadow-md'
                            : isDone
                            ? 'bg-[#F6F3EB] border-[#D2C9B6] text-[#0B1524]'
                            : 'bg-transparent border-transparent text-[#7E8E9E]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                              isActive
                                ? 'bg-gradient-to-br from-[#B45309] to-[#D97706] text-white shadow-xs'
                                : isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-200 text-[#5E7086]'
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : st.num}
                          </span>
                          <span className="truncate">{st.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Two-Column Form & Ledger Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Steps with Animated Transitions */}
                <div className="lg:col-span-8">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentStep === 1 && (
                          <StepService
                            currentValue={formData.service}
                            onSelect={(service) => updateFormData({ service })}
                            error={errors.service}
                            currentLang={currentLang}
                          />
                        )}

                        {currentStep === 2 && (
                          <StepWho
                            audience={formData.audience}
                            school={formData.school}
                            city={formData.city}
                            participants={formData.participants}
                            onChange={updateFormData}
                            errors={errors}
                            currentLang={currentLang}
                          />
                        )}

                        {currentStep === 3 && (
                          <StepDate
                            dateISO={formData.dateISO}
                            time={formData.time}
                            mode={formData.mode}
                            onChange={updateFormData}
                            errors={errors}
                            currentLang={currentLang}
                          />
                        )}

                        {currentStep === 4 && (
                          <StepContact
                            name={formData.name}
                            phone={formData.phone}
                            hasWhatsapp={formData.hasWhatsapp}
                            note={formData.note}
                            consent={formData.consent}
                            onChange={updateFormData}
                            errors={errors}
                            currentLang={currentLang}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {errors.form && (
                      <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                        {errors.form}
                      </div>
                    )}

                    {/* Step Navigation Controls */}
                    <div className="mt-8 pt-5 border-t border-[#E8E2D4] flex items-center justify-between gap-3">
                      {currentStep > 1 ? (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-2.5 rounded-xl border border-[#D2C9B6] hover:bg-[#F6F3EB] text-[#0B1524] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ArrowRight className={`w-4 h-4 ${isRtl ? 'rtl:rotate-0' : 'rotate-180'}`} />
                          <span>{t.booking.prevBtn}</span>
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 4 ? (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-2.5 rounded-xl bg-[#0B1524] hover:bg-[#162944] text-white text-xs sm:text-sm font-bold shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <span>{t.booking.nextBtn}</span>
                          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rtl:rotate-0' : 'rotate-180'}`} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#B45309] to-[#D97706] text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <span>
                            {isSubmitting
                              ? t.booking.step4.submittingBtn
                              : t.booking.step4.submitBtn}
                          </span>
                        </motion.button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Sidebar Ledger Summary */}
                <div className="lg:col-span-4">
                  <Summary formData={formData} currentLang={currentLang} />
                </div>

              </div>
            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
};
