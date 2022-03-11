export interface User {
  id?: number;
  cardIdent: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date | null;
  address?: string | null;
  phone?: string | null;
  isVaccine: boolean;
  vaccine?: 'Sputnik' | 'Astrazeneca' | 'Pfizer' | 'Jhonson&Jhonson' | null;
  vaccineDate?: Date | null;
  vaccineTimes?: number | null;
  isAdmin?: boolean;
}