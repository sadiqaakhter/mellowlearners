export const learningFlow = [
  {key:'story', label:'Story', route:'/book1/story', blurb:'Meet Giffy and discover the Moon mission.'},
  {key:'think', label:'Think & Wonder', route:'/book1/think', blurb:'Notice clues and ask a big question.'},
  {key:'explore', label:'Explore', route:'/book1/timeline', blurb:'Travel through milestones in Moon exploration.'},
  {key:'challenge', label:'Challenge', route:'/book1/challenge', blurb:'Read mission data and make a GO / NO-GO call.'},
  {key:'design', label:'Design', route:'/book1/lander-lab', blurb:'Balance safety, science, power and mass.'},
  {key:'choose', label:'Choose a Mission', route:'/book1/missions', blurb:'Pick a hands-on path that fits your curiosity.'},
  {key:'test', label:'Test & Improve', route:'/book1/ai-detective', blurb:'Test ideas, spot weak evidence and revise.'},
  {key:'reflect', label:'Reflect', route:'/book1/reflection', blurb:'Capture what changed in your thinking.'},
] as const;

export const missions = [
  {slug:'gesture-ai', title:'Gesture AI', icon:'✋', minutes:20, skill:'AI + prototyping', prompt:'Design hand signals a Moon rover could understand.'},
  {slug:'crater-mapper', title:'Crater Mapper', icon:'◌', minutes:15, skill:'Data + patterns', prompt:'Compare crater clues and choose a safer landing zone.'},
  {slug:'rover-route', title:'Rover Route', icon:'↗', minutes:20, skill:'Coding + logic', prompt:'Sequence commands to guide a rover around hazards.'},
  {slug:'moon-habitat', title:'Moon Habitat', icon:'⌂', minutes:25, skill:'Engineering', prompt:'Build a habitat plan around real Moon constraints.'},
] as const;

export const timeline = [
  {year:'1959', title:'First close look', text:'Luna 3 returned the first images of the Moon’s far side.', question:'Why was the far side hidden from Earth?'},
  {year:'1969', title:'People walk on the Moon', text:'Apollo 11 carried the first humans to the lunar surface.', question:'What systems had to work together?'},
  {year:'1972', title:'Apollo’s final landing', text:'Apollo 17 completed the last crewed Moon landing of the Apollo era.', question:'What evidence can astronauts collect directly?'},
  {year:'2008', title:'A new lunar view', text:'Chandrayaan-1 helped confirm water molecules on the Moon.', question:'How could water change mission design?'},
  {year:'2023', title:'Landing near the south pole', text:'Chandrayaan-3 achieved a soft landing in the Moon’s southern polar region.', question:'Why explore difficult polar terrain?'},
] as const;

