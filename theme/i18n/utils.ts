import config from '../../src/config/config.json';
import indexTranslations from '../../src/i18n/index.json';
import faqsTranslations from '../../src/i18n/faqs.json';

import otherTranslations from './translations/other.json';

export const languageMap: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी',
  es: 'Español',
  ru: 'Русский',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  bn: 'বাংলা',
  ja: '日本語',
  ko: '한국어',
  ms: 'Malay',
  pl: 'Polski',
  id: 'Indonesia',
  ar: 'العربية',
  bg: 'Български',
  tr: 'Türkçe',
  sv: 'Svenska',
  ur: 'اردو',
};

export const localeToOG: Record<Locale, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  es: 'es_ES',
  ru: 'ru_RU',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  bn: 'bn_BD',
  ja: 'ja_JP',
  ko: 'ko_KR',
  ms: 'ms_MY',
  pl: 'pl_PL',
  id: 'id_ID',
  ar: 'ar_SA',
  bg: 'bg_BG',
  tr: 'tr_TR',
  sv: 'sv_SE',
};

export type Locale = keyof typeof languageMap;

export const locales: Locale[] = Object.keys(languageMap) as Locale[];
const configuredLocale = config.site.language as Locale | undefined;
export const defaultLocale: Locale = locales.includes(configuredLocale as Locale) ? (configuredLocale as Locale) : 'en'; // 'en' for backwards compatibility

const resolveLocale = (locale?: Locale | string): Locale => (locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale);

// Get all translations for a given locale
export function getTranslations(locale?: Locale | string) {
  const safeLocale = resolveLocale(locale);
  const indexData = (indexTranslations as any)[safeLocale];
  const otherData = (otherTranslations as any)[safeLocale];
  const faqsData = (faqsTranslations as any)[safeLocale];

  return {
    ...indexData,
    ...otherData,
    ...faqsData,
  };
}

// Generate localized URL
export function getLocalizedUrl(path: string, locale?: Locale | string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const safeLocale = resolveLocale(locale);

  // For default locale, don't prefix with locale
  if (safeLocale === defaultLocale) {
    return '/' + cleanPath;
  }

  return `/${safeLocale}/${cleanPath}`;
}
