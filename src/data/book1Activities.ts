export const wonderQuestions = [
  { id: 'speed', question: 'How fast is a rocket actually going when it reaches the Moon?', answer: 'There is no single arrival speed. A spacecraft travels quickly on its journey, then uses engines to slow down for orbit and landing. Touchdown needs to be gentle.', tags: ['fast', 'speed', 'reaches', 'arrives'], color: 'teal' },
  { id: 'crash', question: 'Has a lander ever crashed? What happened?', answer: 'Yes. Chandrayaan-2’s Vikram lander did not achieve a soft landing in 2019. Engineers study flight data after a failure to improve the next mission. Chandrayaan-3 landed successfully in 2023.', tags: ['crash', 'crashed', 'failed', 'failure'], color: 'teal' },
  { id: 'distance', question: 'How do astronauts know when they are close enough to land?', answer: 'Radar, cameras and other sensors help estimate height, speed and the surface below. Computers and flight crews use this evidence to guide the descent.', tags: ['close', 'height', 'distance', 'sensors', 'radar'], color: 'pink' },
  { id: 'stable', question: 'What stops a lander from tipping over when it touches down?', answer: 'A wide base, a low centre of mass, suitable landing legs and a gentle touchdown help. Engineers also avoid steep slopes and large rocks. Try changing one feature in your own model.', tags: ['tip', 'tipping', 'stable', 'stability', 'balance'], color: 'blue' },
  { id: 'better', question: 'Could a person design a better lander than NASA?', answer: 'You can invent an improvement! First choose what “better” means: lighter, safer, cheaper or able to carry more science. Test your idea with evidence. Real spacecraft need many specialists working together.', tags: ['better', 'nasa', 'person'], color: 'blue' },
  { id: 'walk', question: 'If the Moon has no air, what does it feel like to walk there?', answer: 'The Moon’s gravity is about one-sixth of Earth’s, so you weigh less and can take bouncy steps. A spacesuit supplies breathable air and pressure. Low gravity and no breathable air are different things.', tags: ['walk', 'walking', 'feel', 'jump', 'gravity'], color: 'pink' },
  { id: 'legs', question: 'Why do some landers have legs and some don’t?', answer: 'Engineers choose a landing system for the destination and mission. Legs can support a lunar lander and absorb impact. Some missions elsewhere use airbags or other systems. Every design has trade-offs.', tags: ['legs', 'leg', 'airbags'], color: 'pink' },
  { id: 'thrusters', question: 'What do rockets use instead of parachutes to slow down?', answer: 'On the Moon, landers use rocket engines to slow their descent. Engines push exhaust downward and the spacecraft is pushed upward. Parachutes need an atmosphere; the Moon’s extremely thin exosphere cannot help them slow a lander.', tags: ['parachute', 'parachutes', 'thruster', 'thrusters', 'slow', 'brake'], color: 'gold' },
  { id: 'test', question: 'What would YOU test first if you had to build one?', answer: 'There is more than one good answer. A useful first test is stability: will a small model stay upright? Keep the drop height the same, change one feature, and compare the results.', tags: ['test', 'testing', 'first', 'build'], color: 'gold' },
  { id: 'design', question: 'What would YOUR lander look like?', answer: 'That is your design decision! Start with a drawing. Label the body, legs, engines and science tools. Explain how one feature helps the mission, then build a small model to test it.', tags: ['look', 'looks', 'design', 'shape', 'drawing'], color: 'blue' },
] as const;

export const extraKnowledge = [
  { id: 'ice', tags: ['water', 'ice', 'drink'], answer: 'Scientists have found evidence of water ice in some permanently shadowed areas near the Moon’s poles. Turning it into drinking water or fuel would need equipment and energy.' },
  { id: 'sound', tags: ['sound', 'hear', 'talk', 'radio'], answer: 'Sound needs a material such as air to travel through. Outside a spacesuit, the Moon has no useful air for sound. Astronauts use radios: radio waves can travel through space.' },
  { id: 'fuel', tags: ['fuel', 'empty', 'runs out'], answer: 'Thrusters need propellant. If it runs out during descent, the lander cannot keep braking. Engineers plan reserves. In our landing game, short burns help you save fuel.' },
  { id: 'dust', tags: ['dust', 'soil', 'sand'], answer: 'The Moon’s surface is covered with broken rock and fine dust called regolith. Dust can get into equipment, so engineers design protection for instruments and moving parts.' },
  { id: 'power', tags: ['solar', 'power', 'battery', 'electricity', 'night'], answer: 'Many Moon spacecraft use solar panels and batteries. Long darkness can make power and temperature difficult to manage. A mission’s location and duration affect its power design.' },
] as const;

