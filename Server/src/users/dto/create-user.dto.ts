import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsUrl,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types/dist';

class ContactDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsUrl()
  linkedInUrl?: string;
}

class AddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
class AcademicBackgroundDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  schools: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsInt()
  yearGraduated: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsUrl()
  profilePhoto: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsISO8601()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcademicBackgroundDto)
  academicBackground: AcademicBackgroundDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
