using Microsoft.EntityFrameworkCore.Migrations;

namespace hospital_management_api.Migrations
{
    public partial class InitialCreatedd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Appointment");

            migrationBuilder.RenameColumn(
                name: "CancellationReason",
                table: "Appointment",
                newName: "Status");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Appointment",
                newName: "CancellationReason");

            migrationBuilder.AddColumn<bool>(
                name: "IsCancelled",
                table: "Appointment",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
