using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace hospital_management_api.Migrations
{
    public partial class AddCustomForm2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomFormId",
                table: "Question",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomForms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Columns = table.Column<int>(type: "integer", nullable: false),
                    AlwaysInclude = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomForms", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Question_CustomFormId",
                table: "Question",
                column: "CustomFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question",
                column: "CustomFormId",
                principalTable: "CustomForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question");

            migrationBuilder.DropTable(
                name: "CustomForms");

            migrationBuilder.DropIndex(
                name: "IX_Question_CustomFormId",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "CustomFormId",
                table: "Question");
        }
    }
}
