import React, { useMemo, useState } from 'react'
import JSZip from 'jszip'
import {
  Users, UserRoundMinus, ChartNoAxesCombined, ShieldCheck, Upload,
  Instagram, Languages, FileUp, Sparkles, Heart, ArrowUpRight, CircleHelp
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'

const copy = {
  fa: {
    eyebrow: 'ابزار هوشمند اینستاگرام', title: 'فالوورهایت را بهتر بشناس',
    subtitle: 'فهرست‌ها را مقایسه کن و تغییرات را در طول زمان ببین.',
    upload: 'بارگذاری فایل اطلاعات اینستاگرام', followers: 'فالوورها',
    following: 'فالووینگ', unfollowers: 'فالو‌بک‌نکرده‌ها',
    overview: 'نمای کلی', activity: 'تغییرات اخیر', privacy: 'حریم خصوصی',
    privacyText: 'رمز عبور اینستاگرام را وارد نکن. فایل در همین مرورگر پردازش می‌شود.',
    emptyTitle: 'هنوز داده‌ای اضافه نشده', emptyText: 'فایل ZIP اطلاعات اینستاگرام را که شامل followers و following باشد بارگذاری کن.',
    choose: 'انتخاب فایل', sample: 'نمایش نمونه داشبورد', sampleOn: 'حالت نمونه فعال است',
    sampleNote: 'این اعداد نمونه‌اند و اطلاعات واقعی حساب تو نیستند.',
    last30: 'تاریخچه در این نسخه ثبت نشده', notBack: 'فالو‌بک‌نکرده‌ها', language: 'EN',
    status: 'پردازش محلی فایل', footer: 'ساخته‌شده با تمرکز بر حریم خصوصی',
    uploaded: 'فایل پردازش شد', invalid: 'لطفاً فایل ZIP یا JSON معتبر انتخاب کن.',
    imported: 'فایل خوانده شد.', exportHelp: 'Instagram: Accounts Center → Your information and permissions → Export your information',
    parsing: 'در حال بررسی فایل…', noLists: 'فهرست followers و following در ZIP پیدا نشد. خروجی JSON اینستاگرام را انتخاب کن.',
    badJson: 'ساختار JSON قابل شناسایی نیست. لطفاً ZIP کامل اطلاعات اینستاگرام را بارگذاری کن.',
    results: 'نتایج مقایسه', search: 'جست‌وجوی نام کاربری…', noResults: 'نتیجه‌ای پیدا نشد',
    privateNote: 'این مقایسه فقط بر اساس فهرست‌های موجود در فایل خروجی است؛ آنفالوهای تاریخی بدون فایل قدیمی‌تر قابل تشخیص نیستند.'
  },
  en: {
    eyebrow: 'Instagram companion', title: 'Understand your followers',
    subtitle: 'Compare lists and track changes over time.', upload: 'Upload Instagram data',
    followers: 'Followers', following: 'Following', unfollowers: 'Not following back',
    overview: 'Overview', activity: 'Recent activity', privacy: 'Privacy first',
    privacyText: 'Never enter your Instagram password. Files are processed locally in this browser.',
    emptyTitle: 'No data added yet', emptyText: 'Upload the Instagram ZIP export containing followers and following lists.',
    choose: 'Choose file', sample: 'Preview sample dashboard', sampleOn: 'Sample mode is on',
    sampleNote: 'These are sample numbers, not your real account data.',
    last30: 'No history saved in this version', notBack: 'Not following back', language: 'فا',
    status: 'Local file processing', footer: 'Built with privacy in mind',
    uploaded: 'File processed', invalid: 'Choose a valid ZIP or JSON file.',
    imported: 'File read successfully.', exportHelp: 'Instagram: Accounts Center → Your information and permissions → Export your information',
    parsing: 'Reading file…', noLists: 'Could not find both followers and following lists in this ZIP. Choose the Instagram JSON export.',
    badJson: 'Unrecognized JSON structure. Please upload the full Instagram ZIP export.',
    results: 'Comparison results', search: 'Search username…', noResults: 'No matches found',
    privateNote: 'Results compare only the lists in this export. Historical unfollows require an older saved export.'
  }
}

const sampleData = [
  { day: 'Apr 1', followers: 1120 }, { day: 'Apr 5', followers: 1136 },
  { day: 'Apr 9', followers: 1128 }, { day: 'Apr 13', followers: 1155 },
  { day: 'Apr 17', followers: 1164 }, { day: 'Apr 21', followers: 1179 },
  { day: 'Apr 25', followers: 1171 }, { day: 'Apr 30', followers: 1194 }
]

function collectUsernames(value, kind = '') {
  const found = []
  const seen = new Set()
  const add = (name) => {
    if (typeof name !== 'string') return
    const cleaned = name.trim().replace(/^@/, '')
    if (!cleaned || cleaned.includes(' ') || seen.has(cleaned.toLowerCase())) return
    seen.add(cleaned.toLowerCase())
    found.push(cleaned)
  }
  const walk = (node) => {
    if (Array.isArray(node)) { node.forEach(walk); return }
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node.string_list_data)) {
      const entry = node.string_list_data.find(x => x && typeof x.value === 'string')
      if (entry) add(entry.value)
      else if (typeof node.title === 'string') add(node.title)
    } else if (typeof node.username === 'string') add(node.username)
    else if (typeof node.value === 'string' && (node.href || /follow|user|relationship/i.test(kind))) add(node.value)
    Object.entries(node).forEach(([key, child]) => {
      if (key !== 'string_list_data') walk(child)
    })
  }
  walk(value)
  return found
}

