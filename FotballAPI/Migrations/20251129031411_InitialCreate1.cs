using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FotballAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SportsWorld",
                table: "SportsWorld");

            migrationBuilder.RenameTable(
                name: "SportsWorld",
                newName: "CompanyBooks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyBooks",
                table: "CompanyBooks",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyBooks",
                table: "CompanyBooks");

            migrationBuilder.RenameTable(
                name: "CompanyBooks",
                newName: "SportsWorld");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SportsWorld",
                table: "SportsWorld",
                column: "Id");
        }
    }
}
