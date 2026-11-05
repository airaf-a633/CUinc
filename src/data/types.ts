export type RouteId = string;

export interface TurnOnRoute {
  id: RouteId;
  name: string;
  color: string;
}

// ASSUMPTION (not in the designs): card color = status. red = pending, green = turned on,
// blue = follow-up. To confirm with the client after the trial.
export type AddressStatus = 'pending' | 'follow_up' | 'turned_on';

export interface Address {
  id: string;
  routeId: RouteId;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  status: AddressStatus;
  turnedOnBy: string | null;
  turnedOnAt: string | null; // ISO string
}

export interface User {
  id: string;
  name: string;
  phone: string; // digits only
  pin: string; // MOCK ONLY: a real backend would never ship PINs to the client
}

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; reason: 'phone_not_found' | 'wrong_pin' };
