using Microsoft.EntityFrameworkCore.Migrations;

namespace hospital_management_api.Migrations
{
    public partial class RemoveFormIdColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FormId",
                table: "Question");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormId",
                table: "Question",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
