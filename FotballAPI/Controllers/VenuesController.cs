using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FotballAPI.Contexts;
using FotballAPI.Models;

namespace FotballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenuesController(FotballContext _fotballContext) : ControllerBase
{
    // GET => api/venues
    [HttpGet]
    public async Task<List<Venue>> GetAllVenues()
    {
        List<Venue> venues = await _fotballContext.Venues.ToListAsync();
        return venues;
    }
}

