
export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

export interface CustomerUser extends User {
  role: 'customer';
  address?: string;
  phone?: string;
  orderCount?: number;
}
