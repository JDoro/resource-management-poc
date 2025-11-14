import type { Client } from '../../shared/types/client';
import type { Consultant } from '../../shared/types/consultant';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
  },
  {
    id: '2',
    name: 'Global Finance Inc',
    industry: 'Finance',
  },
  {
    id: '3',
    name: 'HealthCare Plus',
    industry: 'Healthcare',
  },
  {
    id: '4',
    name: 'Retail Dynamics',
    industry: 'Retail',
  },
];

export const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Senior Developer',
    clientId: '1',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Project Manager',
    clientId: '1',
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'DevOps Engineer',
    clientId: '1',
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Business Analyst',
    clientId: '2',
  },
  {
    id: '5',
    name: 'David Wilson',
    role: 'Full Stack Developer',
    clientId: '2',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    role: 'UX Designer',
    clientId: '3',
  },
  {
    id: '7',
    name: 'James Martinez',
    role: 'Data Scientist',
    clientId: '3',
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    role: 'Solution Architect',
    clientId: '3',
  },
  {
    id: '9',
    name: 'Robert Brown',
    role: 'QA Engineer',
    clientId: '4',
  },
];
