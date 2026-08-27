import {useEffect, useMemo, useState} from 'react';
import {Link, Navigate, Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, Compass, Home, RotateCcw, Sparkles} from 'lucide-react';
import {learningFlow, missions, timeline} from './content';

const STORAGE_KEY = 'mellow-book1-progress';
function useProgress() {
  const [done, setDone] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } });
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(done)), [done]);
  const complete = (key:string) => setDone(v => v.includes(key) ? v : [...v, key]);
  const reset = () => setDone([]);
  return {done, complete, reset};
}

function App(){
  const progress = useProgress();
  return <Routes>
    <Route path="/" element={<Navigate to="/book1" replace />} />
    <Route path="/book1/*" element={<Shell progress={progress} />} />
    <Route path="*" element={<Navigate to="/book1" replace />} />
  </Routes>;
}

function Shell({progress}:{progress:ReturnType<typeof useProgress>}){
  const location=useLocation();
  const pct=Math.round((progress.done.length/(learningFlow.length+missions.length))*100);
  return <div className="app-shell">
    <header className="topbar">
      <Link to="/book1" className="brand" aria-label="Mellow Learners Playground home"><span className="brand-mark">M</span><span>Mellow Learners<small>Playground</small></span></Link>
      <div className="progress-wrap" aria-label={`${pct}% mission progress`}><span>{pct}%</span><div className="progress"><i style={{width:`${pct}%`}} /></div></div>
      <Link to="/book1" className="icon-button" aria-label="Mission Hub"><Home size={20}/></Link>
    </header>
    <main key={location.pathname} className="page-enter">
      <Routes>
        <Route index element={<Hub progress={progress}/>} />
        <Route path="story" element={<Story progress={progress}/>} />
        <Route path="think" element={<Think progress={progress}/>} />
        <Route path="timeline" element={<Timeline progress={progress}/>} />
        <Route path="challenge" element={<Challenge progress={progress}/>} />
        <Route path="design" element={<Navigate to="/book1/lander-lab" replace/>}/>
        <Route path="lander-lab" element={<LanderLab progress={progress}/>} />
        <Route path="missions" element={<MissionPicker/>}/>
        <Route path="mission/:slug" element={<Mission progress={progress}/>} />
        <Route path="ai-detective" element={<AiDetective progress={progress}/>} />
        <Route path="careers" element={<Careers progress={progress}/>} />
        <Route path="reflection" element={<Reflection progress={progress}/>} />
      </Routes>
    </main>
  </div>;
}

function Hub({progress}:{progress:ReturnType<typeof useProgress>}){
  return <>
    <section className="hero">
      <div><span className="eyebrow">Book 1 · Moon mission</span><h1>Giffy’s Moon<br/><em>Adventure</em></h1><p>Follow the story, investigate lunar clues, make engineering decisions and complete a mission of your own.</p><Link className="primary" to="/book1/story">Begin adventure <ArrowRight size={18}/></Link></div>
      <div className="moon-scene" aria-label="Giffy exploring the Moon"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="moon"><span>◌</span><span>·</span><span>○</span></div><div className="giffy"><div className="antenna"/><div className="face">•‿•</div><div className="body">GIFFY</div></div><div className="star s1">✦</div><div className="star s2">✧</div></div>
    </section>
    <section className="hub-section"><div className="section-heading"><div><span className="eyebrow">Your learning journey</span><h2>Eight steps. One big adventure.</h2></div><button className="text-button" onClick={progress.reset}><RotateCcw size={15}/> Reset progress</button></div>
      <div className="flow-grid">{learningFlow.map((item,i)=><Link to={item.route} className={`flow-card ${progress.done.includes(item.key)?'is-done':''}`} key={item.key}><span className="step">{progress.done.includes(item.key)?<Check size={16}/>:String(i+1).padStart(2,'0')}</span><h3>{item.label}</h3><p>{item.blurb}</p><ChevronRight className="card-arrow" size={20}/></Link>)}</div>
    </section>
    <section className="companion-strip"><div className="melluna">✦</div><div><span className="eyebrow">Meet Melluna</span><h2>Your calm mission guide</h2><p>Melluna gives clues and reflection prompts—without open chat or sharing personal information.</p></div><Link className="secondary" to="/book1/ai-detective">Try AI Detective</Link></section>
  </>;
}

function Page({step,title,kicker,children,next,complete}:{step:string,title:string,kicker:string,children:React.ReactNode,next?:string,complete:()=>void}){
  const nav=useNavigate();
  return <div className="content-page"><Link to="/book1" className="back"><ArrowLeft size={17}/> Mission Hub</Link><div className="page-title"><span className="eyebrow">{kicker}</span><h1>{title}</h1></div>{children}<div className="page-actions"><button className="primary" onClick={()=>{complete(); if(next) nav(next)}}>Mark complete {next&&<ArrowRight size={18}/>}</button><span>Your progress stays on this device.</span></div></div>;
}

