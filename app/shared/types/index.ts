export interface Consultant {
  id: string;
  name: string;
  years_employed: number;
  role?: string;
}

export interface ConsultantContract {
  id: string;
  start_date: Date;
  end_date?: Date;
  consultant_id: string;
  contract_id: string;
  role: string;
  utilization: 0 | 1; // 0=Full Time, 1=Part Time
}

export interface Contract {
  id: string;
  contract_name: string;
  start_date: Date;
  end_date?: Date;
  client_id: string;
}

export interface Client {
  id: string;
  name: string;
  description: string;
  address: string;
}

export interface Role {
  id: string;
  name: string;
  short_name: string;
  priority: number;
}

export interface ConsultantRole {
  id: string;
  role_id: string;
  consultant_id: string;
  start_date: Date;
  end_date?: Date;
}
