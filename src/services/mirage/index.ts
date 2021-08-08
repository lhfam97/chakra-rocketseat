import { createServer, Model, Factory } from 'miragejs';
import faker from 'faker';
type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend({} as User),
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
      server.createList('user', 10);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
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
