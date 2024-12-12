import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: Date;
  occupation: string;
  gender: string;

  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;

  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  academicBackground: string[]; // List of past schools
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
