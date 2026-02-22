import yaml from 'js-yaml';
import personalYaml from './personal.yaml?raw';

export interface PersonalInformation {
  name: string;
  title: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  personalWebsiteUrl: string;
  contact: Contact;
  work: Work[];
  certifications: Certificate[];
  skills: string[];
}

export interface Contact {
  email: string;
  tel: string;
  social: Social[];
}

export interface Social {
  name: string;
  url: string;
}

interface Role {
  title: string;
  start: string;
  end: string | null;
}

export interface Work {
  company: string;
  link: string;
  roles: Role[];
  description: string;
  achievements?: string[];
  badges?: string[];
}

export interface Certificate {
  name: string;
  date: string;
}

export const PERSONAL_DATA: PersonalInformation = yaml.load(personalYaml) as PersonalInformation;
