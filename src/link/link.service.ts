import { Injectable } from '@nestjs/common';
import { Link } from './link.model';
import { CreateLinkInput } from './link.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  findMany() {
    return this.linksRepository.find();
  }

  update(link: Link) {
    return this.linksRepository.save(link);
  }

  create(link: CreateLinkInput) {
    return this.linksRepository.save(link);
  }

  async delete(id: number) {
    const result = await this.linksRepository.delete(id);

    return result.affected != null && result.affected > 0;
  }
}
