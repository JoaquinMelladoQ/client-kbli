import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get('dev')
  getHello(): string {
    return "hello from backend";
  }
}
