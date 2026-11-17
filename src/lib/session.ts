import { readLocal, writeLocal } from './storage';

const SESSION_KEY = 'ewa:session';

export const getSignedInEmail = () => readLocal<string | null>(SESSION_KEY, null);
export const signIn = (email: string) => writeLocal(SESSION_KEY, email.trim().toLowerCase());
