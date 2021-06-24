export const ensureArray = <T>(a: T | T[]): T[] => (Array.isArray(a) ? a : [a]);
