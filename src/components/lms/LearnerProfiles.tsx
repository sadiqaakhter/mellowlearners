import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export type LearnerProfile = { id: string; name: string; avatar: string };
export const sampleProfiles: LearnerProfile[] = [
  { id: 'demo-nova', name: 'Nova', avatar: '🚀' },
  { id: 'demo-luna', name: 'Luna', avatar: '🌙' },
  { id: 'demo-comet', name: 'Comet', avatar: '☄️' },
];
const profilesKey = 'mellow-local-profiles-v1';
const activeKey = 'mellow-active-profile-v1';
export const profileDataKey = (id: string, key: string) => `mellow-profile:${id}:${key}`;
function readCustomProfiles(): LearnerProfile[] {
  try {
    const value = JSON.parse(localStorage.getItem(profilesKey) || '[]');
    return Array.isArray(value) ? value.filter((p) => typeof p?.id === 'string' && p.id.startsWith('child-') && typeof p.name === 'string' && typeof p.avatar === 'string') : [];
  } catch { return []; }
}
type ProfileContextValue = {
  profiles: LearnerProfile[]; active: LearnerProfile | null; error: string;
  choose: (profile: LearnerProfile) => boolean;
  create: (name: string, avatar: string) => LearnerProfile | null;
  leave: () => void;
};
const ProfileContext = createContext<ProfileContextValue | null>(null);
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [custom, setCustom] = useState(readCustomProfiles);
  const profiles = [...sampleProfiles, ...custom];
  const [active, setActive] = useState<LearnerProfile | null>(() => {
    try { return [...sampleProfiles, ...readCustomProfiles()].find((p) => p.id === sessionStorage.getItem(activeKey)) || null; } catch { return null; }
  });
  const [error, setError] = useState('');
  const choose = (profile: LearnerProfile) => {
    try {
      // Check storage before promising that a child's work can be saved.
      const probe = 'mellow-storage-check';
      localStorage.setItem(probe, 'ok'); localStorage.removeItem(probe);
      sessionStorage.setItem(activeKey, profile.id);
      setActive(profile); setError(''); return true;
    } catch { setError('This browser cannot save profiles right now. Allow site storage, then try again.'); return false; }
  };
  const create = (name: string, avatar: string) => {
    const nickname = name.trim().replace(/\s+/g, ' ');
    if (nickname.length < 2 || nickname.length > 20) { setError('Choose a nickname between 2 and 20 characters.'); return null; }
    const current = readCustomProfiles();
    if ([...sampleProfiles, ...current].some((p) => p.name.toLowerCase() === nickname.toLowerCase())) { setError('That nickname already has a profile. Choose it above, or use a different nickname.'); return null; }
    const profile = { id: `child-${crypto.randomUUID()}`, name: nickname, avatar };
    try {
      localStorage.setItem(profilesKey, JSON.stringify([...current, profile]));
      setCustom([...current, profile]); setError(''); return profile;
    } catch { setError('Your profile could not be saved. Allow site storage, then try again.'); return null; }
  };
  const leave = () => { try { sessionStorage.removeItem(activeKey); } catch { /* Clear the current session even if storage is unavailable. */ } setActive(null); };
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === profilesKey) setCustom(readCustomProfiles()); };
    window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync);
  }, []);
  return <ProfileContext.Provider value={{ profiles, active, error, choose, create, leave }}>{children}</ProfileContext.Provider>;
}
export function useProfiles() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('ProfileProvider is required');
  return value;
}
export function RequireProfile() {
  const { active } = useProfiles();
  const location = useLocation();
  if (!active) return <Navigate to="/lms/login" state={{ returnTo: location.pathname + location.search }} replace/>;
  return <div key={active.id}><Outlet/></div>;
}
export function ProfileMenu() {
  const { active, leave } = useProfiles();
  const navigate = useNavigate();
  const location = useLocation();
  if (!active) return null;
  return <div className="flex items-center gap-2 text-xs font-bold text-[#604581]"><Link to="/lms/login" state={{ returnTo: location.pathname + location.search }} className="flex items-center gap-2 rounded-full bg-[#f1e9f7] px-3 py-2" aria-label={`Switch profile, current explorer ${active.name}`}><span aria-hidden="true">{active.avatar}</span><span className="max-w-24 truncate">{active.name}</span><span className="hidden sm:inline">· Switch</span></Link><button title="Leave profile" aria-label="Leave profile" onClick={() => { leave(); navigate('/lms/login', { replace: true }); }} className="rounded-full p-2 hover:bg-slate-100"><LogOut size={18}/></button></div>;
}
export function useProfileSavedState<T>(key: string, initial: T) {
  const { active } = useProfiles();
  if (!active) throw new Error('Select a learner before opening an activity');
  const storageKey = profileDataKey(active.id, key);
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null') as T ?? initial; } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(value)); }
    catch { window.dispatchEvent(new Event('mellow-save-error')); }
  }, [storageKey, value]);
  return [value, setValue] as const;
}
export function SaveNotice() {
  const [failed, setFailed] = useState(false);
  useEffect(() => { const fail = () => setFailed(true); window.addEventListener('mellow-save-error', fail); return () => window.removeEventListener('mellow-save-error', fail); }, []);
  return failed ? <p role="alert" className="bg-amber-100 p-3 text-center text-sm text-amber-950">Your latest work could not be saved. Keep this page open and check your browser’s available storage.</p> : null;
}
