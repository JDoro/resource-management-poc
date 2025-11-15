import type { Client } from '../../shared/types/client';
import type { Consultant } from '../../shared/types/consultant';
import { mockClients, mockConsultants } from '../store/mock-data';

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
 * Fetches consultants for a specific client
 */
export async function fetchConsultantsByClientId(
  clientId: string
): Promise<Consultant[]> {
  await simulateApiDelay();
  return mockConsultants.filter(
    (consultant) => consultant.clientId === clientId
  );
}
