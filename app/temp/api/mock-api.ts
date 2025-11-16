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
