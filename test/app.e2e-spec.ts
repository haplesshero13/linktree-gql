import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest-graphql';
import { AppModule } from '../src/app.module';
import { Link } from '../src/link/link.model';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import gql from 'graphql-tag';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Link],
          logging: true,
          synchronize: true,
        }),

        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates, reads, updates, and deletes Links', async () => {
    await request(app.getHttpServer())
      .query(gql`
        mutation CreateLink($link: CreateLinkInput!) {
          createLink(link: $link) {
            id
            href
            text
          }
        }
      `)
      .variables({ link: { href: 'https://google.com', text: 'Google' } })
      .expectNoErrors();

    const { data: data2 } = await request(app.getHttpServer())
      .query(gql`
        mutation CreateLink($link: CreateLinkInput!) {
          createLink(link: $link) {
            id
            href
            text
          }
        }
      `)
      .variables({
        link: {
          href: 'https://youtube.com',
          text: 'youtube',
        },
      })
      .expectNoErrors();

    await request(app.getHttpServer())
      .query(gql`
        mutation UpdateLink($link: UpdateLinkInput!) {
          updateLink(link: $link) {
            id
            href
            text
          }
        }
      `)
      .variables({
        link: {
          id: (data2 as any).createLink.id,
          href: 'https://youtube.com',
          text: 'YouTube',
        },
      })
      .expectNoErrors();

    const { data: getData } = await request(app.getHttpServer())
      .query(gql`
        query GetLinks {
          getLinks {
            id
            href
            text
          }
        }
      `)
      .expectNoErrors();

    expect((getData as any).getLinks).toContainEqual({
      id: 2,
      href: 'https://youtube.com',
      text: 'YouTube',
    });
    expect((getData as any).getLinks).toContainEqual({
      id: 1,
      href: 'https://google.com',
      text: 'Google',
    });
    expect((getData as any).getLinks).toHaveLength(2);

    await request(app.getHttpServer())
      .query(gql`
        mutation DeleteLink($id: Int!) {
          deleteLink(id: $id)
        }
      `)
      .variables({ id: 1 })
      .expectNoErrors();

    const { data: getData2 } = await request(app.getHttpServer())
      .query(gql`
        query GetLinks {
          getLinks {
            id
            href
            text
          }
        }
      `)
      .expectNoErrors();

    expect((getData2 as any).getLinks).toHaveLength(1);
  });
});
