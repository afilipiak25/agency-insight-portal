
import { ReactElement } from "react";

export interface WorkflowStep {
  id: number;
  sequenceNum: number;
  type: string;
  icon: ReactElement;
  title: string;
  content: string;
  waitDays: number;
  status?: 'completed' | 'in-progress' | 'not-met' | 'missing-inputs';
  personalized?: boolean;
  color?: string;
  
  // Communication channel related fields
  channel?: 'email' | 'linkedin' | 'profile-visit' | 'instagram' | 'other';
  promptTemplate?: string;
  useCase?: 'web-research' | 'content-creation' | 'other';
  model?: string;
  lastExecuted?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  channel: 'email' | 'linkedin' | 'profile-visit' | 'instagram' | 'other';
  content: string;
  context?: string;
  important?: string;
}

export const DEFAULT_PROMPT_TEMPLATES: { [key: string]: string } = {
  'email': `#CONTEXT#
Erstelle eine kurze, personalisierte E-Mail auf Deutsch, basierend auf:
- Name: #FirstName# #LastName#
- Firma: #CompanyName#
- Position: #JobTitle#
- LinkedIn-Profil: #LinkedInProfile#
- Branche: #Industry#
- Technologien: #Technologies#
Erwähne unsere Firma Intellywave und unsere Referenzen (z.B. Egon Zehnder, Kienbaum).

#IMPORTANT#
Nutze freundlichen, aber professionellen Ton, z.B. "Hallo #FirstName#, ...".`,

  'linkedin': `#CONTEXT#
Erstelle eine LinkedIn-Nachricht auf Deutsch, die sich auf die Infos aus der Tabelle bezieht:
- Name: #FirstName# #LastName#
- Firma: #CompanyName#
- Position: #JobTitle#
- Letzte Aktivität: #LastLinkedInActivity# (falls vorhanden)
- Branche: #Industry#
- Technologien: #Technologies#
Formuliere es kurz und persönlich, sprich #FirstName# direkt an.`,

  'profile-visit': `#CONTEXT#
Dieser Schritt ist kein Text, sondern eine Aktion: "Profil besuchen".
- Öffne das LinkedIn-Profil: #LinkedInProfile#
- Optional: Kurzer Satz, den wir vermerken, falls wir eine kurze Notiz hinterlassen wollen.
- Z.B.: "Besuche Profil von #FirstName#, lass ein Profil-View da, ggf. like einen Post."`,

  'instagram': `#CONTEXT#
Erstelle eine DM (Instagram) auf Deutsch, basierend auf:
- Name: #FirstName# #LastName#
- Instagram-Account: #InstagramHandle# (falls vorhanden)
- Firma: #CompanyName#
- Position: #JobTitle#
- Branche: #Industry#
Nutze lockeren Ton, aber professionell. Kurz, maximal 2-3 Sätze.`,

  'email-followup': `#CONTEXT#
Erstelle eine zweite E-Mail auf Deutsch, die als Follow-up dient.
- Name: #FirstName# #LastName#
- Firma: #CompanyName#
- Position: #JobTitle#
- Branche: #Industry#
- Technologien: #Technologies#
- Baue auf der ersten E-Mail auf, erwähne evtl. unser Meeting-Wunsch oder unser Angebot.
- Bleib kurz, aber freundlich.`
};

