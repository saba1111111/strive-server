import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLlmsResponsesTable1748272903818 implements MigrationInterface {
  name = 'CreateLlmsResponsesTable1748272903818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."llm_responses_model_enum" AS ENUM('deepseek-chat', 'gpt-4.1-nano')`);
    await queryRunner.query(
      `CREATE TABLE "llm_responses" ("id" SERIAL NOT NULL, "admin_id" integer, "prompt" text NOT NULL, "response" text NOT NULL, "model" "public"."llm_responses_model_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_706d447b373bb302460d92de7f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "llm_responses" ADD CONSTRAINT "FK_1727b12e8dd149ac83abd18e820" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "llm_responses" DROP CONSTRAINT "FK_1727b12e8dd149ac83abd18e820"`);
    await queryRunner.query(`DROP TABLE "llm_responses"`);
    await queryRunner.query(`DROP TYPE "public"."llm_responses_model_enum"`);
  }
}
