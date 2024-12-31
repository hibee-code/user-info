export interface UserInfo {
    profilePhoto: string;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
    gender: string;
  }
  
  export interface UserContact {
    email: string;
    phone: string;
    fax?: string;
    linkedInUrl?: string;
  }
  
  export interface UserAddress {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  export interface UserAcademic {
    schools: string[]; // List of past schools
  }
  
  export interface User {
    id?: number;
    info: UserInfo;
    contact: UserContact;
    address: UserAddress;
    academics: UserAcademic;
  }

  
  