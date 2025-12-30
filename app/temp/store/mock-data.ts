import type {
  Client,
  Consultant,
  Contract,
  ConsultantContract,
  Role,
  ConsultantRole,
} from '../../shared/types';

const clientIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
  '4': globalThis.crypto.randomUUID(),
};

const consultantIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
  '4': globalThis.crypto.randomUUID(),
  '5': globalThis.crypto.randomUUID(),
  '6': globalThis.crypto.randomUUID(),
  '7': globalThis.crypto.randomUUID(),
  '8': globalThis.crypto.randomUUID(),
  '9': globalThis.crypto.randomUUID(),
};

const contractIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
  '4': globalThis.crypto.randomUUID(),
};

const consultantContractIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
  '4': globalThis.crypto.randomUUID(),
  '5': globalThis.crypto.randomUUID(),
  '6': globalThis.crypto.randomUUID(),
  '7': globalThis.crypto.randomUUID(),
  '8': globalThis.crypto.randomUUID(),
  '9': globalThis.crypto.randomUUID(),
};

const roleIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
};

const consultantRoleIds = {
  '1': globalThis.crypto.randomUUID(),
  '2': globalThis.crypto.randomUUID(),
  '3': globalThis.crypto.randomUUID(),
};

export const mockClients: Client[] = [
  {
    id: clientIds['1'],
    name: 'TechCorp Solutions',
    description: 'A leading provider of innovative tech solutions.',
    address: '123 Tech Street, Silicon Valley, CA',
  },
  {
    id: clientIds['2'],
    name: 'Global Finance Inc',
    description: 'A global leader in financial services.',
    address: '456 Finance Ave, New York, NY',
  },
  {
    id: clientIds['3'],
    name: 'HealthCare Plus',
    description: 'A provider of premium healthcare services.',
    address: '789 Health Blvd, Chicago, IL',
  },
  {
    id: clientIds['4'],
    name: 'Retail Dynamics',
    description: 'A major player in the retail industry.',
    address: '101 Retail Row, Los Angeles, CA',
  },
];

export const mockConsultants: Consultant[] = [
  {
    id: consultantIds['1'],
    name: 'John Smith',
    years_employed: 5,
  },
  {
    id: consultantIds['2'],
    name: 'Sarah Johnson',
    years_employed: 3,
  },
  {
    id: consultantIds['3'],
    name: 'Michael Chen',
    years_employed: 7,
  },
  {
    id: consultantIds['4'],
    name: 'Emily Davis',
    years_employed: 2,
  },
  {
    id: consultantIds['5'],
    name: 'David Wilson',
    years_employed: 4,
  },
  {
    id: consultantIds['6'],
    name: 'Lisa Anderson',
    years_employed: 6,
  },
  {
    id: consultantIds['7'],
    name: 'James Martinez',
    years_employed: 1,
  },
  {
    id: consultantIds['8'],
    name: 'Jennifer Taylor',
    years_employed: 8,
  },
  {
    id: consultantIds['9'],
    name: 'Robert Brown',
    years_employed: 3,
  },
];

export const mockContracts: Contract[] = [
  {
    id: contractIds['1'],
    contract_name: 'TechCorp Main Contract',
    start_date: new Date('2023-01-01'),
    client_id: clientIds['1'],
  },
  {
    id: contractIds['2'],
    contract_name: 'Global Finance Main Contract',
    start_date: new Date('2023-02-01'),
    client_id: clientIds['2'],
  },
  {
    id: contractIds['3'],
    contract_name: 'HealthCare Plus Main Contract',
    start_date: new Date('2023-03-01'),
    client_id: clientIds['3'],
  },
  {
    id: contractIds['4'],
    contract_name: 'Retail Dynamics Main Contract',
    start_date: new Date('2023-04-01'),
    client_id: clientIds['4'],
  },
];

export const mockConsultantContracts: ConsultantContract[] = [
  {
    id: consultantContractIds['1'],
    start_date: new Date('2023-01-15'),
    consultant_id: consultantIds['1'],
    contract_id: contractIds['1'],
    role: 'Senior Developer',
    utilization: 0,
  },
  {
    id: consultantContractIds['2'],
    start_date: new Date('2023-01-20'),
    consultant_id: consultantIds['2'],
    contract_id: contractIds['1'],
    role: 'Project Manager',
    utilization: 0,
  },
  {
    id: consultantContractIds['3'],
    start_date: new Date('2023-02-10'),
    consultant_id: consultantIds['3'],
    contract_id: contractIds['1'],
    role: 'DevOps Engineer',
    utilization: 1,
  },
  {
    id: consultantContractIds['4'],
    start_date: new Date('2023-02-15'),
    consultant_id: consultantIds['4'],
    contract_id: contractIds['2'],
    role: 'Business Analyst',
    utilization: 0,
  },
  {
    id: consultantContractIds['5'],
    start_date: new Date('2023-03-01'),
    consultant_id: consultantIds['5'],
    contract_id: contractIds['2'],
    role: 'Full Stack Developer',
    utilization: 0,
  },
  {
    id: consultantContractIds['6'],
    start_date: new Date('2023-03-10'),
    consultant_id: consultantIds['6'],
    contract_id: contractIds['3'],
    role: 'UX Designer',
    utilization: 0,
  },
  {
    id: consultantContractIds['7'],
    start_date: new Date('2023-04-01'),
    consultant_id: consultantIds['7'],
    contract_id: contractIds['3'],
    role: 'Data Scientist',
    utilization: 1,
  },
  {
    id: consultantContractIds['8'],
    start_date: new Date('2023-04-05'),
    consultant_id: consultantIds['8'],
    contract_id: contractIds['3'],
    role: 'Solution Architect',
    utilization: 0,
  },
  {
    id: consultantContractIds['9'],
    start_date: new Date('2023-04-10'),
    consultant_id: consultantIds['9'],
    contract_id: contractIds['4'],
    role: 'QA Engineer',
    utilization: 0,
  },
];

export const mockRoles: Role[] = [
  {id: roleIds['1'], name: 'Senior Developer', short_name: 'Sr. Dev', priority: 1},
  {id: roleIds['2'], name: 'Project Manager', short_name: 'PM', priority: 2},
  {id: roleIds['3'], name: 'DevOps Engineer', short_name: 'DevOps', priority: 3},
];

export const mockConsultantRoles: ConsultantRole[] = [
  {id: consultantRoleIds['1'], role_id: roleIds['1'], consultant_id: consultantIds['1'], start_date: new Date('2023-01-15')},
  {id: consultantRoleIds['2'], role_id: roleIds['2'], consultant_id: consultantIds['2'], start_date: new Date('2023-01-20')},
  {id: consultantRoleIds['3'], role_id: roleIds['3'], consultant_id: consultantIds['3'], start_date: new Date('2023-02-10')},
];