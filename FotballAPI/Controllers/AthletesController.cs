using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FotballAPI.Contexts;
using FotballAPI.Models;

namespace FotballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AthletesController(FotballContext _fotballContext) : ControllerBase
{   
    // GET=> api/athletes
    [HttpGet] 
    public async Task<List<Athlete>> GetAll()
    {
        List<Athlete> athletes = await _fotballContext.Athletes.ToListAsync();
        return athletes;
    }

    // GET=> api/athletes/id
    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        Athlete? athlete = await _fotballContext.Athletes.FindAsync(id);

        if (athlete == null)
        {
            return NotFound();
        }

        return Ok(athlete);
    }

    // DELETE=> api/athletes/id
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        Athlete? athlete = await _fotballContext.Athletes.FindAsync(id);
        if (athlete == null) return NotFound();

        _fotballContext.Athletes.Remove(athlete);

        try
        {
            await _fotballContext.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateException)
        {
            return Problem("Could not delete athlete.", statusCode: 500);
        }
    }


    // UPDATE=> api/athletes/id
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Athlete athlete)
    {
        if (id != athlete.Id) return BadRequest("Id mismatch between route and body");

        _fotballContext.Entry(athlete).State = EntityState.Modified;

        try
        {
            await _fotballContext.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateException)
        {
            return Problem("Could not update athlete.", statusCode: 500);
        }
    }

    // CREATE=> api/athletes/id
    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _fotballContext.Athletes.Add(newAthlete);
            await _fotballContext.SaveChangesAsync();
            return Created();
        }
        catch (DbUpdateException)
        {
            return Problem("Could not create athlete.", statusCode: 500);
        }
    }


}