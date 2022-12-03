using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace BussinesLogic.Data
{
    public class SecurityDbContextData
    {
        public static async Task SeedUserAsync(UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {

                var admin = new Usuario
                {
                    Nombre = "Admin",
                    Apellido = "Test",
                    UserName = "AdminTest",
                    Email = "admin.test@gmail.com",

                };

                await userManager.CreateAsync(admin, "AdminTest1234$");

                var usuario = new Usuario
                {
                    Nombre = "Usuario",
                    Apellido = "Test",
                    UserName = "UsuarioTest",
                    Email = "usuario.test@gmail.com",

                };

                await userManager.CreateAsync(usuario, "UsuarioTest1234$");

            }

            if (!roleManager.Roles.Any())
            {
                var role = new IdentityRole
                {
                    Name = "ADMIN"
                };

                await roleManager.CreateAsync(role);
            }

        }
    }
}

