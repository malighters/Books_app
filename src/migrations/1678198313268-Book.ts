import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner.js";

export class Book1678198313268 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.renameColumn('book', 'title', 'name');
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.renameColumn('book', 'name', 'title');
    }

}
