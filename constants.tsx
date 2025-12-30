
export const KNOWLEDGE_BASE = {
  voice: `Core Voice Principles:
- Warm-professional, confident, human
- Crisp over clever
- Respectful, never gushy
- Forward-moving by default
- Sounds like a real person who pays attention

Style Rules:
- Email: 4–7 sentences
- LinkedIn DM/Text: 2–3 sentences
- Handwritten: 3–5 short lines
- Plain language > polished fluff
- No emojis unless explicitly requested
- No exclamation points by default

Banned / Overused:
- "I just wanted to..."
- "Thank you so much for your time..."
- "It means the world..."
- "Truly / sincerely / deeply" (unless elevated and earned)
- Vague praise with no proof ("Great meeting", "So insightful")`,

  playbook: `The Reagan Formula:
1. Thanks + context — what I’m thanking them for
2. Impact — why it mattered
3. Specific detail — proof I was paying attention
4. Forward motion — next step or relationship signal
5. Clean close

Belated Pattern: Briefly acknowledge delay. Lead with gratitude, not apology. Shorter than normal.
Approved opener: "I’ve been meaning to reach out since [moment]—your [specific action] stuck with me."`,
  
  signoffs: ["Thanks again,", "Appreciate it,", "With thanks,", "Best,", "Gratefully,"],
  
  templates: {
    A: "Email (Standard)",
    B: "LinkedIn DM",
    C: "Text Message",
    D: "Handwritten Card",
    E: "Belated Thank-You",
    F: "Thank-You + Follow-Up"
  }
};

export const INITIAL_RECIPIENTS = [
  {
    id: '1',
    name: 'Jordan Lee',
    role: 'VP Marketing, Acme',
    relationship: 'Prospect',
    formality: 'Executive' as any,
    channel: 'Email' as any,
    notes: 'Hates fluff; likes clarity'
  },
  {
    id: '2',
    name: 'Sam Rivera',
    role: 'Founder, StudioX',
    relationship: 'Partner',
    formality: 'Professional (default)' as any,
    channel: 'LinkedIn DM' as any,
    notes: 'Fast-moving, direct'
  },
  {
    id: '3',
    name: 'Taylor Kim',
    role: 'Friend',
    relationship: 'Friendly',
    formality: 'Friendly' as any,
    channel: 'Text' as any,
    notes: 'Keep it light'
  }
];
