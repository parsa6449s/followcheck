import React, { useMemo, useState } from 'react'
import {
  Users, UserRoundMinus, ChartNoAxesCombined, ShieldCheck, Upload,
  Instagram, Languages, Search, ChevronLeft, FileUp, Sparkles, Heart,
  ArrowUpRight, CircleHelp
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'

const copy = {
  fa: {
    eyebrow: 'ابزار هوشمند اینستاگرام', title: 'فالوورهایت را بهتر بشناس',
    subtitle: 'فهرست‌ها را مقایسه کن و تغییرات را در طول زمان ببین.',
    connect: 'اتصال رسمی اینستاگرام', upload: 'بارگذاری فایل اطلاعات اینستاگرام',
    uploadSub: 'فایل ZIP یا JSON صادرشده از Instagram', followers: 'فالوورها',
    following: 'فالووینگ', unfollowers: 'آنفالوهای شناسایی‌شده',
    overview: 'نمای کلی', activity: 'تغییرات اخیر', people: 'فهرست‌ها',
    privacy: 'حریم خصوصی', privacyText: 'رمز عبور اینستاگرام را وارد نکن. این نسخه نمایشی هنوز داده‌ای را به سرور ارسال نمی‌کند.',
    emptyTitle: 'هنوز داده‌ای اضافه نشده', emptyText: 'برای شروع، فایل اطلاعات خود را از Instagram بارگذاری کن.',
    choose: 'انتخاب فایل', sample: 'نمایش نمونه داشبورد', sampleOn: 'حالت نمونه فعال است',
    sampleNote: 'این اعداد نمونه‌اند و اطلاعات واقعی حساب تو نیستند.',
    last30: '۳۰ روز گذشته', notBack: 'فالو‌بک‌نکرده‌ها', language: 'EN',
    status: 'آماده برای دریافت فایل', footer: 'ساخته‌شده با تمرکز بر حریم خصوصی',
    uploaded: 'فایل انتخاب شد', invalid: 'لطفاً یک فایل ZIP یا JSON انتخاب کن.',
    imported: 'فایل انتخاب شد. پردازش واقعی ZIP در مرحله بعد اضافه می‌شود.',
    exportHelp: 'در Instagram: Accounts Center → Your information and permissions → Export your information'
  },
  en: {
    eyebrow: 'Instagram companion', title: 'Understand your followers',
    subtitle: 'Compare lists and track changes over time.',
    connect: 'Official Instagram connection', upload: 'Upload Instagram data',
    uploadSub: 'ZIP or JSON exported from Instagram', followers: 'Followers',
    following: 'Following', unfollowers: 'Detected unfollows',
    overview: 'Overview', activity: 'Recent activity', people: 'Lists',
    privacy: 'Privacy first', privacyText: 'Never enter your Instagram password. This demo does not upload your data to a server.',
    emptyTitle: 'No data added yet', emptyText: 'Upload your Instagram data export to get started.',
    choose: 'Choose file', sample: 'Preview sample dashboard', sampleOn: 'Sample mode is on',
    sampleNote: 'These are sample numbers, not your real account data.',
    last30: 'Last 30 days', notBack: 'Not following back', language: 'فا',
    status: 'Ready for data import', footer: 'Built with privacy in mind',
    uploaded: 'File selected', invalid: 'Choose a ZIP or JSON file.',
    imported: 'File selected. ZIP parsing will be added in the next step.',
    exportHelp: 'Instagram: Accounts Center → Your information and permissions → Export your information'
  }
}

const sampleData = [
  { day: 'Apr 1', followers: 1120 }, { day: 'Apr 5', followers: 1136 },
  { day: 'Apr 9', followers: 1128 }, { day: 'Apr 13', followers: 1155 },
  { day: 'Apr 17', followers: 1164 }, { day: 'Apr 21', followers: 1179 },
  { day: 'Apr 25', followers: 1171 }, { day: 'Apr 30', followers: 1194 }
]

export default function App() {
  const [lang, setLang] = useState('fa')
  const [sample, setSample] = useState(false)
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')
  const t = copy[lang]
  const rtl = lang === 'fa'

  const stats = useMemo(() => sample
    ? [{ label: t.followers, value: '1,248', icon: Users, tone: 'blue' },
       { label: t.following, value: '386', icon: Users, tone: 'green' },
       { label: t.unfollowers, value: '12', icon: UserRoundMinus, tone: 'rose' }]
    : [{ label: t.followers, value: '—', icon: Users, tone: 'blue' },
       { label: t.following, value: '—', icon: Users, tone: 'green' },
       { label: t.unfollowers, value: '—', icon: UserRoundMinus, tone: 'rose' }],
    [sample, t])

  function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!/\.(zip|json)$/i.test(file.name)) {
      setMessage(t.invalid)
      return
    }
    setFileName(file.name)
    setMessage(t.imported)
  }

  return (
    <main className="app-shell" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="topbar">
        <a className="brand" href="#" aria-label="FollowCheck home">
          <span className="brand-mark"><Instagram size={21} /></span>
          <span>FollowCheck</span>
        </a>
        <button className="language-button" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}>
          <Languages size={17} /> {t.language}
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> {t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-actions">
            <label className="button button-primary">
              <Upload size={18} /> {t.upload}
              <input type="file" accept=".zip,.json,application/zip,application/json" onChange={handleFile} hidden />
            </label>
            <button className="button button-secondary" onClick={() => { setSample(!sample); setMessage('') }}>
              <ChartNoAxesCombined size={18} /> {sample ? t.sampleOn : t.sample}
            </button>
          </div>
          {fileName && <div className="file-pill"><FileUp size={15} /> {t.uploaded}: {fileName}</div>}
          {message && <p className="notice" role="status">{message}</p>}
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="profile-card">
            <div className="profile-icon"><Instagram size={30} /></div>
            <div className="profile-lines"><i /><i /><i /></div>
            <div className="mini-stats"><span /><span /><span /></div>
            <div className="sparkline"><span /><span /><span /><span /><span /><span /><span /></div>
          </div>
          <div className="floating-badge"><Heart size={16} fill="currentColor" /> {rtl ? 'حریم خصوصی مهم است' : 'Privacy matters'}</div>
        </div>
      </section>

      <section className="stats-grid" aria-label={t.overview}>
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <article className={`stat-card ${tone}`} key={label}>
            <div className="stat-top"><span className="stat-icon"><Icon size={19} /></span><ArrowUpRight size={16} className="muted-icon" /></div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
            {!sample && <span className="pending-tag">{rtl ? 'پس از ورود داده' : 'Awaiting data'}</span>}
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div><h2>{t.activity}</h2><p>{t.last30}</p></div>
            <span className="panel-icon"><ChartNoAxesCombined size={18} /></span>
          </div>
          {sample ? (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={sampleData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                  <defs><linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6478f5" stopOpacity={0.25}/><stop offset="95%" stopColor="#6478f5" stopOpacity={0.02}/></linearGradient></defs>
                  <CartesianGrid stroke="#edf0f7" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8992aa', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8992aa', fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8ebf4', fontSize: 12 }} />
                  <Area type="monotone" dataKey="followers" stroke="#6478f5" strokeWidth={3} fill="url(#fillBlue)" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="sample-caption">{t.sampleNote}</p>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><ChartNoAxesCombined size={25} /></div>
              <h3>{t.emptyTitle}</h3><p>{t.emptyText}</p>
              <label className="text-button">{t.choose}<input type="file" accept=".zip,.json" onChange={handleFile} hidden /></label>
            </div>
          )}
        </article>

        <article className="panel privacy-panel">
          <div className="panel-heading">
            <div><h2>{t.privacy}</h2><p>{t.status}</p></div>
            <span className="shield-icon"><ShieldCheck size={20} /></span>
          </div>
          <p className="privacy-copy">{t.privacyText}</p>
          <div className="export-box">
            <div className="export-icon"><CircleHelp size={18} /></div>
            <div><strong>{rtl ? 'از کجا فایل بگیرم؟' : 'Where do I get the export?'}</strong><p>{t.exportHelp}</p></div>
          </div>
          <div className="secure-note"><ShieldCheck size={16} /> {rtl ? 'هیچ رمز عبوری لازم نیست' : 'No password required'}</div>
        </article>
      </section>

      <footer className="footer">
        <span><span className="footer-dot" /> {t.footer}</span>
        <span>FollowCheck · Beta</span>
      </footer>
    </main>
  )
}