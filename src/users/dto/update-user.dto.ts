import { OmitType, PickType, } from '@nestjs/mapped-types';
import { PartialType, } from '@nestjs/swagger';
import { SignupUserDto } from './signup-user.dto';

export class UpdateUserDto extends OmitType(SignupUserDto, ['email'] as const
) {} 

// export class UpdateUserDto extends PartialType (
//     OmitType(SignupUserDto, ['email'] as const)
// ){}