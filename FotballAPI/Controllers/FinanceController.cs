using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FotballAPI.Contexts;
using FotballAPI.Models;

namespace FotballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinancesController(FotballContext _context) : ControllerBase
{
    // GET=> api/finances
    [HttpGet]
    public async Task<ActionResult<Finance>> GetFinance()
    {
        Finance? finance = await _context.Finances.FirstOrDefaultAsync();

        if (finance == null)
        {
            finance = new Finance
            {
                MoneyLeft = 0,
                MoneySpent = 0,
                NumberOfPurchases = 0
            };

            try
            {
                _context.Finances.Add(finance);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Problem("Could not create finance record.", statusCode: 500);
            }
        }

        return Ok(finance);
    }

    // UPDATE=> api/finances/id
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Finance finance)
    {
        if (id != finance.Id) return BadRequest("Id does not match request");

        _context.Entry(finance).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateException)
        {
            return Problem("Could not update finance.", statusCode: 500);
        }
    }
}