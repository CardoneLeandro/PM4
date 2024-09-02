import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderDetailsTable1725064348341 implements MigrationInterface {
  name = 'OrderDetailsTable1725064348341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying DEFAULT 'default-image.jpg', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_3ff3367344edec5de2355a562e" UNIQUE ("order_id"), CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "order_detail_id" uuid, CONSTRAINT "REL_aabcd310c52b17f0ee0c97a1c8" UNIQUE ("order_detail_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" bigint, "country" character varying(50), "address" character varying(80), "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_order_details" ("product_id" uuid NOT NULL, "order_detail_id" uuid NOT NULL, CONSTRAINT "PK_714a3cdb992ede0168cc2d44c77" PRIMARY KEY ("product_id", "order_detail_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6aea2779e61db247eaeec91f3b" ON "product_order_details" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cb73174ea485aac3aac71ffde1" ON "product_order_details" ("order_detail_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "order_detail_products" ("order_detail_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_085156902c422ffeb73050b3819" PRIMARY KEY ("order_detail_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6efb404ee1838c8f54b778c799" ON "order_detail_products" ("order_detail_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_324567747b3929399f66468ba4" ON "order_detail_products" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ADD CONSTRAINT "FK_3ff3367344edec5de2355a562ee" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_aabcd310c52b17f0ee0c97a1c8a" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order_details" ADD CONSTRAINT "FK_6aea2779e61db247eaeec91f3b1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order_details" ADD CONSTRAINT "FK_cb73174ea485aac3aac71ffde15" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_products" ADD CONSTRAINT "FK_6efb404ee1838c8f54b778c7993" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_products" ADD CONSTRAINT "FK_324567747b3929399f66468ba43" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail_products" DROP CONSTRAINT "FK_324567747b3929399f66468ba43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_products" DROP CONSTRAINT "FK_6efb404ee1838c8f54b778c7993"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order_details" DROP CONSTRAINT "FK_cb73174ea485aac3aac71ffde15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order_details" DROP CONSTRAINT "FK_6aea2779e61db247eaeec91f3b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_aabcd310c52b17f0ee0c97a1c8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" DROP CONSTRAINT "FK_3ff3367344edec5de2355a562ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_324567747b3929399f66468ba4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6efb404ee1838c8f54b778c799"`,
    );
    await queryRunner.query(`DROP TABLE "order_detail_products"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cb73174ea485aac3aac71ffde1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6aea2779e61db247eaeec91f3b"`,
    );
    await queryRunner.query(`DROP TABLE "product_order_details"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
