import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCampaignsTable1745902747610 implements MigrationInterface {
  name = 'CreateCampaignsTable1745902747610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."campaigns_status_enum" AS ENUM('NOT_STARTED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED_BY_ADMIN', 'ERROR_OCCURRED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaigns" ("id" SERIAL NOT NULL, "internalName" character varying(100) NOT NULL, "internalDescription" text, "publicTitle" character varying(255) NOT NULL, "publicMessage" text, "start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE, "admin_id" integer, "status" "public"."campaigns_status_enum" NOT NULL DEFAULT 'NOT_STARTED', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD CONSTRAINT "FK_6241e577219b9885ec8e7e44588" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_6241e577219b9885ec8e7e44588"`);
    await queryRunner.query(`DROP TABLE "campaigns"`);
    await queryRunner.query(`DROP TYPE "public"."campaigns_status_enum"`);
  }
}
