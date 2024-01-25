import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { ComentarioEntity } from './entities/comentario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComentarioEntity])],
  controllers: [ComentarioController],
  providers: [ComentarioService]
})
export class ComentarioModule {}
