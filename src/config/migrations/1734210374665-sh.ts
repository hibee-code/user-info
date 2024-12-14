import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1734210374665 implements MigrationInterface {
    name = 'Sh1734210374665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipCode" character varying NOT NULL, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_academic_background" ("id" SERIAL NOT NULL, "schools" jsonb NOT NULL, "userId" integer, CONSTRAINT "PK_0c5ee2e0447c890cab02c1a2ac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" SERIAL NOT NULL, "profilePhoto" character varying, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dob" date NOT NULL, "occupation" character varying NOT NULL, "gender" character varying NOT NULL, "contactId" integer, "addressId" integer, CONSTRAINT "REL_0abd165af6adcac4bffc8eb258" UNIQUE ("contactId"), CONSTRAINT "REL_917dca91af4d24821a88ab0bbd" UNIQUE ("addressId"), CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_contact" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, "fax" character varying(20), "linkedInUrl" character varying(255), CONSTRAINT "PK_894dc440ade508fba6831724ec6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_academic_background" ADD CONSTRAINT "FK_336152a919179a7d6376a6f93ca" FOREIGN KEY ("userId") REFERENCES "user_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_info" ADD CONSTRAINT "FK_0abd165af6adcac4bffc8eb2585" FOREIGN KEY ("contactId") REFERENCES "user_contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_info" ADD CONSTRAINT "FK_917dca91af4d24821a88ab0bbdd" FOREIGN KEY ("addressId") REFERENCES "user_address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_info" DROP CONSTRAINT "FK_917dca91af4d24821a88ab0bbdd"`);
        await queryRunner.query(`ALTER TABLE "user_info" DROP CONSTRAINT "FK_0abd165af6adcac4bffc8eb2585"`);
        await queryRunner.query(`ALTER TABLE "user_academic_background" DROP CONSTRAINT "FK_336152a919179a7d6376a6f93ca"`);
        await queryRunner.query(`DROP TABLE "user_contact"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`DROP TABLE "user_academic_background"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
    }

}
