import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createPost1615993077238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'post',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'text',
                    type: 'varchar'
                },
                {
                    name: 'categoryId',
                    type: 'integer',
                    unsigned: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
        }))

        await queryRunner.createForeignKey('post', new TableForeignKey({
            columnNames: ['categoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('post')
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('categoryId') !== -1)
        if (foreignKey)
            await queryRunner.dropForeignKey('post', foreignKey)
        await queryRunner.dropColumn('post', 'categoryId')
        await queryRunner.dropTable('post')
    }

}
