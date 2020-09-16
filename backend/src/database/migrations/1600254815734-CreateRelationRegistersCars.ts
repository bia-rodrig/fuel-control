import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateRelationRegistersCars1600254815734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('registers', new TableForeignKey({
            name: 'RegisterCarPlate', //nome da chave estrangeira,
            //qual coluna da Registers, vai receber a chave estrangeira
            columnNames: ['carPlate'],
            //qual coluna na tabela Cars, vai ser a chave estrangeira no Registers
            referencedColumnNames: ['plate'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('registers', 'RegisterCarPlate');
    }

}
