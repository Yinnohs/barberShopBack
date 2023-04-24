export interface IDatabasePartialSelection<T> {
  select: Partial<{
    [key in keyof T]: boolean;
  }>;
}
