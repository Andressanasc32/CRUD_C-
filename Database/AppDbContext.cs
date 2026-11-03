using Microsoft.EntityFrameworkCore;
using TesteWeb.Models;
namespace TesteWeb.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Personagens> DBZ { get; set; }
    }
}