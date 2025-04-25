import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50) // Ensure name length is between 3 and 50 characters
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 100) // Ensure password is at least 8 characters
  password: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
