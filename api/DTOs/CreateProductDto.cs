using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs;

public class CreateProductDto
{
    [Required]
    public  string name { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    [Required]
    [Range(100, double.PositiveInfinity)]
    public long Price { get; set; }
    [Required]
    public IFormFile File { get; set; } = null!;
    [Required]
    public required string Brand { get; set; }
    [Required]
    public required string Type { get; set; }
    [Required]
    [Range(0,200)]
    public int QuantityInStock { get; set; }
}
