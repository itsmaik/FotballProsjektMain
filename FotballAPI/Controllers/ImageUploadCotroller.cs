using Microsoft.AspNetCore.Mvc;

namespace FotballAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ImageUploadController(IWebHostEnvironment webHostEnvironment) : ControllerBase
{
  [HttpPost]
  public async Task<IActionResult> Post(IFormFile file) // Bildet kommer inni IformFile-objektet
  {
    try
    {
      // needs if else to check that picture is not null
      string webRootPath = webHostEnvironment.WebRootPath;
      string absolutePath = Path.Combine(
        webRootPath,
        "images/athletes",
        file.FileName // Bruk GUID for tilfeldig navn 
      );

      using (var fileStream = new FileStream(absolutePath, FileMode.Create))
      {
        await file.CopyToAsync(fileStream);
      };

      return Created();
    }
    catch
    {
      return StatusCode(500);
    }
  }
}