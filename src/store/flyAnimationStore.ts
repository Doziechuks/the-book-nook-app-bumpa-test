import { create } from 'zustand';

interface Point {
  x: number;
  y: number;
}

interface FlightRequest {
  id: number;
  from: Point;
  imageUri: string;
}

interface FlyAnimationState {
  cartIconPosition: Point | null;
  setCartIconPosition: (point: Point) => void;
  flightRequest: FlightRequest | null;
  requestFlight: (from: Point, imageUri: string) => void;
  clearFlight: () => void;
}

export const useFlyAnimationStore = create<FlyAnimationState>((set) => ({
  cartIconPosition: null,
  setCartIconPosition: (point) => set({ cartIconPosition: point }),
  flightRequest: null,
  requestFlight: (from, imageUri) => set({ flightRequest: { id: Date.now(), from, imageUri } }),
  clearFlight: () => set({ flightRequest: null }),
}));
