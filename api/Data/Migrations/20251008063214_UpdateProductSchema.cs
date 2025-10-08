using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "pictureUrl",
                table: "Products",
                newName: "PictureUrl");

            migrationBuilder.RenameColumn(
                name: "QuantityInstock",
                table: "Products",
                newName: "QuantityInStock");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantityInStock",
                table: "Products",
                newName: "QuantityInstock");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Products",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "PictureUrl",
                table: "Products",
                newName: "pictureUrl");
        }
    }
}
