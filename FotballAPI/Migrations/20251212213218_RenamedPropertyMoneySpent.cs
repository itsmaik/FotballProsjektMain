using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FotballAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenamedPropertyMoneySpent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MoneySpendt",
                table: "Finances",
                newName: "MoneySpent");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MoneySpent",
                table: "Finances",
                newName: "MoneySpendt");
        }
    }
}