function Story({progress}:{progress:ReturnType<typeof useProgress>}){return <Page step="story" kicker="Step 1 · Story" title="A signal from the Moon" complete={()=>progress.complete('story')} next="/book1/think"><div className="story-panel"><div className="story-visual"><div className="signal">)))</div><div className="mini-giffy">•‿•</div></div><div><p className="lead">Giffy has found a faint repeating signal hidden in Moon data. It could be a machine, a natural pattern—or simply noise.</p><p>To investigate, Giffy will need curiosity, careful evidence and a team of young mission thinkers. Your job is not to guess quickly. Your job is to notice, test and improve.</p><blockquote>“The best explorers change their minds when the evidence changes.” <strong>— Melluna</strong></blockquote></div></div></Page>}

function Think({progress}:{progress:ReturnType<typeof useProgress>}){
  const [thought,setThought]=useState('');
  return <Page step="think" kicker="Step 2 · Think & Wonder" title="What do you notice?" complete={()=>progress.complete('think')} next="/book1/timeline"><div className="prompt-grid">{['What could create a repeating signal?','What information would you collect first?','What might trick us into a wrong conclusion?'].map((q,i)=><label className="prompt-card" key={q}><span>0{i+1}</span><strong>{q}</strong><textarea aria-label={q} placeholder="Write or sketch your thinking…" value={i===0?thought:''} onChange={i===0?e=>setThought(e.target.value):undefined}/></label>)}</div></Page>
}

function Timeline({progress}:{progress:ReturnType<typeof useProgress>}){
 const [active,setActive]=useState(0); const item=timeline[active];
 return <Page step="explore" kicker="Step 3 · Explore" title="Moon exploration timeline" complete={()=>progress.complete('explore')} next="/book1/challenge"><div className="timeline"><div className="timeline-track">{timeline.map((x,i)=><button key={x.year} className={i===active?'active':''} onClick={()=>setActive(i)}><i/><span>{x.year}</span></button>)}</div><div className="timeline-detail"><span className="big-year">{item.year}</span><h2>{item.title}</h2><p>{item.text}</p><div className="wonder"><CircleHelp size={20}/><span><strong>Wonder:</strong> {item.question}</span></div></div></div></Page>
}

const readings=[{label:'Fuel reserve',value:'28%',good:true},{label:'Landing visibility',value:'Low',good:false},{label:'Guidance computer',value:'Ready',good:true},{label:'Surface wind',value:'None',good:true},{label:'Boulder risk',value:'High',good:false}];
function Challenge({progress}:{progress:ReturnType<typeof useProgress>}){
 const [choice,setChoice]=useState<'GO'|'NO-GO'|null>(null); const correct=choice==='NO-GO';
 return <Page step="challenge" kicker="Step 4 · Challenge" title="Make the landing call" complete={()=>progress.complete('challenge')} next="/book1/lander-lab"><p className="lead narrow">Mission control needs your decision. Read every data card—then choose GO or NO-GO.</p><div className="readings">{readings.map(r=><div className="reading" key={r.label}><span>{r.label}</span><strong>{r.value}</strong><i className={r.good?'good':'risk'}>{r.good?'stable':'check'}</i></div>)}</div><div className="decision"><button onClick={()=>setChoice('GO')} className={choice==='GO'?'chosen go':''}>GO</button><button onClick={()=>setChoice('NO-GO')} className={choice==='NO-GO'?'chosen no-go':''}>NO-GO</button></div>{choice&&<div className={`feedback ${correct?'correct':'try'}`}><strong>{correct?'Strong call.':'Look again.'}</strong> {correct?'Low visibility plus high boulder risk makes the landing unsafe. Pause, gather better data and choose a safer site.':'One strong reading cannot cancel two serious landing risks. Which risks could cause an unrecoverable failure?'}</div>}</Page>
}

function LanderLab({progress}:{progress:ReturnType<typeof useProgress>}){
 const [science,setScience]=useState(50),[safety,setSafety]=useState(65),[power,setPower]=useState(55); const mass=Math.round((science+safety+power)/3); const viable=mass<=65&&safety>=55&&power>=40;
 return <Page step="design" kicker="Step 5 · Design" title="Lander trade-off lab" complete={()=>progress.complete('design')} next="/book1/missions"><div className="lab"><div className="controls">{([['Science tools',science,setScience],['Safety systems',safety,setSafety],['Power supply',power,setPower]] as const).map(([l,v,set])=><label key={l}><span><strong>{l}</strong><b>{v}</b></span><input type="range" min="10" max="90" value={v} onChange={e=>set(Number(e.target.value))}/></label>)}</div><div className={`lander-result ${viable?'viable':'over'}`}><div className="lander-icon">△</div><span>Estimated mass</span><strong>{mass} units</strong><p>{viable?'Balanced for testing. Now explain which feature you protected most.':'This design is too risky or heavy. Reduce a feature without losing safe landing power.'}</p></div></div></Page>
}

