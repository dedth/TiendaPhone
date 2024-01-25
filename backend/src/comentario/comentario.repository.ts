
import { EntityRepository, Repository } from 'typeorm';
import { ComentarioEntity } from './entities/comentario.entity';

@EntityRepository(ComentarioEntity)
export class ComentarioRepository extends Repository<ComentarioEntity> {}
