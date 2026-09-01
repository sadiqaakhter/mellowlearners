import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Brain, Check, ExternalLink, Rocket, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import type { BookModule, BookStageId } from '../../data/bookModules';

type Props = {
  book: BookModule;
  stage: BookStageId;
};

const timeline = [
  { year: '1969', title: 'Apollo 11', fact: 'Humans first landed on the Moon and returned safely to Earth.' },
  { year: '1972', title: 'Apollo 17', fact: 'The final Apollo Moon landing carried out longer surface science.' },
  { year: '2008', title: 'Chandrayaan-1', fact: 'The mission helped confirm water molecules on the Moon.' },
  { year: '2019', title: "Chang'e 4", fact: 'The first soft landing on the far side of the Moon opened a new view.' },
  { year: '2023', title: 'Chandrayaan-3', fact: 'India achieved a soft landing near the lunar south polar region.' },
];

const landingCases = [
  { name: 'Giffy One', speed: 1.7, tilt: 4, legs: 4, answer: 'go' },
  { name: 'Crater Hopper', speed: 4.8, tilt: 7, legs: 4, answer: 'no-go' },
  { name: 'Moon Wobble', speed: 2.1, tilt: 19, legs: 3, answer: 'no-go' },
] as const;

function useBookProgress(bookId: string) {
  const storageKey = `mellow-${bookId}-progress`;
  const [done, setDone] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(done)), [done, storageKey]);
  return {
    done,
    complete: (id: string) => setDone((items) => items.includes(id) ? items : [...items, id]),
  };
}

function ActivityCard({ children }: { children: ReactNode }) {
  return <div className="rounded-[28px] border border-[#e6dfed] bg-white p-5 shadow-sm sm:p-7">{children}</div>;
}

function CompleteButton({ complete, isDone }: { complete: () => void; isDone: boolean }) {
  return (
    <button type="button" onClick={complete} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#7651a9] px-5 py-3 text-sm font-black text-white">
      <Check size={18} /> {isDone ? 'Stage complete' : 'Mark stage complete'}
    </button>
  );
}

