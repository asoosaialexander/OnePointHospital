using Microsoft.EntityFrameworkCore.Migrations;

namespace hospital_management_api.Migrations
{
    public partial class Addnewcol2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Colspan",
                table: "Question",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colspan",
                table: "Question");
        }
    }
}
