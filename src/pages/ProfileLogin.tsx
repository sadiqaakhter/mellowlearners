import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Monitor, Sparkles } from 'lucide-react';
import { useProfiles, type LearnerProfile } from '../components/lms/LearnerProfiles';

export default function ProfileLogin() {
  const { profiles, active, error, choose, create } = useProfiles();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🚀');
  const navigate = useNavigate();
  const location = useLocation();
  const requested = location.state?.returnTo;
  const returnTo = typeof requested === 'string' && /^\/lms\/(book\/[^/?]+\/[^/?]+(?:\?.*)?|learner)$/.test(requested) ? requested : '/lms/learner';
  const enter = (profile: LearnerProfile) => { if (choose(profile)) navigate(returnTo, { replace: true }); };
  return <div className="min-h-screen bg-[#fbf8fe] text-[#30263e]">
    <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-6"><Link to="/lms" className="text-sm font-bold text-[#7651a9]">← Playground home</Link><span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#7651a9]">Local profile demo</span></header>
    <main className="mx-auto max-w-4xl px-5 pb-14 pt-5">
      <div className="mb-9 text-center"><Sparkles className="mx-auto mb-4 text-[#9873bd]" size={36}/><p className="text-xs font-black uppercase tracking-[.18em] text-[#7651a9]">Mellow Learners Playground</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">Who’s exploring today?</h1><p className="mt-4 text-base text-slate-600">Pick your explorer to find your saved missions, points and discoveries.</p></div>
      <section aria-labelledby="explorers-title"><h2 id="explorers-title" className="mb-4 text-lg font-bold">Choose an explorer</h2><div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{profiles.map((profile) => <button key={profile.id} onClick={() => enter(profile)} className="group rounded-3xl border-2 border-[#e6dced] bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#9f7abf] focus-visible:outline-4 focus-visible:outline-[#9f7abf]" aria-label={`Continue as ${profile.name}`}><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f2ebf8] text-4xl" aria-hidden="true">{profile.avatar}</span><span className="mt-3 block break-words text-lg font-black">{profile.name}</span><span className="mt-1 block text-xs text-slate-500">{profile.id.startsWith('demo-') ? 'Sample explorer' : 'Your explorer'}</span><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#7651a9]">{active?.id === profile.id ? 'Continue playing' : 'Let’s explore'}<ArrowRight size={14}/></span></button>)}</div></section>
      <section className="mt-8 rounded-3xl border border-[#e0d3eb] bg-white p-6 sm:p-8"><h2 className="text-2xl font-black">Make your own explorer</h2><p className="mt-2 text-sm text-slate-600">A nickname is enough. No full name, email or password needed.</p><form className="mt-5" onSubmit={(e) => { e.preventDefault(); const profile = create(name, avatar); if (profile) enter(profile); }}><label htmlFor="explorer-name" className="block text-sm font-bold">Your nickname</label><input id="explorer-name" value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={20} required autoComplete="off" placeholder="For example, Star Builder" className="mt-2 min-h-12 w-full rounded-2xl border border-[#d7c6e5] bg-[#fdfbff] px-4 focus:outline-2 focus:outline-[#9873bd]"/><fieldset className="mt-5"><legend className="text-sm font-bold">Pick your explorer symbol</legend><div className="mt-3 flex flex-wrap gap-3">{['🚀', '🌙', '☄️', '⭐', '🪐', '🔭'].map((symbol, i) => <button key={symbol} type="button" aria-label={['Rocket avatar','Moon avatar','Comet avatar','Star avatar','Planet avatar','Telescope avatar'][i]} aria-pressed={avatar === symbol} onClick={() => setAvatar(symbol)} className={`h-14 w-14 rounded-2xl border-2 text-2xl ${avatar === symbol ? 'border-[#7651a9] bg-[#eee4f6]' : 'border-slate-100 bg-slate-50'}`}>{symbol}</button>)}</div></fieldset><button className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#7651a9] px-6 py-3 font-bold text-white">Create explorer & play<ArrowRight size={18}/></button></form></section>
      {error && <p role="alert" className="mt-5 rounded-2xl bg-amber-100 p-4 text-sm font-semibold text-amber-950">{error}</p>}
      <aside className="mt-7 flex items-start gap-3 rounded-2xl bg-[#efe8f5] p-5 text-sm leading-relaxed text-[#685576]"><Monitor className="mt-1 shrink-0" size={22}/><p><strong>Saved in this browser, on this device.</strong> These profiles have no passwords. Anyone using this browser can open them. Clearing browser data removes saved work; it won’t appear on another device.</p></aside>
    </main>
  </div>;
}
