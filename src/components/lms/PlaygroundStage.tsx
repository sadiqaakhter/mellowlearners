import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ExternalLink, Lightbulb, Send, Sparkles, Trophy } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import type { BookModule, BookStageId } from '../../data/bookModules';

type Props = { book: BookModule; stage: BookStageId };
type Feedback = { tone: 'idle' | 'success' | 'try'; text: string };

const timeline = [
  ['1969', 'Apollo 11', 'Humans first landed on the Moon and returned safely.'],
  ['1972', 'Apollo 17', 'Longer surface science helped astronauts collect more evidence.'],
  ['2008', 'Chandrayaan-1', 'The mission helped confirm water molecules on the Moon.'],
  ['2019', "Chang'e 4", 'The first soft landing on the far side opened a new view.'],
  ['2023', 'Chandrayaan-3', 'India soft-landed near the lunar south polar region.'],
] as const;

const landingCases = [
  { name: 'Giffy One', speed: 1.7, tilt: 4, legs: 4, answer: 'go' },
  { name: 'Crater Hopper', speed: 4.8, tilt: 7, legs: 4, answer: 'no-go' },
  { name: 'Moon Wobble', speed: 2.1, tilt: 19, legs: 3, answer: 'no-go' },
] as const;

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return initial; }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue] as const;
}

function useProgress(bookId: string) {
  const [done, setDone] = useStoredState<string[]>(`mellow-${bookId}-progress`, []);
  return {
    done,
    complete: (stage: string) => {
      setDone((items) => items.includes(stage) ? items : [...items, stage]);
      window.dispatchEvent(new CustomEvent('mellow-progress', { detail: { bookId, stage } }));
    },
  };
}

function Card({ children }: { children: ReactNode }) {
  return <section className="rounded-[28px] border border-[#e3dbea] bg-white p-5 shadow-sm sm:p-7">{children}</section>;
}

