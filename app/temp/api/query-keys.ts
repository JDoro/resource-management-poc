/**
 * Query key factories for consistent query key generation
 */

export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: () => [...clientKeys.lists()] as const,
};

export const consultantKeys = {
  all: ['consultants'] as const,
  lists: () => [...consultantKeys.all, 'list'] as const,
  list: () => [...consultantKeys.lists()] as const,
  byClient: (clientId: string) =>
    [...consultantKeys.all, 'byClient', clientId] as const,
};
