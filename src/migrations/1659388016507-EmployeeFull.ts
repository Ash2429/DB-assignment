import {MigrationInterface, QueryRunner} from "typeorm";

export class EmployeeFull1659388016507 implements MigrationInterface {
    name = 'EmployeeFull1659388016507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "doj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "doj"`);
    }

}
