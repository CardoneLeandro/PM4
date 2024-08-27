import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class LoginUserPipe implements PipeTransform<any> {}