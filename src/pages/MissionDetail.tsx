import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  Lightbulb, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Trophy
} from 'lucide-react';
import { useState } from 'react';
import { curriculumData } from '../data/curriculum';

export default function MissionDetail() {
  const { missionId } = useParams<{ missionId: string }>();
  const mission = curriculumData.missions.find(m => m.id === missionId);
  const [currentStep, setCurrentStep] = useState(0);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 text-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Mission Not Found</h1>
          <Link to="/lms/curriculum" className="text-brand-green font-bold hover:underline">Back to Explorer</Link>
        </div>
      </div>
    );
  }

  const step = mission.steps[currentStep];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/lms/curriculum" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-slate-500" />
            </Link>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900">{mission.title}</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mission.topic} • Step {currentStep + 1} of {mission.steps.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</p>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-brand-green transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / mission.steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[40px] overflow-hidden border border-slate-200 shadow-sm"
            >
              {/* Step Media */}
              <div className="aspect-video bg-slate-100 relative group">
                {step.videoUrl ? (
                  <iframe 
                    src={step.videoUrl} 
                    className="w-full h-full"
                    title={step.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img 
                    src={step.image || mission.thumbnail} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {!step.videoUrl && (
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                )}
              </div>

              {/* Step Content */}
              <div className="p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center font-black">
                    {currentStep + 1}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{step.title}</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                  {step.description}
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                      currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ChevronLeft size={20} /> Previous Step
                  </button>
                  
                  {currentStep < mission.steps.length - 1 ? (
                    <button 
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex items-center gap-2 px-8 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-brand-green/90 shadow-lg shadow-green-200 transition-all"
                    >
                      Next Step <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button 
                      className="flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue/90 shadow-lg shadow-blue-200 transition-all"
                    >
                      Complete Mission <Trophy size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Helping Guide */}
            <section className="bg-brand-blue/5 p-8 rounded-[40px] border border-brand-blue/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Helping Guide</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                {mission.helpingGuide}
              </p>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Fun Facts */}
            <section className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Fun Facts</h3>
              </div>
              <div className="space-y-4">
                {mission.funFacts.map((fact, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                    {fact}
                  </div>
                ))}
              </div>
            </section>

            {/* Mission Checklist */}
            <section className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Mission Checklist</h3>
              <div className="space-y-4">
                {mission.steps.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                      idx === currentStep ? 'bg-brand-green/5 border-brand-green' : 
                      idx < currentStep ? 'bg-slate-50 border-slate-100 opacity-60' : 
                      'bg-white border-slate-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      idx === currentStep ? 'bg-brand-green text-white' : 
                      idx < currentStep ? 'bg-brand-green text-white' : 
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {idx < currentStep ? <CheckCircle2 size={16} /> : <span className="text-xs font-black">{idx + 1}</span>}
                    </div>
                    <span className={`text-sm font-bold ${idx === currentStep ? 'text-slate-900' : 'text-slate-500'}`}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
