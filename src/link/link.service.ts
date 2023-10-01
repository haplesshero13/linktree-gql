import { Injectable } from '@nestjs/common';
import { Link } from './link.model';
import { CreateLinkInput } from './link.input';

@Injectable()
export class LinkService {
  private links = [{ id: 1, href: 'https://google.com', text: 'Google!' }];

  findMany() {
    return this.links;
  }

  updateMany(links: Link[]) {
    this.links = links;

    return this.links;
  }

  create(link: CreateLinkInput) {
    this.links.push({ ...link, id: this.links.length + 1 });

    return this.links[this.links.length - 1];
  }

  delete(id: number) {
    const foundIndex = this.links.findIndex((item) => item.id === id);
    this.links = this.links.filter((item) => item.id !== id);

    return foundIndex >= 0;
  }
}
