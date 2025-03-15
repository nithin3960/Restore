using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets{ get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole {Id ="c3cb7cdb-6914-4a1d-a78b-f959ee1fcb8c", Name="Member", NormalizedName="MEMBER"},
            new IdentityRole {Id ="b51e2677-0cc6-4ab9-90cb-90969a3e6699", Name="Admin", NormalizedName="ADMIN"}
        );
    }

}
