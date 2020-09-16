import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1600251009539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'cars',
            columns:[
                {
                    name: 'plate',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'model',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'brand',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }

}
