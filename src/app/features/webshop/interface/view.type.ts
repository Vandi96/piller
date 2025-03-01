export const viewType = {
  GRID: 'grid',
  LIST: 'list' 
} as const;

export type ViewType = (typeof viewType)[keyof typeof viewType];
