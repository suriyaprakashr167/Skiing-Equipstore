using System;
using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
    .HasData(
        new IdentityRole
        {
            Id = "2929cb2d-77a1-47e4-943c-56c978acc231",
            Name = "Member",
            NormalizedName = "MEMBER",
            ConcurrencyStamp = "e3cf1c09-d97b-4d92-9b12-555af1263b7e"
        },
        new IdentityRole
        {
            Id = "a2685e7c-a6d9-4bc5-bbce-25b1ac8e6099",
            Name = "Admin",
            NormalizedName = "ADMIN",
            ConcurrencyStamp = "9e3b1c8e-6f4d-4f62-9331-fbba43a1c1a5"
        }
    );
    }
}
