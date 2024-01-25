import { Module } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoController } from './contacto.controller';
import { ContactoEntity } from './entities/contacto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoEntity])],
  controllers: [ContactoController],
  providers: [ContactoService]
})
export class ContactoModule {}
