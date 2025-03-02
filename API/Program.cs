using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
// Enable the CORS middleware using the defined policy
app.UseCors(opt =>
{
 opt.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod();
});

app.MapControllers();


Dbinitilizer.InitDb(app);


app.Run();
