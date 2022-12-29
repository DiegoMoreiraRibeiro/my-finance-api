import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',

    useFactory: async () => {
      const dataSource = new DataSource({
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'meufinanceiro',
        entities: [__dirname + '../../**/*.entity.{js,ts}'],
        //entities: ['../../../domain/entity.{js,ts}'],
        synchronize: false,
        multipleStatements: true,
      });

      return dataSource.initialize();
    },
  },
];
