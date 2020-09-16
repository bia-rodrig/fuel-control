import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateRegisters1600243905852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'registers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'carPlate',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'varchar'
                    },
                    {
                        name: 'currentKm',
                        type: 'integer'
                    },
                    {
                        name: 'fuel',
                        type: 'varchar',
                        isNullable: true
                        
                    },
                    {
                        name: 'liters',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'priceLiter',
                        type: 'money',
                        isNullable: true
                    },
                    {
                        name: 'totalValue',
                        type: 'money',
                        isNullable: true
                    },
                    {
                        name: 'gasInfo',
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
            })
        );     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('registers');
    }

}
