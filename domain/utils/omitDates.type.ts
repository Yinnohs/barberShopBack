export type OmitDates<T> = Omit<T, 'createdAt' | 'deletedAt' | 'udpatedAt'>;
