import { createServer, Model, Factory, Response } from 'miragejs';
import faker from 'faker';
type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {},

    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email(i: number) {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );
        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.get('/users/:id');
      this.post('/users');
      this.put('/users');
      this.delete('/users');

      // Coloca um novo namespace para nao prejudicar as rotas da pasta api do next
      this.namespace = '';
      // Metodo para que todas as chamadas sejam pelo 'api' passem pelo mirage
      // e caso nao sejam identificadas elas irao passar adiante, para a rota original
      this.passthrough();
    },
  });

  return server;
}

// Crud
