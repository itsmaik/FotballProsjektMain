namespace FotballAPI.Interfaces;

interface IVenue
{
    int Id { get; set; }
    string VenueName { get; set; }
    int Capacity { get; set; }
    string VenueImage { get; set; }
}