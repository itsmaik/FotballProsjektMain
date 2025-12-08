using FotballAPI.Interfaces;

namespace FotballAPI.Models;

public class Venue : IVenue
{
    public int Id { get; set; }
    public string VenueName { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string VenueImage { get; set; } = string.Empty;
}