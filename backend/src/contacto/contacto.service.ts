import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { ContactoRepository } from './contacto.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { ContactoEntity } from './entities/contacto.entity';


@Injectable()
export class ContactoService {

  constructor(
    @InjectRepository(ContactoEntity)
    private contactoRepository: ContactoRepository,
  ) {}


  async create(dto: CreateContactoDto): Promise<any> {
    const contacto = this.contactoRepository.create(dto);
    await this.contactoRepository.save(contacto);
    return new MessageDto(`mensage enviado cliente: ${contacto.nombre}`);
  }

  async findAll(): Promise<ContactoEntity[]>  {
    const list = await this.contactoRepository.find();
        if (!list.length) {
          throw new NotFoundException(new MessageDto('No hay mensages'));
        }
        return list;
  }

  async findById(id: number): Promise<ContactoEntity> {
    const contacto = await this.contactoRepository.findOne({
      where: { id: id },
    });
    if (!contacto) {
      throw new NotFoundException(new MessageDto('no existe'));
    }
    return contacto;
  }

  async remove(id: number): Promise<any> {
    const contacto = await this.findById(id);
        await this.contactoRepository.delete(contacto.id);
        return new MessageDto(`mensage de: ${contacto.nombre} eliminado`);
  }
}
