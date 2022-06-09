export type Clock = {
  current: number;
  sinceLastTick: number;
};

export const initial: Clock = {
  current: 0,
  sinceLastTick: 0,
};
