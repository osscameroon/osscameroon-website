export type DeveloperData = {
  id: string;
  title: string;
  name: string;
  picture: string | null;
  tools: string[];
};

export type DeveloperDetailData = {
  id: string;
  title: string;
  name: string;
  picture: string | null;
  tools: string[];
  github: string;
  url?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  summary?: string;
  yearsOfExperiences?: number;
  availabilities?: string[];
  location?: string;
};
