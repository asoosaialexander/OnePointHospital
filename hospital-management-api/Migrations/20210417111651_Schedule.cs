using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace hospital_management_api.Migrations
{
    public partial class Schedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "FinalPrice",
                table: "Appointment");

            migrationBuilder.RenameColumn(
                name: "FullPrice",
                table: "Appointment",
                newName: "ConsulatationFee");

            migrationBuilder.CreateTable(
                name: "AppointmentSlot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: true),
                    DoctorId = table.Column<int>(type: "integer", nullable: true),
                    HospitalId = table.Column<int>(type: "integer", nullable: true),
                    Day = table.Column<string>(type: "text", nullable: true),
                    Hour = table.Column<int>(type: "integer", nullable: false),
                    Minute = table.Column<int>(type: "integer", nullable: false),
                    NoOfSlots = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentSlot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentSlot_Doctor_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppointmentSlot_Hospital_HospitalId",
                        column: x => x.HospitalId,
                        principalTable: "Hospital",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentSlotCancelled",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AppointmentSlotId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentSlotCancelled", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentSlotCancelled_AppointmentSlot_AppointmentSlotId",
                        column: x => x.AppointmentSlotId,
                        principalTable: "AppointmentSlot",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentSlot_DoctorId",
                table: "AppointmentSlot",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentSlot_HospitalId",
                table: "AppointmentSlot",
                column: "HospitalId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentSlotCancelled_AppointmentSlotId",
                table: "AppointmentSlotCancelled",
                column: "AppointmentSlotId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentSlotCancelled");

            migrationBuilder.DropTable(
                name: "AppointmentSlot");

            migrationBuilder.RenameColumn(
                name: "ConsulatationFee",
                table: "Appointment",
                newName: "FullPrice");

            migrationBuilder.AddColumn<float>(
                name: "Discount",
                table: "Appointment",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "FinalPrice",
                table: "Appointment",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
