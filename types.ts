
export enum Channel {
  EMAIL = 'Email',
  LINKEDIN = 'LinkedIn DM',
  TEXT = 'Text',
  HANDWRITTEN = 'Handwritten'
}

export enum Formality {
  EXECUTIVE = 'Executive',
  PROFESSIONAL = 'Professional (default)',
  FRIENDLY = 'Friendly'
}

export enum Length {
  SHORT = 'Short',
  STANDARD = 'Standard',
  ELEVATED = 'Elevated'
}

export interface Recipient {
  id: string;
  name: string;
  role: string;
  relationship: string;
  formality: Formality;
  channel: Channel;
  notes: string;
}

export interface GeneratorInputs {
  recipientName: string;
  recipientRole: string;
  occasion: string;
  detail: string;
  impact?: string;
  nextStep: string;
  channel: Channel;
  length: Length;
  tone: Formality;
}

export interface GeneratedNote {
  id: string;
  subject?: string;
  body: string;
  alternates?: {
    label: string;
    content: string;
  }[];
  score?: number;
}
