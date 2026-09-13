import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Rocket } from 'lucide-react';

export type Flight = { altitude: number; speed: number; fuel: number; status: 'ready' | 'flying' | 'paused' | 'landed' | 'crashed'; elapsed: number };
export const newFlight = (): Flight => ({ altitude: 60, speed: 3.5, fuel: 24, status: 'ready', elapsed: 0 });
export function advanceFlight(flight: Flight, thrust: boolean, dt: number): Flight {
  if (flight.status !== 'flying') return flight;
  const burn = thrust && flight.fuel > 0;
  const speed = Math.max(-4, flight.speed + (1.62 - (burn ? 4.5 : 0)) * dt);
  const altitude = Math.max(0, flight.altitude - (flight.speed + speed) * 0.5 * dt);
  return { altitude, speed, fuel: Math.max(0, flight.fuel - (burn ? dt : 0)), elapsed: flight.elapsed + dt, status: altitude <= 0 ? (speed <= 2 ? 'landed' : 'crashed') : 'flying' };
}

export default function LanderGame({ onLanding }: { onLanding: (speed: number, success: boolean) => void }) {
  const [flight, setFlight] = useState<Flight>(newFlight);
  const [burning, setBurning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const thrust = useRef(false);
  const delivered = useRef(false);
  const control = (active: boolean) => { thrust.current = active; setBurning(active); };

  useEffect(() => {
    if (flight.status !== 'flying') return;
    const timer = window.setInterval(() => setFlight((previous) => advanceFlight(previous, thrust.current, 0.05)), 50);
    return () => window.clearInterval(timer);
  }, [flight.status]);
  useEffect(() => {
    const release = () => control(false);
    const pause = () => { release(); setFlight((f) => f.status === 'flying' ? { ...f, status: 'paused' } : f); };
    const visibility = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause);
    window.addEventListener('mellow-help-open', pause);
    window.addEventListener('pointerup', release);
    window.addEventListener('keyup', release);
    document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('blur', pause); window.removeEventListener('mellow-help-open', pause); window.removeEventListener('pointerup', release); window.removeEventListener('keyup', release); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if ((flight.status === 'landed' || flight.status === 'crashed') && !delivered.current) {
      delivered.current = true;
      control(false);
      onLanding(flight.speed, flight.status === 'landed');
    }
  }, [flight.status, flight.speed, onLanding]);
  const reset = () => { control(false); delivered.current = false; setFlight(newFlight()); };
  const start = () => { if (flight.status === 'ready') setAttempts((n) => n + 1); setFlight((f) => ({ ...f, status: 'flying' })); };

  return <section id="landing-game" className="lander-game" style={{ scrollMarginTop: 135 }} aria-label="Moon landing game">
    <div className="play-heading"><div><p className="play-eyebrow">Play the science</p><h3>Land Giffy safely</h3></div><span className="play-pill">Flight {Math.max(1, attempts)}</span></div>
    <p className="play-intro">Hold the thruster to brake. Release to fall. Touch down at <strong>2 m/s or less</strong>. Fuel is limited!</p>
    <div className="flight-stats"><div><span>Height</span><b>{flight.altitude.toFixed(1)} <small>m</small></b></div><div><span>{flight.speed < 0 ? 'Rising' : 'Falling'}</span><b className={flight.speed > 2 ? 'text-amber-300' : 'text-emerald-300'}>{Math.abs(flight.speed).toFixed(1)} <small>m/s</small></b></div><div><span>Fuel</span><b>{Math.round(flight.fuel / 24 * 100)}<small>%</small></b></div></div>
    <div className="moon-game-scene" role="region" aria-label={`Lander ${flight.altitude.toFixed(1)} metres above the Moon, ${flight.status}`}>
      <div className="game-earth" /><span className="game-star star-one">✦</span><span className="game-star star-two">✧</span>
      <div className="game-craft" style={{ bottom: `${22 + Math.min(76, flight.altitude / 80 * 60)}%` }}>
        <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M28 70 15 100M92 70l13 30M8 100h25m54 0h25" stroke="#d2b9e9" strokeWidth="7" strokeLinecap="round"/><path d="M25 50 42 22h36l17 28v30H25Z" fill="#edce86" stroke="#fff" strokeWidth="3"/><rect x="42" y="37" width="36" height="26" rx="10" fill="#373354"/><circle cx="53" cy="49" r="3" fill="white"/><circle cx="67" cy="49" r="3" fill="white"/><path d="M52 58q8 5 16 0" stroke="white" fill="none" strokeWidth="2"/><path d="m50 82-8 15h36l-8-15" fill="#b8a0d5"/>{burning && flight.fuel > 0 && flight.status === 'flying' && <path d="m48 98 12 22 12-22" fill="#ffbd57"/>}</svg>
      </div>
      <div className="moon-ground"><div className="landing-pad">LANDING ZONE</div></div>
      {(flight.status === 'ready' || flight.status === 'paused') && <div className="game-overlay"><p>{flight.status === 'ready' ? 'You are the flight controller.' : 'Flight paused'}</p><button className="play-button" onClick={start}><Play size={18}/>{flight.status === 'ready' ? 'Start flight' : 'Resume flight'}</button></div>}
      {(flight.status === 'landed' || flight.status === 'crashed') && <div className="game-overlay" role="status"><h4>{flight.status === 'landed' ? 'Safe landing!' : 'A hard landing. Try again!'}</h4><p>Touchdown: {flight.speed.toFixed(2)} m/s</p><p>{flight.status === 'landed' ? 'Your braking kept Giffy within the practice limit.' : 'Start braking earlier. Aim for a slow descent near the surface.'}</p><button className="play-button" onClick={reset}><RotateCcw size={18}/>New flight</button></div>}
    </div>
    <div className="game-controls"><button className={`thruster-button ${burning ? 'is-burning' : ''}`} disabled={flight.status !== 'flying' || flight.fuel <= 0} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); control(true); }} onPointerUp={() => control(false)} onPointerCancel={() => control(false)} onLostPointerCapture={() => control(false)} onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); control(true); } }} onKeyUp={() => control(false)} onBlur={() => control(false)}><Rocket size={22}/>Hold to fire thruster</button><button className="play-secondary" disabled={flight.status !== 'flying'} onClick={() => { control(false); setFlight((f) => ({ ...f, status: 'paused' })); }} aria-label="Pause flight"><Pause size={20}/></button><button className="play-secondary" onClick={reset} aria-label="Reset flight"><RotateCcw size={20}/></button></div>
    <p className="play-fine">Keyboard: focus the thruster, then hold Space or Enter. Practice simulation: vertical motion only; real landings also depend on terrain, attitude and many other systems.</p>
  </section>;
}
