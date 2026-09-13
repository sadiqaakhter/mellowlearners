import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Send, Sparkles, X } from 'lucide-react';
import { answerQuestion } from '../../data/book1Activities';
import type { BookStageId } from '../../data/bookModules';
import { MellunaPortrait } from './Book1Play';
import { MELLUNA_GPT_URL } from '../../data/mellunaConfig';
import './playground.css';

type Help = { title: string; start: string; hint: string; example: string };
const help: Record<BookStageId | 'hub', Help> = {
  hub: { title: 'Your mission hub', start: 'Choose Giffy’s Moon Adventure. Start with the story, or continue your saved activity. Your explorer keeps its own discoveries in this browser.', hint: 'Use the eight steps at the top of a book to move around. You can explore a different step and come back.', example: 'Try this first: open Book 1, meet Giffy in Story, then click a question bubble in Think & Wonder.' },
  story: { title: 'Story', start: 'Giffy wants to visit the Moon. First, discover the problem: how can a lander slow down where parachutes will not work?', hint: 'Look for the difference between Earth and the Moon. What does a parachute need?', example: 'A useful story finding: “A parachute needs an atmosphere. A Moon lander needs another way to brake.” The animated video will be added later; you can read the story starter now.' },
  wonder: { title: 'Think & Wonder', start: 'Tap a question bubble to explore an answer. Write one thing you discovered in “My new finding”.', hint: 'Try starting a question with “Why”, “How” or “What if”. Think about landing, gravity, dust or fuel.', example: 'For example: “Could we use Moon ice for drinking water?” Use the question activity on the page to collect curiosity points. This help panel does not award points.' },
  explore: { title: 'Explore the landers', start: 'Choose a mission card to see its picture and facts. Drag it onto a year, or select the card and then tap the year. Press “Check my timeline” when ready.', hint: 'Start with the first human Moon landing. The two Apollo missions belong before the far-side landing and Chandrayaan-3.', example: 'Apollo 11 landed in 1969: select Apollo 11, then choose the 1969 slot. Its card fills the slot. Use each other mission’s clues to finish the puzzle.' },
  challenge: { title: 'GO / NO-GO & landing game', start: 'Compare every speed with the practice limit of 2 m/s. Complete the table, solve the new lander’s case, then submit your flight report for feedback.', hint: 'At or below 2 m/s means GO in this activity. Above 2 means NO-GO. In the game, start braking before you are close to the ground. Opening my help pauses a flying lander.', example: 'Worked example: 4 m/s is above 2 m/s, so call NO-GO. Subtract 4 − 2 = 2 m/s to find how much speed to remove. Now try the 3.5 m/s case. Real landing safety needs more than speed alone.' },
  design: { title: 'Design your lander', start: 'Choose what your lander needs to do. Try the design controls, then explain why your choices help Giffy.', hint: 'A design can improve one thing and make another harder. Look for trade-offs between stability, weight and what the lander carries.', example: '“I chose a wider base to help my model stay upright. I will check whether the extra material makes it too heavy.” That is a reason you can test, not just a guess.' },
  missions: { title: 'Choose a mission', start: 'Pick one mission card, read its steps and try its activity. Record what you did and what you noticed.', hint: 'Choose one small goal for your first attempt. You do not have to solve the whole mission perfectly at once.', example: 'For a gesture-AI mission, start with two clearly different gestures. Test each several times and count the correct predictions. Ask an adult before opening an outside tool or using a camera.' },
  test: { title: 'Test & Improve', start: 'Try your first design, record the result, change one feature and test again.', hint: 'Keep the other conditions the same. That makes it easier to tell whether your change helped.', example: '“My model tipped twice in three tries. I widened the legs and tested three more times from the same height.” Record your real results, even when a test does not work.' },
  reflection: { title: 'Reflect', start: 'Write what you discovered, the evidence you collected and what you would try next. Then complete your mission reflection.', hint: 'There is not just one right reflection. A clear observation and a reason are more useful than saying everything was perfect.', example: '“I used to think a parachute would work on the Moon. Now I know it needs an atmosphere. My next question is how much fuel a lander needs.” Write your own discovery.' },
};

