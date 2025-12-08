using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FotballAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenamedProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Purchased",
                table: "Athletes",
                newName: "PurchaseStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchaseStatus",
                table: "Athletes",
                newName: "Purchased");
        }
    }
}
