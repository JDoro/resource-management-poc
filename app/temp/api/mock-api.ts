import type {
  Client,
  Consultant,
  Contract,
  ConsultantContract,
  Role,
  ConsultantRole,
} from '../../shared/types';
import { z } from 'zod';
import crypto from 'crypto';
import {
  mockClients,
  mockConsultants,
  mockContracts,
  mockConsultantContracts,
  mockRoles,
  mockConsultantRoles,
} from '../store/mock-data';

/**
 * Custom error for validation failures.
 */
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Zod schema for consultant validation
const consultantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  years_employed: z.number().int().min(0, 'Years employed cannot be negative.').max(50, 'Years employed cannot exceed 50.'),
}).passthrough();

// Zod schema for assigning a consultant to a client
const assignConsultantToClientSchema = z.object({
  consultantId: z.string().uuid('Invalid Consultant ID format.'),
  clientId: z.string().uuid('Invalid Client ID format.'),
  role: z.string().min(2, 'Role must be at least 2 characters.'),
  utilization: z.union([z.literal(0), z.literal(1)], {
    errorMap: () => ({ message: 'Utilization must be either 0 or 1.' }),
  }),
  startDate: z.date({
    errorMap: () => ({ message: 'Start date must be a valid date.' }),
  }),
});

/**
 * Validates data for creating a consultant
 */
function validateCreateConsultant(data: Omit<Consultant, 'id'>) {
  const result = consultantSchema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.errors.map(e => e.message).join(', '));
  }
  return result.data;
}

/**
 * Validates data for updating a consultant
 */
function validateUpdateConsultant(data: Partial<Omit<Consultant, 'id'>>) {
  const result = consultantSchema.partial().safeParse(data);
  if (!result.success) {
    throw new ValidationError(result.error.errors.map(e => e.message).join(', '));
  }
  return result.data;
}

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
 * Fetches a single client by ID from the mock API
 */
export async function fetchClientById(id: string): Promise<Client | null> {
  await simulateApiDelay();
  return mockClients.find((client) => client.id === id) || null;
}

/**
 * Creates a new client
 */
export async function createClient(
  data: Omit<Client, 'id'>
): Promise<Client> {
  await simulateApiDelay();
  const newId = crypto.randomUUID();
  const newClient: Client = { id: newId, ...data };
  mockClients.push(newClient);
  return newClient;
}

/**
 * Updates a client by ID
 */
export async function updateClient(
  id: string,
  data: Partial<Omit<Client, 'id'>>
): Promise<Client | null> {
  await simulateApiDelay();
  const index = mockClients.findIndex((client) => client.id === id);
  if (index === -1) {
    return null;
  }
  mockClients[index] = { ...mockClients[index], ...data };
  return mockClients[index];
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
 * Creates a new consultant
 */
export async function createConsultant(
  data: Omit<Consultant, 'id'>
): Promise<Consultant> {
  const validatedData = validateCreateConsultant(data);
  await simulateApiDelay();
  const newId = crypto.randomUUID();
  const newConsultant: Consultant = { id: newId, ...validatedData };
  mockConsultants.push(newConsultant);
  return newConsultant;
}

/**
 * Updates a consultant by ID
 */
export async function updateConsultant(
  id: string,
  data: Partial<Omit<Consultant, 'id'>>
): Promise<Consultant | null> {
  const validatedData = validateUpdateConsultant(data);
  await simulateApiDelay();
  const index = mockConsultants.findIndex((consultant) => consultant.id === id);
  if (index === -1) {
    return null;
  }
  mockConsultants[index] = { ...mockConsultants[index], ...validatedData };
  return mockConsultants[index];
}

/**
 * Creates a new contract
 */
export async function createContract(
  data: Omit<Contract, 'id'>
): Promise<Contract> {
  await simulateApiDelay();
  const newId = crypto.randomUUID();
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
  const newId = crypto.randomUUID();
  const newConsultantContract: ConsultantContract = { id: newId, ...data };
  mockConsultantContracts.push(newConsultantContract);
  return newConsultantContract;
}

/**
 * Updates a consultant contract by ID
 */
export async function updateConsultantContract(
  id: string,
  data: Partial<Omit<ConsultantContract, 'id' | 'consultant_id' | 'contract_id'>>
): Promise<ConsultantContract | null> {
  await simulateApiDelay();
  const index = mockConsultantContracts.findIndex((cc) => cc.id === id);
  if (index === -1) {
    return null;
  }
  mockConsultantContracts[index] = { ...mockConsultantContracts[index], ...data };
  return mockConsultantContracts[index];
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
  // Validate input data
  const validationResult = assignConsultantToClientSchema.safeParse(params);
  if (!validationResult.success) {
    throw new ValidationError(validationResult.error.errors.map(e => e.message).join(', '));
  }

  const { consultantId, clientId, role, utilization, startDate } = validationResult.data;

  // Verify that the consultant and client exist
  const consultantExists = mockConsultants.some(c => c.id === consultantId);
  if (!consultantExists) {
    throw new ValidationError('Consultant not found.');
  }
  const clientExists = mockClients.some(c => c.id === clientId);
  if (!clientExists) {
    throw new ValidationError('Client not found.');
  }

  await simulateApiDelay();

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