export default function MellunaGuide({ stage = 'hub' }: { stage?: BookStageId | 'hub' }) {
  const current = help[stage];
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [reply, setReply] = useState(current.start);
  const [replyTitle, setReplyTitle] = useState('Let’s get started');
  const show = () => {
    window.dispatchEvent(new Event('mellow-help-open'));
    dialog.current?.showModal();
    setOpen(true);
  };
  const close = () => { dialog.current?.close(); };
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const explain = (title: string, text: string) => { setReplyTitle(title); setReply(text); };
  return <>
    <button ref={launcher} className="melluna-launcher" onClick={show} aria-label="Ask Melluna for learning help" aria-haspopup="dialog" aria-expanded={open} aria-controls="melluna-help-dialog">
      <span className="melluna-hologram"><MellunaPortrait/></span><span className="melluna-launcher-label">Ask Melluna</span>
    </button>
    <dialog ref={dialog} id="melluna-help-dialog" className="melluna-guide" aria-labelledby="melluna-guide-title" onClick={(e) => { if (e.target === e.currentTarget) close(); }} onClose={() => { setOpen(false); launcher.current?.focus(); }}>
      <header className="melluna-guide-header"><MellunaPortrait/><div><p>Your Moon guide</p><h2 id="melluna-guide-title">Hello, explorer!</h2></div><button autoFocus onClick={close} aria-label="Close Melluna help"><X size={22}/></button></header>
      <div className="melluna-guide-body">
        <p className="melluna-context"><Sparkles size={17}/>With you in {current.title}</p>
        <p className="melluna-guide-intro">Let’s work it out together. What would help?</p>
        <div className="melluna-quick-help"><button onClick={() => explain('Let’s get started', current.start)}>Help me start</button><button onClick={() => explain('A little hint', current.hint)}><Lightbulb size={16}/>Give me a hint</button><button onClick={() => explain('An example to learn from', current.example)}>Show an example</button></div>
        <section className="melluna-guide-reply" aria-live="polite" aria-atomic="true"><h3>{replyTitle}</h3><p>{reply}</p></section>
        <form onSubmit={(e) => { e.preventDefault(); if (question.trim().length < 5) return; const answer = answerQuestion(question); explain(answer.key ? 'From my Moon learning library' : 'Let’s investigate', answer.answer); }}>
          <label htmlFor="melluna-help-question">Ask about the Moon or landing</label><textarea id="melluna-help-question" rows={2} minLength={5} maxLength={240} required value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Why can’t we use a parachute on the Moon?"/>
          <button className="play-button" disabled={question.trim().length < 5}><Send size={17}/>Ask Melluna</button>
        </form>
        <p className="melluna-guide-disclosure">Guided help, not live AI. I use a prepared answer library and cannot answer everything or read your work. Use the activity’s check or submit button for feedback. Please leave out names and personal details. Questions here are not saved or sent anywhere.</p>
        <details className="melluna-adult-help"><summary>For parents & teachers: Melluna GPT</summary><p>Our original Melluna GPT opens separately in ChatGPT and requires a ChatGPT sign-in. For children under 13, an adult must conduct the conversation. It does not receive this explorer’s notes, answers or progress, and cannot save results back here.</p><p>Link access is awaiting verification. If ChatGPT says “Page not found”, use the on-page help while the owner checks access.</p><label><input type="checkbox" checked={adultConfirmed} onChange={(e) => setAdultConfirmed(e.target.checked)}/>I am an adult and will use ChatGPT myself.</label>{adultConfirmed && <a href={MELLUNA_GPT_URL} target="_blank" rel="noopener noreferrer" className="play-button">Open Melluna GPT in ChatGPT ↗</a>}</details>
      </div>
    </dialog>
  </>;
}
