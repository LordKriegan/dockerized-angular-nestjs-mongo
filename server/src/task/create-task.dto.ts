import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    public text: string;
    @IsNotEmpty()
    public day: string;
    @IsBoolean()
    public reminder: boolean;
}