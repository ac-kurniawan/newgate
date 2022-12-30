import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateKongTable1672329620513 implements MigrationInterface {
  private tableName = 'kong';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable(this.tableName);
    await queryRunner.dropTable(this.tableName);
  }
}
