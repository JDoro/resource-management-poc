import type {
  Client,
  Consultant,
  Contract,
  ConsultantContract,
  Role,
  ConsultantRole,
} from '../../shared/types';
import {
  mockClients,
  mockConsultants,
  mockContracts,
  mockConsultantContracts,
  mockRoles,
  mockConsultantRoles,
} from '../store/mock-data';

/**
 * Simulates an async API call with a delay
 */
const simulateApiDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches all clients from the mock API
 */
export async function fetchClients(): Promise<Client[]> {
  await simulateApiDelay();
  return mockClients;
}

/**
 * Fetches all consultants from the mock API
 */
export async function fetchConsultants(): Promise<Consultant[]> {
  await simulateApiDelay();
  return mockConsultants;
}

/**
 * Fetches a single consultant by ID from the mock API
 */
export async function fetchConsultantById(id: string): Promise<Consultant | null> {
  await simulateApiDelay();
  return mockConsultants.find((consultant) => consultant.id === id) || null;
}

/**
 * Fetches all contracts from the mock API
 */
export async function fetchContracts(): Promise<Contract[]> {
  await simulateApiDelay();
  return mockContracts;
}

/**
 * Fetches all consultant contracts from the mock API
 */
export async function fetchConsultantContracts(): Promise<ConsultantContract[]> {
  await simulateApiDelay();
  return mockConsultantContracts;
}

/**
 * Fetches all roles from the mock API
 */
export async function fetchRoles(): Promise<Role[]> {
  await simulateApiDelay();
  return mockRoles;
}

/**
 * Fetches all consultant roles from the mock API
 */
export async function fetchConsultantRoles(): Promise<ConsultantRole[]> {
  await simulateApiDelay();
  return mockConsultantRoles;
}

/**
 * Fetches consultants for a specific client
 */
export async function fetchConsultantsByClientId(
  clientId: string
): Promise<Consultant[]> {
  await simulateApiDelay();
  const contracts = mockContracts.filter(
    (contract) => contract.client_id === clientId
  );
  const contractIds = contracts.map((contract) => contract.id);
  const consultantContracts = mockConsultantContracts.filter((cc) =>
    contractIds.includes(cc.contract_id)
  );
  const consultantIds = consultantContracts.map((cc) => cc.consultant_id);
  return mockConsultants.filter((consultant) =>
    consultantIds.includes(consultant.id)
  );
}

/**
 * Updates a consultant by ID
 */
export async function updateConsultant(
  id: string,
  data: Partial<Omit<Consultant, 'id'>>
): Promise<Consultant | null> {
  await simulateApiDelay();
  const index = mockConsultants.findIndex((consultant) => consultant.id === id);
  if (index === -1) {
    return null;
  }
  mockConsultants[index] = { ...mockConsultants[index], ...data };
  return mockConsultants[index];
}

/**
 * Creates a new contract
 */
export async function createContract(
  data: Omit<Contract, 'id'>
): Promise<Contract> {
  await simulateApiDelay();
  const newId = String(Math.max(...mockContracts.map((c) => Number(c.id)), 0) + 1);
  const newContract: Contract = { id: newId, ...data };
  mockContracts.push(newContract);
  return newContract;
}

/**
 * Creates a new consultant contract
 */
export async function createConsultantContract(
  data: Omit<ConsultantContract, 'id'>
): Promise<ConsultantContract> {
  await simulateApiDelay();
  const newId = String(Math.max(...mockConsultantContracts.map((cc) => Number(cc.id)), 0) + 1);
  const newConsultantContract: ConsultantContract = { id: newId, ...data };
  mockConsultantContracts.push(newConsultantContract);
  return newConsultantContract;
}

/**
 * Assigns a consultant to a client.
 * Creates a new Contract for the client if one doesn't exist,
 * then creates a ConsultantContract linking the consultant to that contract.
 */
export interface AssignConsultantToClientParams {
  consultantId: string;
  clientId: string;
  role: string;
  utilization: 0 | 1;
  startDate: Date;
}

export async function assignConsultantToClient(
  params: AssignConsultantToClientParams
): Promise<{ contract: Contract; consultantContract: ConsultantContract }> {
  await simulateApiDelay();

  const { consultantId, clientId, role, utilization, startDate } = params;

  // Check if a contract exists for this client
  let contract = mockContracts.find((c) => c.client_id === clientId);

  // If no contract exists, create one
  if (!contract) {
    const client = mockClients.find((c) => c.id === clientId);
    const contractName = client
      ? `${client.name} Main Contract`
      : `Client ${clientId} Contract`;
    contract = await createContract({
      contract_name: contractName,
      start_date: startDate,
      client_id: clientId,
    });
  }

  // Create the consultant contract
  const consultantContract = await createConsultantContract({
    consultant_id: consultantId,
    contract_id: contract.id,
    role,
    utilization,
    start_date: startDate,
  });

  return { contract, consultantContract };
}
