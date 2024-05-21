import { atom } from 'jotai';

export const authAtom = atom ({
  token: localStorage.getItem('jwtToken'),
  user: JSON.parse(localStorage.getItem('user')),
});