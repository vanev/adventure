export type Clock = {
  current: number;
  sinceLastTick: number;
};

export const zero: Clock = {
  current: 0,
  sinceLastTick: 0,
};
