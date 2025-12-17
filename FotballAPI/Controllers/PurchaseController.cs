using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FotballAPI.Contexts;
using FotballAPI.Models;

namespace FotballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseController(FotballContext _context) : ControllerBase
{
    // POST => api/purchase/{athleteId}
    [HttpPost("{athleteId}")]
    public async Task<IActionResult> PurchaseAthlete(int athleteId)
    {
        // Find athlete
        Athlete? athlete = await _context.Athletes.FindAsync(athleteId);
        if (athlete == null) return NotFound("Athlete not found.");

        // Already purchased?
        if (athlete.PurchaseStatus)
            return BadRequest("Athlete is already purchased.");

        // Get finance record (only 1 row expected)
        Finance? finance = await _context.Finances.FirstOrDefaultAsync();
        if (finance == null)
            return BadRequest("Finance record not found. Open /api/finances once to create it.");

        // Enough money?
        if (finance.MoneyLeft < athlete.Price)
            return BadRequest("Not enough money left to purchase this athlete.");

        // Update finance + athlete
        athlete.PurchaseStatus = true;

        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases += 1;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Athlete purchased.",
                athleteId = athlete.Id,
                finance
            });
        }
        catch (DbUpdateException)
        {
            return Problem("Could not purchase athlete.", statusCode: 500);
        }
    }
}