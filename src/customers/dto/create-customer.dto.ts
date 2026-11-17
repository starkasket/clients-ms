import { IsEmail, IsOptional, IsString, Length } from "class-validator"

export class CreateCustomerDto {
    @IsString()
    @Length(3, 50)
    public name!: string

    @IsString()
    @IsEmail()
    public email!: string

    @IsOptional()
    @IsString()
    @Length(10, 10)
    public phone?: string
    
    @IsOptional()
    @IsString()
    @Length(0, 150)
    public address?: string
}
