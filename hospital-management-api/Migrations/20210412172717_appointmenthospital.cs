using Microsoft.EntityFrameworkCore.Migrations;

namespace hospital_management_api.Migrations
{
    public partial class appointmenthospital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HospitalId",
                table: "Appointment",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_HospitalId",
                table: "Appointment",
                column: "HospitalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointment_Hospital_HospitalId",
                table: "Appointment",
                column: "HospitalId",
                principalTable: "Hospital",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointment_Hospital_HospitalId",
                table: "Appointment");

            migrationBuilder.DropIndex(
                name: "IX_Appointment_HospitalId",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "HospitalId",
                table: "Appointment");
        }
    }
}