export const lunarMissions = [
  { id: 'apollo11', name: 'Apollo 11', year: '1969', date: '20 July 1969', image: 'apollo-11.jpg', caption: 'Eagle’s ascent stage returning from the Moon.', credit: 'NASA', fact: 'The first crewed Moon landing. Eagle carried Neil Armstrong and Buzz Aldrin to the surface.', clue: 'The first human footsteps came before the rover adventures.', source: 'https://science.nasa.gov/resource/eagles-return/' },
  { id: 'apollo17', name: 'Apollo 17', year: '1972', date: '11 December 1972', image: 'apollo-17.jpg', caption: 'Gene Cernan drives the rover; the lunar module is behind him.', credit: 'NASA / Harrison Schmitt', fact: 'The final Apollo landing mission carried astronauts and a rover to Taurus–Littrow for surface exploration.', clue: 'This Apollo mission followed Apollo 11 by three years.', source: 'https://science.nasa.gov/resource/apollo-17-gene-cernan-in-lunar-roving-vehicle/' },
  { id: 'change4', name: 'Chang’e 4', year: '2019', date: '3 January 2019', image: 'change-4.png', caption: 'NASA’s orbital view: the tiny marked spot is the landing site.', credit: 'NASA / GSFC / Arizona State University', fact: 'China’s Chang’e 4 made the first soft landing on the Moon’s far side. NASA’s LRO later photographed its location.', clue: 'The far-side landing happened four years before Chandrayaan-3.', source: 'https://science.nasa.gov/resource/first-look-change-4/' },
  { id: 'chandrayaan3', name: 'Chandrayaan-3', year: '2023', date: '23 August 2023', image: 'chandrayaan-3.png', caption: 'NASA’s orbital view of the landing site and its bright halo.', credit: 'NASA / GSFC / Arizona State University', fact: 'India’s Vikram lander touched down in the southern polar region, about 600 km from the South Pole. It carried the Pragyan rover.', clue: 'This is the most recent landing in this four-piece puzzle.', source: 'https://www.nasa.gov/image-article/nasas-lro-observes-chandrayaan-3-landing-site/' },
] as const;

// Values transcribed from the supplied Book 1 spread. These are practice values,
// not independently verified spacecraft telemetry or universal landing limits.
export const practiceReadings = [
  { mission: 'Apollo 11', year: 1969, speed: 0.9 },
  { mission: 'Apollo 12', year: 1969, speed: 1.1 },
  { mission: 'Apollo 15', year: 1971, speed: 1.6 },
  { mission: 'Chandrayaan-2', year: 2019, speed: 58 },
  { mission: 'Chang’e 4', year: 2019, speed: 1.8 },
  { mission: 'Chandrayaan-3', year: 2023, speed: 0.98 },
];

export function normalizeQuestion(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

export function answerQuestion(value: string) {
  const normalized = normalizeQuestion(value);
  const words = normalized.split(' ');
  const exact = wonderQuestions.find((q) => normalizeQuestion(q.question) === normalized);
  if (exact) return { key: exact.id, points: 1, answer: exact.answer, label: 'Book question' };
  const extra = extraKnowledge.find((q) => q.tags.some((tag) => normalized.includes(tag)));
  if (extra && /^(why|how|what|could|can|does|do|is|are|would|will|where|when)\b/.test(normalized) && words.length >= 5) return { key: extra.id, points: 2, answer: extra.answer, label: 'New question topic' };
  const related = wonderQuestions.find((q) => q.tags.some((tag) => words.includes(tag)));
  if (related && words.length >= 5) return { key: related.id, points: 1, answer: related.answer, label: 'Related book question' };
  return { key: '', points: 0, answer: 'I don’t have a checked answer for that question yet. Try asking about landing, gravity, fuel, water, sound or Moon dust. Keep your question to explore with a teacher too!', label: 'Let’s investigate' };
}