function TimelineActivity({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [selected, setSelected] = useState(0);
  const event = timeline[selected];
  return (
    <ActivityCard>
      <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Interactive Moon timeline</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">How did Moon exploration improve?</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2">
          {timeline.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setSelected(index)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left font-black ${selected === index ? 'border-[#7651a9] bg-[#f3eef8] text-[#513773]' : 'border-slate-200 text-slate-600'}`}>
              <span>{item.title}</span><span>{item.year}</span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-[#3e2c5f] p-6 text-white">
          <p className="text-5xl font-black text-[#d9c6ea]">{event.year}</p>
          <h3 className="mt-3 text-2xl font-black">{event.title}</h3>
          <p className="mt-3 leading-relaxed text-white/80">{event.fact}</p>
          <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-bold">Mission clue: What could Giffy reuse or improve from this mission?</p>
        </div>
      </div>
      <CompleteButton complete={onComplete} isDone={isDone} />
    </ActivityCard>
  );
}

function GoNoGoActivity({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const current = landingCases[caseIndex];
  const choice = answers[caseIndex];
  const correct = choice === current.answer;
  const finished = Object.keys(answers).length === landingCases.length;
  return (
    <ActivityCard>
      <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Flight controller challenge</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-slate-950">GO or NO-GO?</h2>
        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">Case {caseIndex + 1} of {landingCases.length}</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[['Speed', `${current.speed} m/s`], ['Tilt', `${current.tilt}°`], ['Landing legs', current.legs]].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-1 text-xl font-black text-slate-900">{value}</p></div>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">Safe rule: speed ≤ 2.5 m/s, tilt ≤ 12°, and four working legs.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {(['go', 'no-go'] as const).map((answer) => (
          <button key={answer} type="button" onClick={() => setAnswers((all) => ({ ...all, [caseIndex]: answer }))} className={`rounded-2xl border-2 px-5 py-4 text-lg font-black ${choice === answer ? 'border-[#7651a9] bg-[#f3eef8] text-[#513773]' : 'border-slate-200 text-slate-700'}`}>{answer.toUpperCase()}</button>
        ))}
      </div>
      {choice && <p className={`mt-4 rounded-2xl p-4 text-sm font-bold ${correct ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{correct ? 'Correct. Your decision matches the mission data.' : 'Check every safety rule, then try again.'}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" disabled={!choice || caseIndex === landingCases.length - 1} onClick={() => setCaseIndex((value) => value + 1)} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white disabled:opacity-30">Next case</button>
        {finished && <CompleteButton complete={onComplete} isDone={isDone} />}
      </div>
    </ActivityCard>
  );
}

function LanderLab({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [science, setScience] = useState(50);
  const [safety, setSafety] = useState(60);
  const [power, setPower] = useState(45);
  const mass = Math.round((science + safety + power) * 0.62);
  const viable = safety >= 45 && power >= 30 && mass <= 110;
  return (
    <ActivityCard>
      <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Lander trade-off lab</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Balance the mission</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {[
            ['Science tools', science, setScience], ['Safety systems', safety, setSafety], ['Power supply', power, setPower],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="block rounded-2xl border border-slate-200 p-4">
              <span className="mb-3 flex justify-between text-sm font-black text-slate-700"><span>{label as string}</span><span className="text-[#7651a9]">{value as number}</span></span>
              <input className="w-full accent-[#7651a9]" type="range" min="10" max="90" value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} />
            </label>
          ))}
        </div>
        <div className={`flex flex-col items-center justify-center rounded-3xl p-6 text-center ${viable ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <Rocket size={56} className="text-[#513773]" />
          <p className="mt-3 text-sm font-bold text-slate-500">Estimated mass</p>
          <p className="text-4xl font-black text-slate-950">{mass}</p>
          <p className="mt-3 text-sm font-bold text-slate-700">{viable ? 'Balanced for a test flight.' : 'Too risky or heavy. Adjust one system.'}</p>
        </div>
      </div>
      {viable && <CompleteButton complete={onComplete} isDone={isDone} />}
    </ActivityCard>
  );
}

function MissionChooser({ book, onComplete, isDone }: { book: BookModule; onComplete: () => void; isDone: boolean }) {
  const [searchParams] = useSearchParams();
  const requestedMission = searchParams.get('mission');
  const requestedLab = searchParams.get('activity');
  const [selected, setSelected] = useState(() => book.missions.some((item) => item.id === requestedMission) ? requestedMission! : book.missions[0].id);
  const [lab, setLab] = useState<'missions' | 'ai' | 'careers'>(() => requestedLab === 'ai' || requestedLab === 'careers' ? requestedLab : 'missions');
  const mission = book.missions.find((item) => item.id === selected) || book.missions[0];
  const [claim, setClaim] = useState<string>();
  const [strength, setStrength] = useState('patterns');
  const career = useMemo(() => ({ patterns: 'Mission Data Scientist', building: 'Aerospace Engineer', coding: 'Robotics Programmer', teamwork: 'Flight Controller' }[strength]), [strength]);
  return (
    <ActivityCard>
      <div className="flex flex-wrap gap-2">
        {[['missions', 'Four missions'], ['ai', 'AI Detective'], ['careers', 'STEM careers']].map(([id, label]) => <button key={id} type="button" onClick={() => setLab(id as typeof lab)} className={`rounded-full px-4 py-2 text-xs font-black ${lab === id ? 'bg-[#7651a9] text-white' : 'bg-slate-100 text-slate-600'}`}>{label}</button>)}
      </div>
      {lab === 'missions' && <>
        <h2 className="mt-5 text-2xl font-black text-slate-950">Choose your Book 1 mission</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {book.missions.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={`rounded-2xl border p-4 text-left ${selected === item.id ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">{item.path}</p><p className="mt-1 font-black text-slate-950">{item.title}</p></button>)}
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-black text-[#7651a9]">{mission.tool}</p><h3 className="mt-1 text-xl font-black text-slate-950">{mission.title}</h3><p className="mt-2 text-sm font-semibold text-slate-600">{mission.summary}</p>
          <ol className="mt-4 space-y-2">{mission.steps.map((step, index) => <li key={step} className="text-sm font-bold text-slate-700">{index + 1}. {step}</li>)}</ol>
          <p className="mt-4 rounded-2xl bg-white p-3 text-sm font-bold text-slate-700"><span className="text-[#7651a9]">Evidence:</span> {mission.evidence}</p>
          {mission.toolUrl && <a href={mission.toolUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Open tool <ExternalLink size={16} /></a>}
        </div>
      </>}
      {lab === 'ai' && <>
        <h2 className="mt-5 text-2xl font-black text-slate-950">AI Detective</h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">Decide which statement is careful evidence. No open chat or paid AI is used.</p>
        <div className="mt-5 space-y-3">
          {['The model was right once, so it is always safe.', 'Test the model with different people, light, and backgrounds.', 'AI understands gestures exactly like a human.'].map((text) => <button key={text} type="button" onClick={() => setClaim(text)} className={`w-full rounded-2xl border p-4 text-left text-sm font-bold ${claim === text ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{text}</button>)}
        </div>
        {claim && <p className={`mt-4 rounded-2xl p-4 text-sm font-bold ${claim.startsWith('Test') ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{claim.startsWith('Test') ? 'Good detective work: repeated testing gives stronger evidence.' : 'That claim is too confident. AI can make mistakes and needs varied testing.'}</p>}
      </>}
      {lab === 'careers' && <>
        <h2 className="mt-5 text-2xl font-black text-slate-950">Find your Moon career</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2"><div className="space-y-2">{[['patterns', 'I enjoy finding patterns'], ['building', 'I enjoy making models'], ['coding', 'I enjoy giving machines instructions'], ['teamwork', 'I enjoy guiding a team']].map(([id, label]) => <button key={id} type="button" onClick={() => setStrength(id)} className={`w-full rounded-2xl border p-4 text-left text-sm font-black ${strength === id ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{label}</button>)}</div><div className="flex flex-col justify-center rounded-3xl bg-[#3e2c5f] p-6 text-white"><Sparkles className="text-[#f0c96d]" /><p className="mt-4 text-xs font-black uppercase tracking-widest text-white/60">Career match</p><p className="mt-2 text-2xl font-black">{career}</p><p className="mt-3 text-sm text-white/75">Real missions need many strengths. This match is a starting point, not a limit.</p></div></div>
      </>}
      <CompleteButton complete={onComplete} isDone={isDone} />
    </ActivityCard>
  );
}

function TestImprove({ onComplete, isDone }: { onComplete: () => void; isDone: boolean }) {
  const [trialOne, setTrialOne] = useState('');
  const [change, setChange] = useState('');
  const [trialTwo, setTrialTwo] = useState('');
  const ready = trialOne.trim() && change.trim() && trialTwo.trim();
  return <ActivityCard><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Test record</p><h2 className="mt-2 text-2xl font-black text-slate-950">Change one thing</h2><div className="mt-5 grid gap-3"><input value={trialOne} onChange={(e) => setTrialOne(e.target.value)} placeholder="Trial 1 result" className="rounded-2xl border border-slate-200 p-4 font-semibold outline-none focus:border-[#7651a9]"/><input value={change} onChange={(e) => setChange(e.target.value)} placeholder="One variable I changed" className="rounded-2xl border border-slate-200 p-4 font-semibold outline-none focus:border-[#7651a9]"/><input value={trialTwo} onChange={(e) => setTrialTwo(e.target.value)} placeholder="Trial 2 result" className="rounded-2xl border border-slate-200 p-4 font-semibold outline-none focus:border-[#7651a9]"/></div>{ready && <CompleteButton complete={onComplete} isDone={isDone} />}</ActivityCard>;
}

function Reflection({ onComplete, isDone, bookId }: { onComplete: () => void; isDone: boolean; bookId: string }) {
  const key = `mellow-${bookId}-reflection`;
  const [text, setText] = useState(() => localStorage.getItem(key) || '');
  useEffect(() => localStorage.setItem(key, text), [key, text]);
  return <ActivityCard><Brain className="text-[#7651a9]"/><h2 className="mt-3 text-2xl font-black text-slate-950">Mission debrief</h2><p className="mt-2 text-sm font-semibold text-slate-600">Explain your evidence, what changed, and what you would try next.</p><textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-5 min-h-44 w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold outline-none focus:border-[#7651a9]" placeholder="I discovered… My evidence was… Next time I would…"/>{text.trim().length >= 30 && <CompleteButton complete={onComplete} isDone={isDone} />}{isDone && <div className="mt-5 rounded-3xl bg-[#f3eef8] p-5 text-center"><p className="text-4xl">🌙</p><p className="mt-2 text-xl font-black text-[#513773]">Book 1 Mission Complete</p><p className="mt-1 text-sm font-bold text-slate-600">Giffy is ready for the next test flight.</p></div>}</ActivityCard>;
}

export default function BookActivityPanel({ book, stage }: Props) {
  const progress = useBookProgress(book.id);
  const isDone = progress.done.includes(stage);
  const complete = () => progress.complete(stage);
  if (stage === 'explore') return <TimelineActivity onComplete={complete} isDone={isDone} />;
  if (stage === 'challenge') return <GoNoGoActivity onComplete={complete} isDone={isDone} />;
  if (stage === 'design') return <LanderLab onComplete={complete} isDone={isDone} />;
  if (stage === 'missions') return <MissionChooser book={book} onComplete={complete} isDone={isDone} />;
  if (stage === 'test') return <TestImprove onComplete={complete} isDone={isDone} />;
  if (stage === 'reflection') return <Reflection onComplete={complete} isDone={isDone} bookId={book.id} />;
  return <ActivityCard><p className="text-sm font-semibold leading-relaxed text-slate-600">Use the book page and prompts above. When you are ready, mark this stage complete.</p><CompleteButton complete={complete} isDone={isDone} /></ActivityCard>;
}