function MellunaCoach({ feedback, hint, guide }: { feedback: Feedback; hint: string; guide: string[] }) {
  const [showHint, setShowHint] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  return (
    <aside className="mt-5 rounded-3xl border border-[#d7c7e6] bg-[#f5f1f9] p-4" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3e2c5f] text-lg font-black text-[#f0c96d]">M</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Melluna mission coach</p>
          <p className={`mt-1 text-sm font-bold leading-relaxed ${feedback.tone === 'success' ? 'text-emerald-800' : feedback.tone === 'try' ? 'text-amber-800' : 'text-slate-700'}`}>{feedback.text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setShowHint((open) => !open)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#60418a]"><Lightbulb size={15} /> Hint</button>
            <button type="button" onClick={() => setShowGuide((open) => !open)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#60418a]"><Sparkles size={15} /> Kick-start guide</button>
          </div>
          {showHint && <p className="mt-3 rounded-2xl bg-white p-3 text-sm font-semibold text-slate-700">{hint}</p>}
          {showGuide && <ol className="mt-3 space-y-2 rounded-2xl bg-white p-4">{guide.map((step, index) => <li key={step} className="text-sm font-semibold text-slate-700"><b className="text-[#7651a9]">{index + 1}.</b> {step}</li>)}</ol>}
        </div>
      </div>
    </aside>
  );
}

function Submit({ onClick, label = 'Submit to Melluna', disabled = false }: { onClick: () => void; label?: string; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#7651a9] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#7651a9]/20 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><Send size={17} /> {label}</button>;
}

function WrittenStage({ bookId, stage, prompts, complete, isDone }: { bookId: string; stage: 'story' | 'wonder'; prompts: string[]; complete: () => void; isDone: boolean }) {
  const [answers, setAnswers] = useStoredState<string[]>(`mellow-${bookId}-${stage}-answers`, prompts.map(() => ''));
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: stage === 'story' ? 'Read the story pages, then explain the problem in your own words.' : 'There can be more than one good question. I will check that your thinking is clear and specific.' });
  const submit = () => {
    const filled = answers.every((answer) => answer.trim().length >= 12);
    if (!filled) return setFeedback({ tone: 'try', text: 'Not finished yet. Add one clear sentence to every answer box.' });
    if (stage === 'story' && !answers.join(' ').toLowerCase().match(/moon|air|parachute|landing/)) return setFeedback({ tone: 'try', text: 'You have a thoughtful start. Connect one answer to the Moon landing problem.' });
    complete(); setFeedback({ tone: 'success', text: 'Strong thinking. You used your own words and connected them to the mission.' });
  };
  return <Card><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Your mission notes</p><h2 className="mt-2 text-2xl font-black text-slate-950">{stage === 'story' ? 'Spot the story problem' : 'Build your question board'}</h2><div className="mt-5 space-y-4">{prompts.map((prompt, index) => <label key={prompt} className="block rounded-2xl border border-slate-200 p-4"><span className="text-sm font-black text-slate-800">{prompt}</span><textarea value={answers[index] || ''} onChange={(event) => setAnswers((all) => all.map((answer, answerIndex) => answerIndex === index ? event.target.value : answer))} className="mt-3 min-h-24 w-full rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#bba4d2]" placeholder="Write what you notice…" /></label>)}</div><Submit onClick={submit} label={isDone ? 'Check my answers again' : undefined} /><MellunaCoach feedback={feedback} hint={stage === 'story' ? 'Ask: what works on Earth but will not work on the Moon?' : 'Useful questions often begin with why, how, what if, or how might we test…'} guide={stage === 'story' ? ['Look at the problem Giffy faces.', 'Find the Moon fact that causes it.', 'Explain the connection in your own words.'] : ['Write one science question.', 'Write one design question.', 'Choose the question you would test first and explain why.']} /></Card>;
}

function TimelineStage({ complete, isDone }: { complete: () => void; isDone: boolean }) {
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'Explore the timeline first. Then answer the mission check.' });
  const event = timeline[selected];
  const submit = () => answer === 'Chandrayaan-1' ? (complete(), setFeedback({ tone: 'success', text: 'Correct! Finding water changed what future Moon bases might be able to use.' })) : setFeedback({ tone: 'try', text: 'Try again. Look for the mission whose evidence mentions water molecules.' });
  return <Card><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Explore and solve</p><h2 className="mt-2 text-2xl font-black text-slate-950">Moon mission timeline</h2><div className="mt-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr]"><div className="space-y-2">{timeline.map((item, index) => <button key={item[1]} type="button" onClick={() => setSelected(index)} className={`flex w-full justify-between rounded-2xl border p-3 text-left font-black ${selected === index ? 'border-[#7651a9] bg-[#f3eef8] text-[#513773]' : 'border-slate-200 text-slate-600'}`}><span>{item[1]}</span><span>{item[0]}</span></button>)}</div><div className="rounded-3xl bg-[#3e2c5f] p-6 text-white"><p className="text-4xl font-black text-[#d9c6ea]">{event[0]}</p><h3 className="mt-2 text-2xl font-black">{event[1]}</h3><p className="mt-3 leading-relaxed text-white/80">{event[2]}</p></div></div><fieldset className="mt-5 rounded-3xl border border-slate-200 p-5"><legend className="px-2 text-sm font-black text-slate-900">Which mission helped confirm water molecules on the Moon?</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{['Apollo 11', 'Chandrayaan-1', "Chang'e 4"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className={`rounded-2xl border p-3 text-sm font-black ${answer === option ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{option}</button>)}</div></fieldset><Submit onClick={submit} disabled={!answer} label={isDone ? 'Check again' : undefined} /><MellunaCoach feedback={feedback} hint="Open the 2008 mission card and look for a clue about a resource astronauts may need." guide={['Select each mission in date order.', 'Write: mission → discovery → why it matters.', 'Use that evidence to answer the question.']} /></Card>;
}

function ChallengeStage({ complete }: { complete: () => void }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'Compare every reading with the safe-flight rules before making your call.' });
  const current = landingCases[caseIndex];
  const submit = () => {
    if (choice !== current.answer) return setFeedback({ tone: 'try', text: 'That call is not safe yet. Check speed, tilt, and landing legs one at a time.' });
    const nextCount = correctCount + 1; setCorrectCount(nextCount);
    if (caseIndex === landingCases.length - 1) { complete(); return setFeedback({ tone: 'success', text: 'Mission complete: all three calls match the data.' }); }
    setFeedback({ tone: 'success', text: 'Correct call. New case unlocked!' }); setCaseIndex((index) => index + 1); setChoice('');
  };
  return <Card><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Solvable data challenge</p><h2 className="mt-2 text-2xl font-black text-slate-950">GO or NO-GO?</h2></div><span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black">{caseIndex + 1} / {landingCases.length}</span></div><div className="mt-5 grid grid-cols-3 gap-3">{[['Speed', `${current.speed} m/s`], ['Tilt', `${current.tilt}°`], ['Working legs', current.legs]].map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4 text-center"><p className="text-xs font-bold text-slate-400">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>)}</div><div className="mt-4 rounded-2xl bg-[#f5f1f9] p-4 text-sm font-bold text-slate-700">Safe when: speed ≤ 2.5 m/s · tilt ≤ 12° · four working legs</div><div className="mt-4 grid grid-cols-2 gap-3">{['go', 'no-go'].map((option) => <button key={option} type="button" onClick={() => setChoice(option)} className={`rounded-2xl border-2 p-4 text-lg font-black ${choice === option ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{option.toUpperCase()}</button>)}</div><Submit onClick={submit} disabled={!choice} label="Submit flight call" /><MellunaCoach feedback={feedback} hint="A mission is NO-GO if even one safety rule fails." guide={['Draw three columns: speed, tilt, legs.', 'Mark each reading safe or unsafe.', 'GO only when all three marks are safe.']} /></Card>;
}

function DesignStage({ bookId, complete, isDone }: { bookId: string; complete: () => void; isDone: boolean }) {
  const [design, setDesign] = useStoredState(`mellow-${bookId}-lander`, { science: 50, safety: 60, power: 45, reason: '' });
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'Move the controls, explain your trade-off, then submit the design.' });
  const mass = Math.round((design.science + design.safety + design.power) * 0.62);
  const viable = design.safety >= 45 && design.power >= 30 && mass <= 110;
  const submit = () => {
    if (!viable) return setFeedback({ tone: 'try', text: 'This lander is not flight-ready. Keep safety at 45+, power at 30+, and mass at 110 or below.' });
    if (design.reason.trim().length < 20) return setFeedback({ tone: 'try', text: 'Your numbers work. Now explain why you protected one system.' });
    complete(); setFeedback({ tone: 'success', text: 'Approved for testing! Your design is balanced and your reasoning is clear.' });
  };
  return <Card><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Build, explain, submit</p><h2 className="mt-2 text-2xl font-black text-slate-950">Lander trade-off lab</h2><div className="mt-5 grid gap-5 md:grid-cols-[1.15fr_0.85fr]"><div className="space-y-4">{(['science', 'safety', 'power'] as const).map((key) => <label key={key} className="block rounded-2xl border border-slate-200 p-4"><span className="mb-2 flex justify-between text-sm font-black capitalize"><span>{key} system</span><span className="text-[#7651a9]">{design[key]}</span></span><input className="w-full accent-[#7651a9]" type="range" min="10" max="90" value={design[key]} onChange={(event) => setDesign((value) => ({ ...value, [key]: Number(event.target.value) }))} /></label>)}</div><div className={`flex flex-col items-center justify-center rounded-3xl p-5 text-center ${viable ? 'bg-emerald-50' : 'bg-amber-50'}`}><p className="text-sm font-bold text-slate-500">Estimated mass</p><p className="text-4xl font-black">{mass}</p><p className="mt-2 text-sm font-bold">{viable ? 'Ready for explanation' : 'Adjust the trade-off'}</p></div></div><label className="mt-5 block text-sm font-black text-slate-800">Which system did you protect most, and why?<textarea value={design.reason} onChange={(event) => setDesign((value) => ({ ...value, reason: event.target.value }))} className="mt-2 min-h-24 w-full rounded-2xl bg-slate-50 p-4 font-semibold outline-none focus:ring-2 focus:ring-[#bba4d2]" placeholder="I protected… because…" /></label><Submit onClick={submit} label={isDone ? 'Check design again' : 'Submit lander design'} /><MellunaCoach feedback={feedback} hint="A good explanation names one system and describes the mission risk it reduces." guide={['Start with safety 60 and power 45.', 'Change one slider and watch the mass.', 'Explain the feature you refused to remove.']} /></Card>;
}

