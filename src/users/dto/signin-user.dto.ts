import { PickType } from "@nestjs/swagger";
import { SignupUserDto } from "./signup-user.dto";

export class SigninUserDto extends PickType(SignupUserDto, ['email', 'password'] as const) {
}