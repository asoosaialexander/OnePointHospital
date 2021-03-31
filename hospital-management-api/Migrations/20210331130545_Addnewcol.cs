using Microsoft.EntityFrameworkCore.Migrations;

namespace hospital_management_api.Migrations
{
    public partial class Addnewcol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question");

            migrationBuilder.AlterColumn<int>(
                name: "CustomFormId",
                table: "Question",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question",
                column: "CustomFormId",
                principalTable: "CustomForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question");

            migrationBuilder.AlterColumn<int>(
                name: "CustomFormId",
                table: "Question",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_CustomForms_CustomFormId",
                table: "Question",
                column: "CustomFormId",
                principalTable: "CustomForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
