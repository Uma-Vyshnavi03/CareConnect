"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, User, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, setStep } = useDemo();
  const { profile, user } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = profile?.firstName || user?.user_metadata?.first_name || 'Patient';
  const isLoggedIn = Boolean(user || profile);
  const isAuthScreen = currentStep === 'LANDING' || currentStep === 'SIGN_UP' || currentStep === 'LOG_IN' || currentStep === 'FORGOT_PASSWORD';

  const navigateTo = (step: 'LOG_IN' | 'SIGN_UP') => {
    setStep(step);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative sticky top-0 z-40 border-b border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-6 flex h-16 max-w-full items-center justify-between gap-4 px-4">
        {/* Brand logo & name */}
        <button
          onClick={() => setStep(isLoggedIn ? 'DASHBOARD' : 'LANDING')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <img
            src="/logo.svg"
            alt="CareConnect Logo"
            className="h-10 w-10 rounded-xl object-contain shadow-xs transition-transform group-hover:scale-105"
          />
          <img
            src="/CareConnect Logo Dark.png"
            alt="CareConnect Logo"
            className="hidden h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-102 dark:block sm:h-9"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">CareConnect</span>
            </div>
            <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">{t.nav.subtitle}</p>
          </div>
        </button>

        {!isAuthScreen || isLoggedIn ? (
          <button
            onClick={() => setStep('PROFILE')}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition shadow-xs ${
              currentStep === 'PROFILE'
                ? 'bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300 font-bold ring-2 ring-brand-400/20'
                : 'bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-650 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
            }`}
            title="View Profile & Account Settings"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-xs font-extrabold text-white shadow-xs">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <span className="hidden max-w-[120px] truncate text-xs font-bold sm:inline">{displayName}</span>
            <User className="h-4 w-4 text-slate-500 dark:text-slate-400 sm:hidden" />
          </button>
        ) : (
          <>
            {/* Desktop public navigation */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => navigateTo('LOG_IN')}
                className="rounded-lg px-3 py-2 text-xs font-bold text-slate-700 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => navigateTo('SIGN_UP')}
                className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-brand-500"
              >
                {t.nav.signup}
              </button>
            </div>

            {/* Mobile public navigation */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={isMobileMenuOpen ? 'Close account menu' : 'Open account menu'}
              aria-expanded={isMobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 sm:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </>
        )}
      </div>

      {!isLoggedIn && isAuthScreen && isMobileMenuOpen && (
        <div className="absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:hidden">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigateTo('LOG_IN')}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {t.nav.login}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('SIGN_UP')}
              className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-500"
            >
              {t.nav.signup}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};