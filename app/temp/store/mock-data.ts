import type {
  Client,
  Consultant,
  Contract,
  ConsultantContract,
  Role,
  ConsultantRole,
} from '../../shared/types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    description: 'A leading provider of innovative tech solutions.',
    address: '123 Tech Street, Silicon Valley, CA',
  },
  {
    id: '2',
    name: 'Global Finance Inc',
    description: 'A global leader in financial services.',
    address: '456 Finance Ave, New York, NY',
  },
  {
    id: '3',
    name: 'HealthCare Plus',
    description: 'A provider of premium healthcare services.',
    address: '789 Health Blvd, Chicago, IL',
  },
  {
    id: '4',
    name: 'Retail Dynamics',
    description: 'A major player in the retail industry.',
    address: '101 Retail Row, Los Angeles, CA',
  },
];

export const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'John Smith',
    years_employed: 5,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    years_employed: 3,
  },
  {
    id: '3',
    name: 'Michael Chen',
    years_employed: 7,
  },
  {
    id: '4',
    name: 'Emily Davis',
    years_employed: 2,
  },
  {
    id: '5',
    name: 'David Wilson',
    years_employed: 4,
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    years_employed: 6,
  },
  {
    id: '7',
    name: 'James Martinez',
    years_employed: 1,
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    years_employed: 8,
  },
  {
    id: '9',
    name: 'Robert Brown',
    years_employed: 3,
  },
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    contract_name: 'TechCorp Main Contract',
    start_date: new Date('2023-01-01'),
    client_id: '1',
  },
  {
    id: '2',
    contract_name: 'Global Finance Main Contract',
    start_date: new Date('2023-02-01'),
    client_id: '2',
  },
  {
    id: '3',
    contract_name: 'HealthCare Plus Main Contract',
    start_date: new Date('2023-03-01'),
    client_id: '3',
  },
  {
    id: '4',
    contract_name: 'Retail Dynamics Main Contract',
    start_date: new Date('2023-04-01'),
    client_id: '4',
  },
];

export const mockConsultantContracts: ConsultantContract[] = [
  {
    id: '1',
    start_date: new Date('2023-01-15'),
    consultant_id: '1',
    contract_id: '1',
    role: 'Senior Developer',
    utilization: 0,
  },
  {
    id: '2',
    start_date: new Date('2023-01-20'),
    consultant_id: '2',
    contract_id: '1',
    role: 'Project Manager',
    utilization: 0,
  },
  {
    id: '3',
    start_date: new Date('2023-02-10'),
    consultant_id: '3',
    contract_id: '1',
    role: 'DevOps Engineer',
    utilization: 1,
  },
  {
    id: '4',
    start_date: new Date('2023-02-15'),
    consultant_id: '4',
    contract_id: '2',
    role: 'Business Analyst',
    utilization: 0,
  },
  {
    id: '5',
    start_date: new Date('2023-03-01'),
    consultant_id: '5',
    contract_id: '2',
    role: 'Full Stack Developer',
    utilization: 0,
  },
  {
    id: '6',
    start_date: new Date('2023-03-10'),
    consultant_id: '6',
    contract_id: '3',
    role: 'UX Designer',
    utilization: 0,
  },
  {
    id: '7',
    start_date: new Date('2023-04-01'),
    consultant_id: '7',
    contract_id: '3',
    role: 'Data Scientist',
    utilization: 1,
  },
  {
    id: '8',
    start_date: new Date('2023-04-05'),
    consultant_id: '8',
    contract_id: '3',
    role: 'Solution Architect',
    utilization: 0,
  },
  {
    id: '9',
    start_date: new Date('2023-04-10'),
    consultant_id: '9',
    contract_id: '4',
    role: 'QA Engineer',
    utilization: 0,
  },
];

export const mockRoles: Role[] = [
    {id: '1', name: 'Senior Developer', short_name: 'Sr. Dev', priority: 1},
    {id: '2', name: 'Project Manager', short_name: 'PM', priority: 2},
    {id: '3', name: 'DevOps Engineer', short_name: 'DevOps', priority: 3},
];

export const mockConsultantRoles: ConsultantRole[] = [
    {id: '1', role_id: '1', consultant_id: '1', start_date: new Date('2023-01-15')},
    {id: '2', role_id: '2', consultant_id: '2', start_date: new Date('2023-01-20')},
    {id: '3', role_id: '3', consultant_id: '3', start_date: new Date('2023-02-10')},
]
