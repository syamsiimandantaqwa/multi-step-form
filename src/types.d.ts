export interface SideBarType {
  id: number;
  name: string;
}

export type Plans = {
  type: string;
  name: string;
  price: string;
};

export type AddOns = Partial<Plans> & {
  id: number | string;
  desc: string;
};

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  plan: Plans;
  addOns: AddOns[];
}
