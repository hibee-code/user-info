import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1734025683041 implements MigrationInterface {
    name = 'Sh1734025683041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_contact" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying(20) NOT NULL, "fax" character varying(20), "linkedInUrl" character varying(255), CONSTRAINT "PK_894dc440ade508fba6831724ec6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_academic" ("id" SERIAL NOT NULL, "schoolName" character varying(255) NOT NULL, "startDate" date, "endDate" date, "degree" character varying(255), "fieldOfStudy" character varying(255), "userId" integer, CONSTRAINT "PK_1c51bf69bd6440d8efe3ff7bb30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" SERIAL NOT NULL, "profilePhoto" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "dob" date NOT NULL, "occupation" character varying(100) NOT NULL, "gender" character varying(10) NOT NULL, CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zipCode" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_academic" ADD CONSTRAINT "FK_4b8af4c20e78ace4d6b324a1294" FOREIGN KEY ("userId") REFERENCES "user_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"`);
        await queryRunner.query(`ALTER TABLE "user_academic" DROP CONSTRAINT "FK_4b8af4c20e78ace4d6b324a1294"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`DROP TABLE "user_academic"`);
        await queryRunner.query(`DROP TABLE "user_contact"`);
    }

}
