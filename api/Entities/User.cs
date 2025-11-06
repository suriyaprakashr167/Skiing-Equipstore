using System;
using Microsoft.AspNetCore.Identity;

namespace api.Entities;

public class User : IdentityUser
{
    public int? AddressId { get; set; }
    public Address? Address { get; set; }
}