function classifyJson(json, path = '') {
  const lower = `${path} ${JSON.stringify(Object.keys(json || {}))}`.toLowerCase()
  if (Array.isArray(json)) {
    if (/follower/.test(path)) return { followers: collectUsernames(json, 'followers') }
    if (/following/.test(path)) return { following: collectUsernames(json, 'following') }
  }
  if (json && typeof json === 'object') {
    if (Array.isArray(json.relationships_following)) return { following: collectUsernames(json.relationships_following, 'following') }
    if (Array.isArray(json.followers)) return { followers: collectUsernames(json.followers, 'followers') }
    if (Array.isArray(json.following)) return { following: collectUsernames(json.following, 'following') }
    if (Array.isArray(json.relationships_followers)) return { followers: collectUsernames(json.relationships_followers, 'followers') }
    if (/follower/.test(path)) return { followers: collectUsernames(json, 'followers') }
    if (/following/.test(path)) return { following: collectUsernames(json, 'following') }
  }
  return {}
}

export default function App() {
  const [lang, setLang] = useState('fa')
  const [sample, setSample] = useState(false)
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [query, setQuery] = useState('')
  const t = copy[lang]
  const rtl = lang === 'fa'
  const notFollowingBack = useMemo(() => {
    const followerSet = new Set(followers.map(x => x.toLowerCase()))
    return following.filter(x => !followerSet.has(x.toLowerCase()))
  }, [followers, following])
  const stats = useMemo(() => sample
    ? [{ label: t.followers, value: '1,248', icon: Users, tone: 'blue' }, { label: t.following, value: '386', icon: Users, tone: 'green' }, { label: t.unfollowers, value: '12', icon: UserRoundMinus, tone: 'rose' }]
    : [{ label: t.followers, value: followers.length ? followers.length.toLocaleString() : '—', icon: Users, tone: 'blue' }, { label: t.following, value: following.length ? following.length.toLocaleString() : '—', icon: Users, tone: 'green' }, { label: t.unfollowers, value: following.length || followers.length ? notFollowingBack.length.toLocaleString() : '—', icon: UserRoundMinus, tone: 'rose' }],
  [sample, t, followers, following, notFollowingBack])

  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!/\.(zip|json)$/i.test(file.name)) { setMessage(t.invalid); return }
    setLoading(true)
    setMessage(t.parsing)
    setSample(false)
    try {
      let nextFollowers = []
      let nextFollowing = []
      if (/\.zip$/i.test(file.name)) {
        const zip = await JSZip.loadAsync(file)
        const jsonFiles = Object.values(zip.files).filter(item => !item.dir && /\.json$/i.test(item.name))
        for (const item of jsonFiles) {
          const path = item.name.toLowerCase()
          if (!/(followers?|following|relationships)/i.test(path)) continue
          let json
          try { json = JSON.parse(await item.async('text')) } catch { continue }
          const parsed = classifyJson(json, path)
          if (parsed.followers) nextFollowers = [...nextFollowers, ...parsed.followers]
          if (parsed.following) nextFollowing = [...nextFollowing, ...parsed.following]
        }
      } else {
        const json = JSON.parse(await file.text())
        const parsed = classifyJson(json, file.name.toLowerCase())
        nextFollowers = parsed.followers || []
        nextFollowing = parsed.following || []
      }
      nextFollowers = [...new Map(nextFollowers.map(x => [x.toLowerCase(), x])).values()]
      nextFollowing = [...new Map(nextFollowing.map(x => [x.toLowerCase(), x])).values()]
      if (!nextFollowers.length || !nextFollowing.length) {
        setMessage(/\.json$/i.test(file.name) ? t.badJson : t.noLists)
        return
      }
      setFollowers(nextFollowers)
      setFollowing(nextFollowing)
      setFileName(file.name)
      setQuery('')
      setMessage(`${t.imported} ${nextFollowers.length} / ${nextFollowing.length}`)
    } catch (error) {
      setMessage(t.badJson)
    } finally {
      setLoading(false)
    }
  }

  const visibleNotBack = notFollowingBack.filter(name => name.toLowerCase().includes(query.trim().replace(/^@/, '').toLowerCase())).slice(0, 200)

  return (
    <main className="app-shell" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="topbar">
        <a className="brand" href="#" aria-label="FollowCheck home"><span className="brand-mark"><Instagram size={21} /></span><span>FollowCheck</span></a>
        <button className="language-button" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}><Languages size={17} /> {t.language}</button>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> {t.eyebrow}</span>
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <div className="hero-actions">
            <label className="button button-primary" style={{ opacity: loading ? 0.65 : 1, pointerEvents: loading ? 'none' : 'auto' }}><Upload size={18} /> {loading ? t.parsing : t.upload}<input type="file" accept=".zip,.json,application/zip,application/json" onChange={handleFile} hidden disabled={loading} /></label>
            <button className="button button-secondary" onClick={() => { setSample(!sample); setMessage('') }}><ChartNoAxesCombined size={18} /> {sample ? t.sampleOn : t.sample}</button>
          </div>
          {fileName && <div className="file-pill"><FileUp size={15} /> {t.uploaded}: {fileName}</div>}
          {message && <p className="notice" role="status">{message}</p>}
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="profile-card"><div className="profile-icon"><Instagram size={30} /></div><div className="profile-lines"><i /><i /><i /></div><div className="mini-stats"><span /><span /><span /></div><div className="sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div className="floating-badge"><Heart size={16} fill="currentColor" /> {rtl ? 'حریم خصوصی مهم است' : 'Privacy matters'}</div></div>
      </section>
      <section className="stats-grid" aria-label={t.overview}>{stats.map(({ label, value, icon: Icon, tone }) => <article className={`stat-card ${tone}`} key={label}><div className="stat-top"><span className="stat-icon"><Icon size={19} /></span><ArrowUpRight size={16} className="muted-icon" /></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div>{!sample && !followers.length && <span className="pending-tag">{rtl ? 'پس از ورود داده' : 'Awaiting data'}</span>}</article>)}</section>
      <section className="content-grid">
        <article className="panel chart-panel"><div className="panel-heading"><div><h2>{t.activity}</h2><p>{t.last30}</p></div><span className="panel-icon"><ChartNoAxesCombined size={18} /></span></div>
          {sample ? <div className="chart-wrap"><ResponsiveContainer width="100%" height={220}><AreaChart data={sampleData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}><defs><linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6478f5" stopOpacity={0.25}/><stop offset="95%" stopColor="#6478f5" stopOpacity={0.02}/></linearGradient></defs><CartesianGrid stroke="#edf0f7" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8992aa', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8992aa', fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8ebf4', fontSize: 12 }} /><Area type="monotone" dataKey="followers" stroke="#6478f5" strokeWidth={3} fill="url(#fillBlue)" /></AreaChart></ResponsiveContainer><p className="sample-caption">{t.sampleNote}</p></div> : followers.length && following.length ? <div className="empty-state"><div className="empty-icon"><ChartNoAxesCombined size={25} /></div><h3>{t.results}: {notFollowingBack.length}</h3><p>{t.privateNote}</p></div> : <div className="empty-state"><div className="empty-icon"><ChartNoAxesCombined size={25} /></div><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p><label className="text-button">{t.choose}<input type="file" accept=".zip,.json" onChange={handleFile} hidden /></label></div>}
        </article>
        <article className="panel privacy-panel"><div className="panel-heading"><div><h2>{t.privacy}</h2><p>{t.status}</p></div><span className="shield-icon"><ShieldCheck size={20} /></span></div><p className="privacy-copy">{t.privacyText}</p><div className="export-box"><div className="export-icon"><CircleHelp size={18} /></div><div><strong>{rtl ? 'از کجا فایل بگیرم؟' : 'Where do I get the export?'}</strong><p>{t.exportHelp}</p></div></div><div className="secure-note"><ShieldCheck size={16} /> {rtl ? 'هیچ رمز عبوری لازم نیست' : 'No password required'}</div></article>
      </section>
      {followers.length > 0 && following.length > 0 && <section className="panel" style={{ marginTop: 16, padding: 20 }}><div className="panel-heading"><div><h2>{t.notBack}</h2><p>{t.results}: {notFollowingBack.length}</p></div><span className="panel-icon"><UserRoundMinus size={18} /></span></div><input aria-label={t.search} placeholder={t.search} value={query} onChange={e => setQuery(e.target.value)} style={{ width: '100%', padding: 12, margin: '12px 0', border: '1px solid #e5e7eb', borderRadius: 12, boxSizing: 'border-box' }} />{visibleNotBack.length ? <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{visibleNotBack.map(name => <li key={name} style={{ padding: '10px 4px', borderBottom: '1px solid #edf0f7' }}>@{name}</li>)}</ul> : <p>{t.noResults}</p>}{notFollowingBack.length > 200 && <p>{rtl ? 'برای روان ماندن صفحه، حداکثر ۲۰۰ نتیجه نمایش داده می‌شود؛ از جست‌وجو استفاده کن.' : 'For performance, up to 200 results are shown; use search to find others.'}</p>}</section>}
      <footer className="footer"><span><span className="footer-dot" /> {t.footer}</span><span>FollowCheck · Beta</span></footer>
    </main>
  )
}
