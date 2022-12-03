using AutoMapper;
using BussinesLogic.Data;
using BussinesLogic.Logic;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using WebApi.Dtos.UsuarioDtos;

var builder = WebApplication.CreateBuilder(args);



// 1. Declaración de los dBContext

// 1.2 Añadir DBcontex para la seguridad
builder.Services.AddDbContext<SecurityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SecurityConnection"));
});

//1.3.Añadir DBcontext por defecto 
builder.Services.AddDbContext<ApiDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 2. Generar builder para servicio de Identity y configurarlo para poder gestionar la seguridad
var identityBuilder = builder.Services.AddIdentityCore<Usuario>();
identityBuilder = new IdentityBuilder(identityBuilder.UserType, identityBuilder.Services);

// 5. Añadir roles al servicio Identity
identityBuilder.AddRoles<IdentityRole>();

// 2.1 Seteamos donde se va a almacenar la información de identidad.
identityBuilder.AddEntityFrameworkStores<SecurityDbContext>();
/* 2.2 Añadimos la funcionalidad SigninManager => Permite instanciar un objeto UserManager para gestionar las transacciones con las tablas de seguridad */
identityBuilder.AddSignInManager<SignInManager<Usuario>>();

// 3. Añadimos servicio de autenticación a la app
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidateAudience = false
    };
});


// 2.2 Seteamos donde se va a almacenar la información de identidad.
identityBuilder.AddEntityFrameworkStores<SecurityDbContext>();

/* 2.3 Añadimos la funcionalidad SigninManager => Permite instanciar un objeto UserManager para gestionar las transacciones con las tablas de seguridad */
identityBuilder.AddSignInManager<SignInManager<Usuario>>();


// 2.4. Añadimos servicio de autenticación a la app
builder.Services.AddAuthentication();



// Add services to the container.

// 3.1 Inyectar objeto que inicializa token service para utilizarlo en cualquier clase de la app
builder.Services.AddScoped<ITokenService, TokenService>();

// 4.1 AÑadir system clock instance object => Permite agregar hora en la que se insertan nuevos registros en la tabla de seguridad
builder.Services.AddSingleton<ISystemClock, SystemClock>();

builder.Services.AddControllers();


// 7. Añadir politica de autorización
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserOnlyPolicy", policy => policy.RequireClaim("UserOnly", "User1"));
});

// 9. Habilitar CORS (Que entornos, que tipo de métodos y cabeceras pueden acceder ala API y enviar peticiones
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicity", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
    });
});

// 6 Servicio automapper
builder.Services.AddAutoMapper(typeof(UsuarioMappingProfile));


// Configuramos los controladores para que ignoren los posibles ciclos de entidades anidadas/ relacionadas
builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

//8. Añadir repositorio de seguridad
builder.Services.AddScoped(typeof(IGenericSecurityRepository<>), typeof(GenericSecurityRepository<>));

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

// 3.2 Añadir el servicio de autenticación
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


// 3. Método para ejeciutar las migraciones con seeding data al iniciar la app
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
        var apiContext = serviceScope.ServiceProvider.GetRequiredService<ApiDbContext>();
        await apiContext.Database.MigrateAsync();
        await ApiDbContextData.SeedDataAsync(apiContext, loggerFactory);


    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Error en el proceso de migración inicial");

    }

}
