using Microsoft.EntityFrameworkCore;
using FotballAPI.Models;

namespace FotballAPI.Contexts;

public class FotballContext(DbContextOptions<FotballContext> options) :
DbContext(options)
{
    // Models.navn = FotballPlayer .. Tabell.navn = FotballPlayers
    public DbSet<Athlete> Athletes { get; set; } 

    public DbSet<Finance> Finances { get; set; } //  siden vi bare skal ha data for et firma.

    public DbSet<Venue> Venues { get; set; }
}