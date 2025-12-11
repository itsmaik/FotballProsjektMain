using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FotballAPI.Contexts;
using FotballAPI.Models;

namespace FotballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AthletesController(FotballContext _fotballContext) : ControllerBase
{
    [HttpGet] // GET: api/athletes
    public async Task<List<Athlete>> GetAll()
    {
        List<Athlete> athletes = await _fotballContext.Athletes.ToListAsync();
        return athletes;
    }

     
    [HttpGet("{id}")] // GET: api/athletes/id
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        Athlete? athlete = await _fotballContext.Athletes.FindAsync(id);

        if (athlete == null)
        {
            return NotFound();
        }

        return athlete;
    }

    // DELETE: api/athletes/id
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        Athlete? athlete = await _fotballContext.Athletes.FindAsync(id);
        if (athlete == null) return NotFound();

        _fotballContext.Athletes.Remove(athlete);
        await _fotballContext.SaveChangesAsync();
        return NoContent();
    }

    private bool AthleteExists(int id)
    {
        return _fotballContext.Athletes.Any(a => a.Id == id);
    }

    

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Athlete athlete)
    {
        if (id != athlete.Id) return BadRequest("Id mismatch");

        _fotballContext.Entry(athlete).State = EntityState.Modified;

        try
        {
            await _fotballContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AthleteExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }


    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _fotballContext.Athletes.Add(newAthlete);
            await _fotballContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }


}