import {MigrationInterface, QueryRunner} from "typeorm";

export class EmpFull1659420221403 implements MigrationInterface {
    name = 'EmpFull1659420221403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "doj" TO "date_of_joining"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "date_of_joining" TO "doj"`);
    }

}
