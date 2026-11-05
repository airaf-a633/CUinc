import { colors } from '@/theme/tokens';

import type { Address, TurnOnRoute, User } from './types';

// All data below is MOCK data. The first three addresses and the Eddie Morris note come
// from the design PNGs; everything else is invented for the trial.
export const routes: TurnOnRoute[] = [
  { id: 'larchmont', name: 'Larchmont', color: colors.larchmont },
  { id: 'effingham', name: 'Effingham', color: colors.effingham },
  { id: 'islands', name: 'Islands', color: colors.islands },
  { id: 'black-creek', name: 'Black Creek', color: colors.blackCreek },
];

export const users: User[] = [
  { id: 'u1', name: 'Brian Abbott', phone: '9125550100', pin: '123456' },
  { id: 'u2', name: 'Eddie Morris', phone: '9125550142', pin: '654321' },
];

const blank = { notes: '', turnedOnBy: null, turnedOnAt: null } as const;

export const addresses: Address[] = [
  // Larchmont (from design)
  { id: 'a1', routeId: 'larchmont', line1: '601 Quacco Road', line2: 'Unit 2406', city: 'Savannah', state: 'GA', zip: '31419', status: 'pending', ...blank },
  {
    id: 'a2',
    routeId: 'larchmont',
    line1: '2 Holiday Circle',
    line2: '',
    city: 'Savannah',
    state: 'GA',
    zip: '31419',
    status: 'turned_on',
    notes:
      'Checked meter and verified proper installation. No leaks detected. Water pressure is normal. Customer was informed about the service activation.',
    turnedOnBy: 'Eddie Morris',
    turnedOnAt: '2025-08-01T15:40:00',
  },
  { id: 'a3', routeId: 'larchmont', line1: '5 Abercorn Street', line2: '', city: 'Savannah', state: 'GA', zip: '31419', status: 'follow_up', ...blank },
  // Effingham (mock)
  { id: 'a4', routeId: 'effingham', line1: '118 Fort Howard Road', line2: '', city: 'Rincon', state: 'GA', zip: '31326', status: 'pending', ...blank },
  { id: 'a5', routeId: 'effingham', line1: '40 Old Augusta Road', line2: 'Unit B', city: 'Springfield', state: 'GA', zip: '31329', status: 'pending', ...blank },
  { id: 'a6', routeId: 'effingham', line1: '9 Church Street', line2: '', city: 'Guyton', state: 'GA', zip: '31312', status: 'follow_up', ...blank },
  // Islands (mock)
  { id: 'a7', routeId: 'islands', line1: '27 Butler Avenue', line2: '', city: 'Tybee Island', state: 'GA', zip: '31328', status: 'pending', ...blank },
  { id: 'a8', routeId: 'islands', line1: '305 Johnny Mercer Boulevard', line2: 'Apt 4', city: 'Savannah', state: 'GA', zip: '31410', status: 'pending', ...blank },
  // Black Creek (mock)
  { id: 'a9', routeId: 'black-creek', line1: '14 Ford Avenue', line2: '', city: 'Richmond Hill', state: 'GA', zip: '31324', status: 'pending', ...blank },
  { id: 'a10', routeId: 'black-creek', line1: '62 Highway 17 South', line2: 'Unit 3', city: 'Richmond Hill', state: 'GA', zip: '31324', status: 'pending', ...blank },
];
