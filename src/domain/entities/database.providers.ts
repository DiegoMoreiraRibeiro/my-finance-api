import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',

    useFactory: async () => {
      const dataSource = new DataSource({
        name: process.env.NAME,
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT_DATABASE),
        username: process.env.USER_DB,
        password: process.env.PASS,
        database: process.env.DATABASE,
        entities: [__dirname + '../../**/*.entity.{js,ts}'],
        //entities: ['../../../domain/entity.{js,ts}'],
        synchronize: false,
        multipleStatements: true,
      });

      return dataSource.initialize();
    },
  },
];
