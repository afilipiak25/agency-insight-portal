
export interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  location: string;
  companyDomain: string;
  linkedinProfile: string;
  company: string;
  scrapeWebsite: boolean;
  emailStatus: 'found' | 'not_found' | 'missing';
  email?: string;
}

export const mockLeadData: Lead[] = [
  {
    id: 1,
    firstName: 'Sandra',
    lastName: 'Franziska',
    fullName: 'Sandra Franziska Schmitt',
    jobTitle: 'Managing Partner & Founder',
    location: 'Greater Nuremberg Metropolitan Area',
    companyDomain: 'globemee.com',
    linkedinProfile: 'https://www.linkedin.com/in/sandra-franziska-schmitt',
    company: 'Globemee',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'sandra.schmitt@globemee.com'
  },
  {
    id: 2,
    firstName: 'Elisabeth',
    lastName: 'Pongratz',
    fullName: 'Elisabeth Pongratz',
    jobTitle: 'Partner',
    location: 'Greater Munich Metropolitan Area',
    companyDomain: 'comesdigital.de',
    linkedinProfile: 'https://www.linkedin.com/in/elisabeth-pongratz',
    company: 'COMES Digital GmbH',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'ep@comesdigital.de'
  },
  {
    id: 3,
    firstName: 'Gunnar',
    lastName: 'Belden',
    fullName: 'Gunnar Belden',
    jobTitle: 'Owner, Managing Director',
    location: 'Potsdam, Brandenburg, Germany',
    companyDomain: 'maturias.de',
    linkedinProfile: 'https://www.linkedin.com/in/gunnar-belden',
    company: 'maturias Personalberatung',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'gunnar.belden@maturias.de'
  },
  {
    id: 4,
    firstName: 'Jasmin',
    lastName: 'Ohme',
    fullName: 'Jasmin Ohme',
    jobTitle: 'Founder & CEO',
    location: 'Hamburg, Germany',
    companyDomain: 'daskontaktwerk.de',
    linkedinProfile: 'https://www.linkedin.com/in/jasmin-ohme',
    company: 'Das Kontaktwerk',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'j.ohme@daskontaktwerk.de'
  },
  {
    id: 5,
    firstName: 'Baris',
    lastName: 'Kartal',
    fullName: 'Baris Kartal',
    jobTitle: 'Managing Partner',
    location: 'Frankfurt Rhine-Main Metropolitan Region',
    companyDomain: 'signium.de',
    linkedinProfile: 'https://www.linkedin.com/in/baris-kartal',
    company: 'Signium Deutschland',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'baris.kartal@signium.de'
  },
  {
    id: 6,
    firstName: 'Natalia',
    lastName: 'Wallroth',
    fullName: 'Natalia Wallroth',
    jobTitle: 'Co-Founder & CEO',
    location: 'Berlin Metropolitan Area',
    companyDomain: 'mintdcareers.com',
    linkedinProfile: 'https://www.linkedin.com/in/nataliawallroth',
    company: '2hearts',
    scrapeWebsite: true,
    emailStatus: 'not_found',
    email: undefined
  },
  {
    id: 7,
    firstName: 'Daniel',
    lastName: 'Sedgwick',
    fullName: 'Daniel Sedgwick',
    jobTitle: 'Co-Founder',
    location: 'Berlin, Berlin, Germany',
    companyDomain: 'satellite-talent.com',
    linkedinProfile: 'https://www.linkedin.com/in/danielsedgwicktalentpartner',
    company: 'Satellite Talent',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'daniel@satellite-talent.com'
  },
  {
    id: 8,
    firstName: 'Luke',
    lastName: 'Williams',
    fullName: 'Luke Williams',
    jobTitle: 'Founder',
    location: 'Munich, Bavaria, Germany',
    companyDomain: '',
    linkedinProfile: 'https://www.linkedin.com/in/luke-williams-headhunter',
    company: 'TalentStax LTD',
    scrapeWebsite: false,
    emailStatus: 'missing',
    email: undefined
  },
  {
    id: 9,
    firstName: 'Bosko',
    lastName: 'Todorovic',
    fullName: 'Bosko Todorovic',
    jobTitle: 'Partner',
    location: 'Berlin Metropolitan Area',
    companyDomain: 'hireonfire.ai',
    linkedinProfile: 'https://www.linkedin.com/in/boskotodorovic',
    company: 'HireOnFire',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'bosko@hireonfire.ai'
  },
  {
    id: 10,
    firstName: 'Faruk',
    lastName: 'Ekici',
    fullName: 'Faruk Ekici',
    jobTitle: 'Founder & Director',
    location: 'Frankfurt, Hesse, Germany',
    companyDomain: 'feiyrecruitment.com',
    linkedinProfile: 'https://www.linkedin.com/in/faruk-ekici-b4aa20188',
    company: 'FEIY Recruitment GmbH',
    scrapeWebsite: true,
    emailStatus: 'found',
    email: 'f.ekici@feiyrecruitment.com'
  }
];
