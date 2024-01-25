import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { ComentarioRepository } from './comentario.repository';
import { ComentarioEntity } from './entities/comentario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ComentarioService {

  constructor(
    @InjectRepository(ComentarioEntity)
    private comentarioRepository: ComentarioRepository,
  ) {}

  async create(dto: CreateComentarioDto): Promise<any> {
    const comentario = this.comentarioRepository.create(dto);
    await this.comentarioRepository.save(comentario);
    return new MessageDto(`Gracias por su sugerencia Sr: ${comentario.nombre}`);
  }

  async findAll(): Promise<ComentarioEntity[]>  {
    const list = await this.comentarioRepository.find();
        if (!list.length) {
          throw new NotFoundException(new MessageDto('No hay mensages'));
        }
        return list;
  }

  async findById(id: number): Promise<ComentarioEntity> {
    const comentario = await this.comentarioRepository.findOne({
      where: { id: id },
    });
    if (!comentario ) {
      throw new NotFoundException(new MessageDto('no existe'));
    }
    return comentario ;
  }
 
  async remove(id: number): Promise<any> {
    const comentario  = await this.findById(id);
        await this.comentarioRepository.delete(comentario.id);
        return new MessageDto(`mensage de: ${comentario.nombre} eliminado`);
  }
}
