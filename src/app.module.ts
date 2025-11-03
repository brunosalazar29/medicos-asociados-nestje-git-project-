import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicoModule } from './medico/medico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'ELPAPUDEPAPUS',
      port: 1433,
      username: 'sa',
      password: 'P@ssw0rd123',
      database: 'BD_Sanna_ambulatoria',
      options: {
        trustServerCertificate: true,
      },
      synchronize: false,
      autoLoadEntities: true,
    }),
    MedicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
