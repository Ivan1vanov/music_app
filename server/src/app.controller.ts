import { Controller, Get } from "@nestjs/common";
import { AppService } from './app.service';


@Controller('/api')
export class AppController {

    constructor(private appService: AppService) {}

    @Get()
    getSome() {
        return this.appService.getUsers()
    }
}