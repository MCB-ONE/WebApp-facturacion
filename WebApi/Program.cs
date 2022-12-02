using BussinesLogic.Data;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



// 1. Declaraci�n de los dBContext

// 1.2 A�adir DBcontex para la seguridad
builder.Services.AddDbContext<SecurityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SecurityConnection"));
});

// 1.3. A�adir DBcontext por defecto 
//builder.Services.AddDbContext<ApiDbContext>(options =>
//{
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//});

// 2. A�adir servicio de Identity y configurarlo para poder gestionar la seguridad
var identityBuilder = builder.Services.AddIdentityCore<Usuario>();
identityBuilder = new IdentityBuilder(identityBuilder.UserType, identityBuilder.Services);

// 2.1 A�adir roles al servicio Identity
identityBuilder.AddRoles<IdentityRole>();

// 2.2 Seteamos donde se va a almacenar la informaci�n de identidad.
identityBuilder.AddEntityFrameworkStores<SecurityDbContext>();

/* 2.3 A�adimos la funcionalidad SigninManager => Permite instanciar un objeto UserManager para gestionar las transacciones con las tablas de seguridad */
identityBuilder.AddSignInManager<SignInManager<Usuario>>();


// 2.4. A�adimos servicio de autenticaci�n a la app
builder.Services.AddAuthentication();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3.1 Ejecutar migraciones iniciales 
RunMigration();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2.4 A�adir el servicio de autenticaci�n
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


// 3. M�todo para ejeciutar las migraciones con seeding data al iniciar la app
async void RunMigration()
{
    var loggerFactory = app.Services.GetRequiredService<ILoggerFactory>();
    using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();

    try
    {

        // Seeding data inicial de usuarios
        var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<Usuario>>();
        var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var securityContext = serviceScope.ServiceProvider.GetRequiredService<SecurityDbContext>();
        await securityContext.Database.MigrateAsync();
        await SecurityDbContextData.SeedUserAsync(userManager, roleManager);

        // Seeding data inicial de las tablas de entidades no relacionadas con la seguridad
        //var apiContext = serviceScope.ServiceProvider.GetRequiredService<ApiDbContext>();
        //await apiContext.Database.MigrateAsync();
        //await ApiDbContextData.SeedDataAsync(apiContext, loggerFactory);


    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Error en el proceso de migraci�n inicial");

    }

}
