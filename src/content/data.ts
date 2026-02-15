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

export const PERSONAL_DATA: PersonalInformation = {
  name: 'Joel Chantrell',
  title: 'Software Engineer',
  location: 'Adelaide, South Australia',
  locationLink: 'https://www.google.com/maps/place/Adelaide',
  about: 'Creatively-driven software engineer with a strong background in systems, infrastructure and integration.',
  summary:
    'A big picture thinker that approaches problem solving with a systems mindset, drawing on deep technical experience, domain understanding and a genuine care for the people co-creating and using my solutions. I have experience across engineering, consulting and support roles and bring an empathetic customer-first approach to everything I do.',
  personalWebsiteUrl: 'https://jchantrell.com',
  contact: {
    email: 'work@jchantrell.com',
    tel: '+61452575451',
    social: [
      { name: 'GitHub', url: 'https://github.com/jchantrell' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/jchantrell' },
    ],
  },
  work: [
    {
      company: 'Versent',
      link: 'https://versent.com.au/',
      roles: [
        {
          title: 'Senior Engineer',
          start: 'Oct 2024',
          end: 'Present',
        },
        {
          title: 'Engineer',
          start: 'Oct 2023',
          end: 'Oct 2024',
        },
        {
          title: 'Associate Engineer',
          start: 'Oct 2022',
          end: 'Oct 2023',
        },
      ],
      description:
        'Architect, develop and maintain high-quality software, integration workflows and cloud infrastructure.',
      achievements: [
        "Engineered scalable event-driven architecture for fault-tolerant, real-time processing and managing platform's complex interservice data needs.",
        'Architected data models and ETL pipelines for graph (Neptune), SQL (RDS/Aurora), document (DynamoDB, OpenSearch), timeseries (IoT Core) and semi-structured (Snowflake, S3) data stores.',
        'Built CI/CD pipelines and workflows to automate and standardise PR reviews, testing, stage-based deployments and versioning utilising GitHub Actions and AWS CodePipeline.',
        'Developed secure, performant and documented APIs utilising GraphQL, REST and OpenAPI standards.',
        'Optimised fullstack applications for responsiveness, initial load, caching and cost.',
        'Implemented infrastructure as code utilising AWS CDK, SAM and CloudFormation.',
        'Securely managed access and system integrations using OIDC, OAuth and RBAC.',
      ],
      badges: [],
    },
    {
      company: 'Advance Business Consulting',
      link: 'https://www.advance.net.au/',
      roles: [
        {
          title: 'Graduate Software Developer',
          start: 'Jun 2022',
          end: 'Oct 2022',
        },
      ],
      description: 'In-house ERP/CRM development and ad-hoc consulting and support for customers.',
      achievements: [
        "Setup and maintained business's Odoo ERP/CRM infrastructure.",
        "Integrated business's Xero accounting into Odoo ERP/CRM.",
        'Developed Azure Logic App for handling API requests and syncing Outlook Calendar into custom application.',
      ],
      badges: [],
    },
    {
      company: 'UKG',
      link: 'https://www.ukg.com/',
      roles: [
        {
          title: 'Technical Support Engineer',
          start: 'April 2022',
          end: 'Jun 2022',
        },
      ],
      description: 'Provided technical support for customers of workforce management SaaS platform.',
      achievements: [],
      badges: [],
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      date: 'Jun 2024',
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      date: 'Apr 2023',
    },
  ],
  skills: [
    'TypeScript',
    'Python',
    'Golang',
    'Bash',
    'Linux',
    'AWS',
    'GraphQL',
    'REST',
    'Event-driven Architecture',
    'Distributed Systems',
    'Platform Engineering',
    'API Gateway',
    'AppSync',
    'SQL',
    'RDS',
    'Aurora',
    'DynamoDB',
    'Neptune',
    'Graph databases',
    'OpenSearch',
    'ElasticSearch',
    'Geospatial',
    'IoT',
    'S3',
    'Snowflake',
    'Data modelling',
    'ETL',
    'Observability',
    'Grafana',
    'CloudWatch',
    'EventBridge',
    'SQS',
    'SNS',
    'Kinesis',
    'ECS',
    'Fargate',
    'Lambda',
    'Step Functions',
    'CodePipeline',
    'Git',
    'GitHub Actions',
    'AWS CDK',
    'AWS SAM',
    'CloudFormation',
    'Serverless',
    'Infrastructure as Code',
    'CI/CD',
    'AWS IAM',
    'Azure Entra ID',
    'OAuth',
    'OIDC',
    'RBAC',
    'AWS Powertools',
    'Monorepos',
    'NestJS',
    'Apollo',
    'React',
    'SolidJS',
    'Astro',
    'Tauri',
    'AI',
    'LLM',
    'Agentic Development',
    'Cursor',
    'Claude Code',
    'OpenCode',
    'ERP/CRMs',
    'Agile',
  ],
};
