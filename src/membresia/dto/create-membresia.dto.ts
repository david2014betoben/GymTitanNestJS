import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMembresiaDto {
    @Type(()=>Number)
    @IsNotEmpty({message:"El socio es obligatorio"})
    @IsInt({message:"El id_socio debe ser numerico"})
    socioId:number;

    @Type(()=>Number)
    @IsNotEmpty({message:"El plan es obligatorio"})
    @IsInt({message:"El id_plan debe ser numerico"})
    planId:number;

    @Type(()=>Date)
    @IsDateString()
    fechaInicio:Date;

    @Type(()=>Date)
    @IsDateString()
    fechaFin:Date;

    @Type(()=>Number)
    @IsNumber({maxDecimalPlaces:2},{message:"el precio debe de ser numero con dos decimales"})
    @Min(0,{message:"El precio debe de ser  0 o positivo"})
    precioPagado: number;
}
