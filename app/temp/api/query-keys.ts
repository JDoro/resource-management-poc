/**
 * Query key factories for consistent query key generation
 */

export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: () => [...clientKeys.lists()] as const,
  detail: (id: string) => [...clientKeys.all, 'detail', id] as const,
};

export const consultantKeys = {
  all: ['consultants'] as const,
  lists: () => [...consultantKeys.all, 'list'] as const,
  list: () => [...consultantKeys.lists()] as const,
  byClient: (clientId: string) =>
    [...consultantKeys.all, 'byClient', clientId] as const,
  detail: (id: string) => [...consultantKeys.all, 'detail', id] as const,
};

export const contractsKeys = {
  all: ['contracts'] as const,
};

export const consultantContractsKeys = {
  all: ['consultantContracts'] as const,
};

export const rolesKeys = {
  all: ['roles'] as const,
};

export const consultantRolesKeys = {
  all: ['consultantRoles'] as const,
};
