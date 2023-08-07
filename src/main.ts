import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const dbType: any = process.env.DB_TYPE
  if (
    ![
      'mysql',
      'mariadb',
      'postgres',
      'cockroachdb',
      'sqlite',
      'mssql',
      'oracle',
      'mongodb',
      'aurora-data-api',
    ].includes(dbType)
  ) {
    throw new Error(`Invalid database type: ${dbType}`)
  }
  await app.listen(3000)
}
bootstrap()
