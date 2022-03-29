import { NestFactory } from "@nestjs/core"
import { AppModule } from './app.module';



const start = async () => {
    try {
        const PORT = process.env.PORT || 5000 
        const app = await NestFactory.create(AppModule, {cors: true})

        await app.listen(PORT, () => console.log(`Server started on http://localhost:5000`))

    } catch (error) {
        console.log(error)
    } 
}

start()