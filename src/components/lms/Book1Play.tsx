import { useEffect, useRef, useState } from 'react';
import { Check, HelpCircle, Lightbulb, MessageCircle, Play, Send, Star, Trophy, X } from 'lucide-react';
import type { BookModule } from '../../data/bookModules';
import { answerQuestion, lunarMissions, practiceReadings, wonderQuestions } from '../../data/book1Activities';
import LanderGame from './LanderGame';
import './playground.css';
import { useProfileSavedState } from './LearnerProfiles';

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/book1/${path}`;
const useSaved = useProfileSavedState;

export function MellunaPortrait() {
  return <span className="melluna-portrait" role="img" aria-label="Melluna, your Moon guide" style={{ backgroundImage: `url(${asset('page-07.jpg')})` }} />;
}

export function StoryPlay({ book, complete }: { book: BookModule; complete: () => void }) {
  const [loadVideo, setLoadVideo] = useState(false);
  const videoId = book.storyVideoId;
  return <div className="book-play story-play">
    <div className="story-cinema">
      {videoId && loadVideo ? <iframe title="Giffy’s Moon Adventure animated story" src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="story-poster"><div className="story-moon"/><p className="play-eyebrow">Mellow Learners presents</p><h3>One curious giraffe.<br/>One giant adventure.</h3><div className="giffy-portrait" role="img" aria-label="Giffy thinking about her Moon adventure" style={{ backgroundImage: `url(${asset('page-02.jpg')})` }}/>{videoId ? <button className="play-button" onClick={() => setLoadVideo(true)}><Play size={21}/>Watch the story</button> : <div className="video-coming"><Play size={28}/><span>Animated story coming soon</span><small>You can start exploring today.</small></div>}</div>}
    </div>
    <div className="story-bottom"><div><p className="play-eyebrow">The big question</p><h3>How will Giffy land on the Moon?</h3><p>Giffy wants a Moon holiday. But parachutes need air, and the Moon has almost none. Help her discover how real landers slow down and touch down safely.</p></div><button className="play-button" onClick={complete}><Lightbulb size={20}/>I’m ready to wonder</button></div>
    <details className="play-help"><summary>Read the story starter</summary><p>Giffy hears about astronauts exploring the Moon and begins planning her own adventure. Then she notices a problem: getting there is only half the journey. How will she land?</p><p>Melluna explains that rocket engines can slow a spacecraft even without air. Now Giffy needs your questions, ideas and tests to plan a gentle landing.</p></details>
  </div>;
}

type WonderRecord = { key: string; question: string; answer: string; points: number; label: string };
export function WonderPlay({ bookId, complete }: { bookId: string; complete: () => void }) {
  const [records, setRecords] = useSaved<WonderRecord[]>(`mellow-${bookId}-wonder-v3`, []);
  const [selected, setSelected] = useState<WonderRecord | null>(null);
  const answerDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (selected && !answerDialog.current?.open) answerDialog.current?.showModal(); }, [selected]);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('Tap a question bubble. Let’s follow your curiosity!');
  const [notes, setNotes] = useSaved(`mellow-${bookId}-wonder-notes`, '');
  const points = records.reduce((sum, row) => sum + row.points, 0);
  const ask = (text: string) => {
    const result = answerQuestion(text);
    const already = records.some((record) => record.key === result.key);
    const record = { ...result, question: text, points: already ? 0 : result.points };
    setSelected(record);
    setMessage(already ? 'You explored this topic already. You can revisit its answer anytime.' : result.points ? `+${result.points} curiosity ${result.points === 1 ? 'point' : 'points'}!` : 'Keep wondering. This question needs more investigation.');
    if (result.key && !already) setRecords((rows) => [...rows, record]);
    if (result.key) complete();
  };
  return <div className="book-play">
    <div className="wonder-top"><p>Every good mission begins with a question.<br/><strong>Choose any bubble to ask Melluna.</strong></p><div className="points-counter" aria-live="polite"><Star size={23}/><b>{points}</b><span>curiosity points</span></div></div>
    <div className="wonder-garden">
      <div className="wonder-character"><div className="giffy-portrait" role="img" aria-label="Curious Giffy" style={{ backgroundImage: `url(${asset('page-02.jpg')})` }}/><span>“What if…?”</span></div>
      <div className="bubble-grid">{wonderQuestions.map((item, index) => <button key={item.id} className={`wonder-bubble bubble-${item.color} bubble-${index % 3}`} onClick={() => ask(item.question)} aria-label={item.question}><span>{item.question}</span><small>{records.some((r) => r.key === item.id) ? <><Check size={14}/>Explored</> : <><Star size={14}/>1 point</>}</small></button>)}</div>
    </div>
    {selected && <dialog ref={answerDialog} className="wonder-dialog" aria-labelledby="wonder-answer-title" onCancel={() => setSelected(null)}><section className="melluna-answer"><MellunaPortrait/><div><p className="play-eyebrow">Melluna answers · {selected.label}</p><h3 id="wonder-answer-title">{selected.question}</h3><p>{selected.answer}</p><strong className="points-message">{message}</strong><button className="play-button" onClick={() => setSelected(null)}>Keep wondering</button></div><button className="answer-close" onClick={() => setSelected(null)} aria-label="Close answer"><X size={18}/></button></section></dialog>}
    <section className="ask-melluna"><div className="ask-intro"><MellunaPortrait/><div><h3>What else are you wondering?</h3><p>Ask a book question for 1 point. Explore a new supported topic for 2.</p></div><button className="play-button" onClick={() => setAskOpen((open) => !open)} aria-expanded={askOpen}><MessageCircle size={19}/>Ask Melluna</button></div>
      {askOpen && <form onSubmit={(event) => { event.preventDefault(); if (question.trim()) ask(question.trim()); }} className="question-form"><label htmlFor="melluna-question">My question about the Moon or landing</label><div><input id="melluna-question" maxLength={240} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Could we use Moon ice for drinking water?"/><button className="play-button" disabled={question.trim().length < 5}><Send size={18}/>Ask</button></div><p className="play-fine">Melluna uses a checked answer library in this version. Points are awarded once per recognised topic; rewording a book question does not earn extra points. Please leave out names and personal information.</p></form>}
    </section>
    <label className="wonder-notes"><NotebookIcon/><span>My new finding</span><textarea value={notes} maxLength={1500} onChange={(event) => setNotes(event.target.value)} placeholder="I used to think… Now I know…"/><small>Saved on this device.</small></label>
  </div>;
}
function NotebookIcon() { return <Lightbulb size={19}/>; }

export function TimelinePlay({ bookId, complete }: { bookId: string; complete: () => void }) {
  const [placements, setPlacements] = useSaved<Record<string, string>>(`mellow-${bookId}-timeline-v3`, {});
  const [selected, setSelected] = useState<string | null>(null);
  const [info, setInfo] = useState<string>('apollo11');
  const [feedback, setFeedback] = useState('Explore a mission, then place its card on the correct year.');
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number; name: string } | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const mission = lunarMissions.find((m) => m.id === info) || lunarMissions[0];
  const tray = [lunarMissions[2], lunarMissions[0], lunarMissions[3], lunarMissions[1]];
  const place = (id: string, year: string) => {
    if (!lunarMissions.some((m) => m.id === id)) return;
    setPlacements((prev) => ({ ...Object.fromEntries(Object.entries(prev).filter(([slot, card]) => slot !== year && card !== id)), [year]: id }));
    setSelected(null); setChecked(false); setFeedback('Card placed. Keep going, or check your timeline.');
  };
  const check = () => {
    setChecked(true);
    const correct = lunarMissions.filter((m) => placements[m.year] === m.id).length;
    if (correct === lunarMissions.length) { complete(); setFeedback('Timeline complete! Four missions, in the right order. Open any mission to explore again.'); }
    else setFeedback(`${correct} of 4 in the right place. ${Object.keys(placements).length < 4 ? 'Add the remaining cards.' : 'Move the amber cards. Use the mission clues to help.'}`);
  };
  return <div className="book-play">
    <div id="mission-spotlight" className="timeline-feature" style={{ scrollMarginTop: 130 }}><figure><img src={asset(`nasa/${mission.image}`)} alt={mission.caption}/><figcaption>{mission.caption} Credit: {mission.credit}.</figcaption></figure><div><p className="play-eyebrow">Mission spotlight · {mission.date}</p><h3>{mission.name}</h3><p>{mission.fact}</p><a href={mission.source} target="_blank" rel="noreferrer">Explore the NASA source ↗</a></div></div>
    <div className="play-heading"><div><p className="play-eyebrow">Your timeline puzzle</p><h3>Put the landers in time order</h3></div><span className="play-pill">{Object.keys(placements).length} / 4 placed</span></div>
    <p className="play-intro">Drag a card onto a year. On a tablet or keyboard, select a card, then select its year.</p>
    <div className="timeline-track">{lunarMissions.map((slot) => { const placed = lunarMissions.find((m) => m.id === placements[slot.year]); const right = placed?.id === slot.id; return <div key={slot.year} className="timeline-stop"><span className="timeline-year">{slot.year}</span><button data-year={slot.year} className={`timeline-slot ${placed ? 'has-card' : ''} ${checked ? right ? 'slot-correct' : 'slot-wrong' : ''}`} aria-label={`Place selected lander in ${slot.year}${placed ? `, currently ${placed.name}` : ''}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); place(e.dataTransfer.getData('text/plain'), slot.year); }} onClick={() => { if (selected) place(selected, slot.year); else if (placed) { setInfo(placed.id); document.getElementById('mission-spotlight')?.scrollIntoView({ behavior: 'smooth' }); } }}>{placed ? <><img src={asset(`nasa/${placed.image}`)} alt=""/><b>{placed.name}</b><small>{checked ? right ? 'Correct year ✓' : 'Try another year' : 'Tap for mission facts'}</small></> : <><span className="slot-plus">+</span><b>{selected ? 'Place here' : 'Drop a lander'}</b></>}</button>{placed && <button className="remove-card" onClick={() => { setPlacements((prev) => Object.fromEntries(Object.entries(prev).filter(([year]) => year !== slot.year))); setChecked(false); }} aria-label={`Return ${placed.name} to tray`}>Return to tray</button>}</div>; })}</div>
    {dragPoint && <div className="drag-lander-ghost" style={{ left: dragPoint.x + 12, top: dragPoint.y + 12 }}>{dragPoint.name}</div>}<section className="lander-tray" aria-label="Lander cards"><p className="play-eyebrow">Mission cards · choose, explore, place</p><div className="tray-grid">{tray.filter((m) => !Object.values(placements).includes(m.id)).map((m) => <div key={m.id} className={`tray-card ${selected === m.id ? 'card-selected' : ''}`}><button style={{ touchAction: 'none' }} onPointerDown={(e) => { if (e.button !== 0) return; dragOrigin.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={(e) => { const origin = dragOrigin.current; if (origin && Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > 8) setDragPoint({ x: e.clientX, y: e.clientY, name: m.name }); }} onPointerUp={(e) => { const origin = dragOrigin.current; if (origin && Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > 8) { const year = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-year]')?.getAttribute('data-year'); if (year) place(m.id, year); } dragOrigin.current = null; setDragPoint(null); }} onPointerCancel={() => { dragOrigin.current = null; setDragPoint(null); }} onDragStart={(e) => e.preventDefault()} onClick={() => { setSelected(m.id); setInfo(m.id); }} aria-pressed={selected === m.id} aria-label={`Select ${m.name}`}><img src={asset(`nasa/${m.image}`)} alt={m.caption}/><b>{m.name}</b><span>{selected === m.id ? 'Now choose a year ↑' : 'Select or drag ↑'}</span></button></div>)}</div>{Object.keys(placements).length === 4 && <p>All cards placed. Ready to check?</p>}</section>
    <div className="play-actions"><button className="play-button" onClick={check}>Check my timeline <Check size={18}/></button><button className="play-secondary" onClick={() => setHint((v) => !v)}><HelpCircle size={18}/>Give me a clue</button><button className="play-secondary" onClick={() => { setPlacements({}); setChecked(false); setSelected(null); setFeedback('Fresh puzzle. Select a mission to begin.'); }}>Start again</button></div>
    <p className="activity-feedback" role="status">{feedback}</p>{hint && <div className="play-hint"><strong>{mission.name}:</strong> {mission.clue}</div>}
    <aside className="future-mission"><span>Next chapter</span><h3>Artemis: a new era of exploration</h3><p>Explore the plans for future human landings. Artemis is a programme, so it does not belong in a single completed-landing year slot.</p><a href="https://www.nasa.gov/humans-in-space/artemis/" target="_blank" rel="noreferrer">See NASA’s Artemis updates ↗</a></aside>
  </div>;
}

export function ChallengePlay({ bookId, complete }: { bookId: string; complete: () => void }) {
  const [calls, setCalls] = useSaved<Record<string, string>>(`mellow-${bookId}-calls-v3`, {});
  const [solution, setSolution] = useSaved(`mellow-${bookId}-solution-v3`, { difference: '', decision: '', reason: '', notes: '' });
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState('Compare each speed to 2 m/s. Then solve the new lander’s case.');
  const [showGuide, setShowGuide] = useState(false);
  const [flights, setFlights] = useSaved<{ speed: number; success: boolean }[]>(`mellow-${bookId}-flights-v3`, []);
  const submit = () => {
    setChecked(true);
    const wrong = practiceReadings.filter((r) => calls[r.mission] !== (r.speed <= 2 ? 'go' : 'no-go'));
    if (wrong.length) { setFeedback(`Check ${wrong[0].mission}: compare ${wrong[0].speed} m/s with the 2 m/s practice limit. Every row needs a flight call.`); return; }
    if (solution.decision !== 'no-go') { setFeedback('The new lander is travelling at 3.5 m/s. Is that above or below 2? It needs more braking before touchdown.'); return; }
    if (!solution.difference.trim() || Math.abs(Number(solution.difference) - 1.5) > 0.001) { setFeedback('Try the subtraction again: 3.5 − 2.0. This tells you how much speed must be removed.'); return; }
    if (solution.reason !== 'above') { setFeedback('Choose the explanation that compares the reading with the limit. Speed alone cannot guarantee a safe real-world landing.'); return; }
    complete(); setFeedback('Flight report accepted! 3.5 − 2 = 1.5 m/s. The call is NO-GO until the lander slows down. Now use that idea in the game below.');
  };
  return <div className="book-play">
    <div className="challenge-banner"><div><p className="play-eyebrow">Mission control</p><h3>Read. Decide. Bring Giffy home.</h3><p>You are in charge of the landing call.</p></div><div className="safe-rule"><span>Our practice rule</span><strong>≤ 2 m/s = GO</strong><small>Above 2 m/s? NO-GO. Brake more.</small></div></div>
    <div className="play-actions"><button className="play-secondary" onClick={() => document.getElementById('landing-game')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><Play size={18}/>Jump to the landing game</button></div>
    <div className="challenge-workspace"><section className="data-sheet"><h3>Moon landing data sheet</h3><p className="play-fine">Book 1 practice numbers for learning, not verified flight measurements. Real landing limits vary by spacecraft.</p><div className="table-scroll"><table><caption className="sr-only">Choose GO or NO-GO for each practice landing speed</caption><thead><tr><th scope="col">Mission</th><th scope="col">Year</th><th scope="col">Speed<br/>(m/s)</th><th scope="col">Your call</th></tr></thead><tbody>{practiceReadings.map((row) => <tr key={row.mission} className={checked ? calls[row.mission] === (row.speed <= 2 ? 'go' : 'no-go') ? 'row-correct' : 'row-review' : ''}><th scope="row">{row.mission}</th><td>{row.year}</td><td><strong>{row.speed}</strong></td><td><select aria-label={`Flight call for ${row.mission}`} value={calls[row.mission] || ''} onChange={(e) => { setCalls((prev) => ({ ...prev, [row.mission]: e.target.value })); setChecked(false); }}><option value="">Choose</option><option value="go">GO</option><option value="no-go">NO-GO</option></select></td></tr>)}</tbody></table></div></section>
      <section className="solution-sheet"><p className="play-eyebrow">Your working space</p><h3>A new lander: 3.5 m/s</h3><p>Would you continue, or fire more thrusters?</p><div className="decision-buttons">{['go', 'no-go'].map((call) => <button key={call} aria-pressed={solution.decision === call} className={solution.decision === call ? 'is-selected' : ''} onClick={() => setSolution((s) => ({ ...s, decision: call }))}>{call === 'go' ? 'GO · Continue' : 'NO-GO · Brake'}</button>)}</div><label>How much must it slow down?<span className="math-working">3.5 − 2.0 = <input aria-label="Speed reduction in metres per second" inputMode="decimal" value={solution.difference} onChange={(e) => setSolution((s) => ({ ...s, difference: e.target.value }))}/> m/s</span></label><label>My evidence<select value={solution.reason} onChange={(e) => setSolution((s) => ({ ...s, reason: e.target.value }))}><option value="">Choose an explanation</option><option value="above">3.5 is above the 2 m/s limit.</option><option value="fuel">Every spacecraft uses the same fuel.</option><option value="below">3.5 is below the 2 m/s limit.</option></select></label><label>My findings (optional)<textarea maxLength={1500} value={solution.notes} onChange={(e) => setSolution((s) => ({ ...s, notes: e.target.value }))} placeholder="I noticed… My evidence is…"/></label><button className="play-button" onClick={submit}><Send size={18}/>Submit flight report</button></section>
    </div>
    <div className="melluna-answer" role="status"><MellunaPortrait/><div><p className="play-eyebrow">Melluna’s feedback</p><p>{feedback}</p><button className="text-button" onClick={() => setShowGuide((v) => !v)}>Show a worked example</button>{showGuide && <div className="play-hint">Example: a practice lander approaches at 4 m/s. Since 4 &gt; 2, call NO-GO. It must lose at least 4 − 2 = 2 m/s before it meets this game’s limit. Try the 3.5 m/s case yourself.</div>}</div></div>
    <LanderGame onLanding={(speed, success) => setFlights((all) => [...all.slice(-9), { speed: Number(speed.toFixed(2)), success }])}/>
    {flights.length > 0 && <section className="flight-log"><div className="play-heading"><h3>Your flight evidence</h3><Trophy size={24}/></div><p>Compare your landings. What will you change on the next attempt?</p><div className="flight-records">{flights.map((flight, index) => <div key={index}><span>Recorded flight {index + 1}</span><b>{flight.speed} m/s</b><strong>{flight.success ? 'Safe landing ✓' : 'Brake earlier next time'}</strong></div>)}</div></section>}
  </div>;
}