function MissionStage({ book, complete, isDone }: { book: BookModule; complete: () => void; isDone: boolean }) {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('mission');
  const requestedLab = searchParams.get('activity');
  const [tab, setTab] = useState<'mission' | 'ai' | 'careers'>(() => requestedLab === 'ai' || requestedLab === 'careers' ? requestedLab : 'mission');
  const [missionId, setMissionId] = useState(() => book.missions.some((mission) => mission.id === requested) ? requested! : book.missions[0].id);
  const [plan, setPlan] = useStoredState(`mellow-${book.id}-mission-plan`, { goal: '', evidence: '' });
  const [claim, setClaim] = useState('');
  const [strength, setStrength] = useState('patterns');
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'Choose one path, write a small plan, and I will check whether it is testable.' });
  const mission = book.missions.find((item) => item.id === missionId) || book.missions[0];
  const career = useMemo(() => ({ patterns: 'Mission Data Scientist', building: 'Aerospace Engineer', coding: 'Robotics Programmer', teamwork: 'Flight Controller' }[strength]), [strength]);
  const submitPlan = () => plan.goal.trim().length >= 15 && plan.evidence.trim().length >= 12 ? (complete(), setFeedback({ tone: 'success', text: 'Mission accepted! Your goal and evidence plan are clear enough to begin.' })) : setFeedback({ tone: 'try', text: 'Make the plan more specific: what will you make, and what evidence will prove it worked?' });
  const submitClaim = () => claim.startsWith('Test') ? setFeedback({ tone: 'success', text: 'Correct. Reliable AI needs testing with varied examples and conditions.' }) : setFeedback({ tone: 'try', text: 'That claim trusts AI too quickly. Look for the choice that asks for repeated testing.' });
  return <Card><div className="flex flex-wrap gap-2">{[['mission', 'Choose mission'], ['ai', 'AI Detective'], ['careers', 'Career match']].map(([id, label]) => <button key={id} type="button" onClick={() => setTab(id as typeof tab)} className={`rounded-full px-4 py-2 text-xs font-black ${tab === id ? 'bg-[#7651a9] text-white' : 'bg-slate-100 text-slate-600'}`}>{label}</button>)}</div>{tab === 'mission' && <><h2 className="mt-5 text-2xl font-black">Pick one mission</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{book.missions.map((item) => <button key={item.id} type="button" onClick={() => setMissionId(item.id)} className={`rounded-2xl border p-4 text-left ${missionId === item.id ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}><span className="text-xs font-black uppercase text-[#7651a9]">{item.path}</span><span className="mt-1 block font-black">{item.title}</span></button>)}</div><div className="mt-4 rounded-3xl bg-slate-50 p-5"><p className="text-sm font-black text-[#7651a9]">{mission.tool}</p><h3 className="mt-1 text-xl font-black">{mission.title}</h3><p className="mt-2 text-sm font-semibold text-slate-600">{mission.summary}</p><ol className="mt-4 space-y-2">{mission.steps.map((step, index) => <li key={step} className="text-sm font-bold"><span className="text-[#7651a9]">{index + 1}.</span> {step}</li>)}</ol>{mission.toolUrl && <a href={mission.toolUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Open creation tool <ExternalLink size={16} /></a>}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-sm font-black">What will you make?<textarea value={plan.goal} onChange={(event) => setPlan((value) => ({ ...value, goal: event.target.value }))} className="mt-2 min-h-24 w-full rounded-2xl bg-slate-50 p-4 font-semibold outline-none" /></label><label className="text-sm font-black">What evidence will show it worked?<textarea value={plan.evidence} onChange={(event) => setPlan((value) => ({ ...value, evidence: event.target.value }))} className="mt-2 min-h-24 w-full rounded-2xl bg-slate-50 p-4 font-semibold outline-none" /></label></div><Submit onClick={submitPlan} label={isDone ? 'Check plan again' : 'Submit mission plan'} /></>}{tab === 'ai' && <><h2 className="mt-5 text-2xl font-black">AI Detective</h2><p className="mt-2 text-sm font-semibold text-slate-600">Which statement shows careful AI testing?</p><div className="mt-4 space-y-2">{['The model was right once, so it is always safe.', 'Test the model with different people, light, and backgrounds.', 'AI understands gestures exactly like a human.'].map((option) => <button key={option} type="button" onClick={() => setClaim(option)} className={`w-full rounded-2xl border p-4 text-left text-sm font-bold ${claim === option ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{option}</button>)}</div><Submit onClick={submitClaim} disabled={!claim} label="Check my answer" /></>}{tab === 'careers' && <><h2 className="mt-5 text-2xl font-black">Find a Moon career</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="space-y-2">{[['patterns', 'I enjoy finding patterns'], ['building', 'I enjoy making models'], ['coding', 'I enjoy giving machines instructions'], ['teamwork', 'I enjoy guiding a team']].map(([id, label]) => <button key={id} type="button" onClick={() => setStrength(id)} className={`w-full rounded-2xl border p-4 text-left text-sm font-black ${strength === id ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{label}</button>)}</div><div className="rounded-3xl bg-[#3e2c5f] p-6 text-white"><Sparkles className="text-[#f0c96d]"/><p className="mt-4 text-xs font-black uppercase text-white/60">Your match</p><p className="mt-2 text-2xl font-black">{career}</p><p className="mt-2 text-sm text-white/75">This is a starting point, not a limit. Space teams need every kind of thinker.</p></div></div></>}
    <MellunaCoach feedback={feedback} hint={tab === 'mission' ? 'A testable plan includes an action and a result you can observe.' : tab === 'ai' ? 'Good AI evidence comes from many tests, not one lucky result.' : 'Choose what feels energising, not what sounds most impressive.'} guide={tab === 'mission' ? ['Choose the smallest version you can finish.', 'Write what you will make or code.', 'Decide what photo, reading, or test result will count as evidence.'] : tab === 'ai' ? ['Look for overconfident words such as always.', 'Prefer testing in different conditions.', 'Remember that a model can be wrong.'] : ['Pick your favourite way to work.', 'Read the career match.', 'Try the matching mission path.']} /></Card>;
}

function TestStage({ bookId, complete, isDone }: { bookId: string; complete: () => void; isDone: boolean }) {
  const [record, setRecord] = useStoredState<{ first: string; change: string; second: string; result: string }>(`mellow-${bookId}-test`, { first: '', change: '', second: '', result: '' });
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'A fair test changes one variable and compares the result.' });
  const submit = () => (Object.values(record) as string[]).every((value) => value.trim().length >= 3) ? (complete(), setFeedback({ tone: 'success', text: 'Excellent test record. You changed one thing and compared the evidence.' })) : setFeedback({ tone: 'try', text: 'Complete every field so I can compare Trial 1 and Trial 2.' });
  return <Card><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Test, record, improve</p><h2 className="mt-2 text-2xl font-black">Change one thing</h2><div className="mt-5 grid gap-3">{[['first', 'Trial 1 result'], ['change', 'One variable I changed'], ['second', 'Trial 2 result']].map(([key, label]) => <label key={key} className="text-sm font-black">{label}<input value={record[key as keyof typeof record]} onChange={(event) => setRecord((value) => ({ ...value, [key]: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 p-4 font-semibold outline-none focus:border-[#7651a9]" /></label>)}<fieldset><legend className="text-sm font-black">Did it improve?</legend><div className="mt-2 grid grid-cols-3 gap-2">{['Better', 'Same', 'Worse'].map((option) => <button key={option} type="button" onClick={() => setRecord((value) => ({ ...value, result: option }))} className={`rounded-2xl border p-3 text-sm font-black ${record.result === option ? 'border-[#7651a9] bg-[#f3eef8]' : 'border-slate-200'}`}>{option}</button>)}</div></fieldset></div><Submit onClick={submit} label={isDone ? 'Check record again' : 'Submit test record'} /><MellunaCoach feedback={feedback} hint="If you changed two things, you cannot tell which change caused the result." guide={['Record the first result with a number or observation.', 'Change exactly one feature.', 'Repeat the same test and compare.']} /></Card>;
}

function ReflectionStage({ bookId, complete, isDone }: { bookId: string; complete: () => void; isDone: boolean }) {
  const [text, setText] = useStoredState(`mellow-${bookId}-reflection-v2`, '');
  const [feedback, setFeedback] = useState<Feedback>({ tone: 'idle', text: 'A strong debrief includes evidence, a lesson, and one next step.' });
  const submit = () => text.trim().length >= 60 ? (complete(), setFeedback({ tone: 'success', text: 'Mission complete! Your debrief explains both learning and improvement.' })) : setFeedback({ tone: 'try', text: 'Add more evidence. Tell me what happened in the test and what you would change next.' });
  return <Card><p className="text-xs font-black uppercase tracking-widest text-[#7651a9]">Final mission submission</p><h2 className="mt-2 text-2xl font-black">Tell the story of your solution</h2><textarea value={text} onChange={(event) => setText(event.target.value)} className="mt-5 min-h-48 w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#bba4d2]" placeholder="I made… My evidence showed… I learned… Next time I would…"/><div className="mt-2 text-right text-xs font-bold text-slate-400">{text.trim().length} / 60 minimum</div><Submit onClick={submit} label={isDone ? 'Check debrief again' : 'Submit final debrief'} /><MellunaCoach feedback={feedback} hint="Use the sentence starters in the answer box. Evidence can be a number, observation, success, or failure." guide={['Name what you made.', 'Describe one test result.', 'Explain what the evidence taught you.', 'Write one improvement for next time.']} />{isDone && <div className="mt-5 rounded-3xl bg-[#f3eef8] p-6 text-center"><Trophy className="mx-auto text-[#7651a9]" size={42}/><p className="mt-3 text-2xl font-black text-[#513773]">Book 1 Mission Complete</p><p className="mt-1 text-sm font-bold text-slate-600">Giffy is ready for the next test flight.</p></div>}</Card>;
}

export default function PlaygroundStage({ book, stage }: Props) {
  const progress = useProgress(book.id);
  const complete = () => progress.complete(stage);
  const isDone = progress.done.includes(stage);
  const stageData = book.stages.find((item) => item.id === stage) || book.stages[0];
  if (stage === 'story' || stage === 'wonder') return <WrittenStage bookId={book.id} stage={stage} prompts={stageData.prompts} complete={complete} isDone={isDone} />;
  if (stage === 'explore') return <TimelineStage complete={complete} isDone={isDone} />;
  if (stage === 'challenge') return <ChallengeStage complete={complete} />;
  if (stage === 'design') return <DesignStage bookId={book.id} complete={complete} isDone={isDone} />;
  if (stage === 'missions') return <MissionStage book={book} complete={complete} isDone={isDone} />;
  if (stage === 'test') return <TestStage bookId={book.id} complete={complete} isDone={isDone} />;
  return <ReflectionStage bookId={book.id} complete={complete} isDone={isDone} />;
}