function MissionPicker(){return <div className="content-page"><Link to="/book1" className="back"><ArrowLeft size={17}/> Mission Hub</Link><div className="page-title"><span className="eyebrow">Step 6 · Choose a Mission</span><h1>Pick your build path</h1><p className="lead">Each mission uses the same cycle: imagine → make → test → improve.</p></div><div className="mission-grid">{missions.map(m=><Link to={`/book1/mission/${m.slug}`} className="mission-card" key={m.slug}><span className="mission-icon">{m.icon}</span><span className="mission-meta">{m.minutes} min · {m.skill}</span><h2>{m.title}</h2><p>{m.prompt}</p><span className="mission-link">Open mission <ArrowRight size={17}/></span></Link>)}</div><Link className="career-link" to="/book1/careers"><Compass/> Not sure? Match your strengths to a Moon career.</Link></div>}

function Mission({progress}:{progress:ReturnType<typeof useProgress>}){
 const {slug}=useParams(); const mission=missions.find(m=>m.slug===slug); const [notes,setNotes]=useState(['','','']);
 if(!mission) return <Navigate to="/book1/missions" replace/>;
 const prompts=['Imagine: What problem will your idea solve?','Make: Describe or sketch your first version.','Test & improve: What changed after your test?'];
 return <Page step={mission.slug} kicker={`Mission · ${mission.skill}`} title={`${mission.icon} ${mission.title}`} complete={()=>progress.complete(mission.slug)} next="/book1/ai-detective"><div className="mission-brief"><p className="lead">{mission.prompt}</p><div className="materials"><strong>Use what you have:</strong> paper, pencil, building pieces or simple household materials. Ask an adult before using tools.</div></div><div className="workbook">{prompts.map((p,i)=><label key={p}><strong>{p}</strong><textarea value={notes[i]} onChange={e=>setNotes(v=>v.map((x,j)=>j===i?e.target.value:x))} placeholder="Record your idea here…"/></label>)}</div></Page>
}

function AiDetective({progress}:{progress:ReturnType<typeof useProgress>}){
 const claims=[{text:'The Moon makes its own light.',answer:false,why:'The Moon reflects sunlight.'},{text:'Evidence from more than one instrument can strengthen a conclusion.',answer:true,why:'Independent measurements help reduce error.'},{text:'A confident answer is always a correct answer.',answer:false,why:'Confidence is not evidence.'}]; const [answers,setAnswers]=useState<(boolean|null)[]>([null,null,null]);
 return <Page step="test" kicker="Step 7 · Test & Improve" title="AI Detective" complete={()=>progress.complete('test')} next="/book1/reflection"><p className="lead narrow">Melluna has collected three claims. Decide whether each is evidence-ready.</p><div className="claims">{claims.map((c,i)=><div className="claim" key={c.text}><Sparkles/><div><strong>{c.text}</strong>{answers[i]!==null&&<p>{answers[i]===c.answer?'Correct. ': 'Recheck. '}{c.why}</p>}</div><div className="claim-buttons"><button onClick={()=>setAnswers(v=>v.map((x,j)=>j===i?true:x))}>Reliable</button><button onClick={()=>setAnswers(v=>v.map((x,j)=>j===i?false:x))}>Question it</button></div></div>)}</div></Page>
}

function Careers({progress}:{progress:ReturnType<typeof useProgress>}){
 const [trait,setTrait]=useState('patterns'); const map:Record<string,[string,string]>= {patterns:['Data Scientist','Finds meaning in mission measurements.'],building:['Aerospace Engineer','Designs and tests systems for flight.'],asking:['Planetary Scientist','Investigates how worlds form and change.'],helping:['Flight Controller','Coordinates people and systems under pressure.']};
 return <Page step="careers" kicker="Bonus activity" title="Find your Moon-team role" complete={()=>progress.complete('careers')} next="/book1/reflection"><div className="career-lab"><div><h2>What feels most like you?</h2>{[['patterns','Spotting patterns'],['building','Building and fixing'],['asking','Asking big questions'],['helping','Helping a team decide']].map(([v,l])=><button className={trait===v?'selected':''} key={v} onClick={()=>setTrait(v)}>{l}</button>)}</div><div className="career-result"><span>Your possible role</span><h2>{map[trait][0]}</h2><p>{map[trait][1]}</p><small>This is a starting point, not a label. STEM teams need many strengths.</small></div></div></Page>
}

function Reflection({progress}:{progress:ReturnType<typeof useProgress>}){
 const [answers,setAnswers]=useState(['','','']); const prompts=['At first I thought…','The evidence that changed my thinking was…','Next time I would improve…'];
 return <Page step="reflect" kicker="Step 8 · Reflect" title="Mission debrief" complete={()=>progress.complete('reflect')}><div className="reflection"><div className="debrief"><div className="badge">✓</div><h2>Curiosity becomes skill when you reflect.</h2><p>There is no perfect first answer. Clear thinking grows through evidence, testing and revision.</p></div><div className="workbook">{prompts.map((p,i)=><label key={p}><strong>{p}</strong><textarea value={answers[i]} onChange={e=>setAnswers(v=>v.map((x,j)=>j===i?e.target.value:x))}/></label>)}</div></div></Page>
}

export default App;

