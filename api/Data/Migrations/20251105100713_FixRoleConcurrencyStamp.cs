using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixRoleConcurrencyStamp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2929cb2d-77a1-47e4-943c-56c978acc231",
                column: "ConcurrencyStamp",
                value: "e3cf1c09-d97b-4d92-9b12-555af1263b7e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2685e7c-a6d9-4bc5-bbce-25b1ac8e6099",
                column: "ConcurrencyStamp",
                value: "9e3b1c8e-6f4d-4f62-9331-fbba43a1c1a5");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2929cb2d-77a1-47e4-943c-56c978acc231",
                column: "ConcurrencyStamp",
                value: "7e868ddf-32f1-48a1-9528-ee0aad07e4ed");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2685e7c-a6d9-4bc5-bbce-25b1ac8e6099",
                column: "ConcurrencyStamp",
                value: "0e81c4d3-ae3d-4c88-ae2d-2519bc3c584c");
        }
    }
}
