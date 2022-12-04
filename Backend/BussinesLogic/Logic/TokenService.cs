using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BussinesLogic.Logic
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        // Objeto accesor a appSettings
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));

        }

        public string CreateToken(Usuario usuario, IList<string> roles)
        {
            // Definimos los claims => información a enviar en el token
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                new Claim(JwtRegisteredClaimNames.Name, usuario.Nombre),
                new Claim(JwtRegisteredClaimNames.FamilyName, usuario.Apellido),
                new Claim("Username", usuario.UserName)
            };

            if (roles != null && roles.Count > 0)
            {
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

            }


            // Definimos las credenciales => indicar el tipo de algoritmo de emcriptación
            var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

            // Token description => defnir las caracteristicas del token
            var tokenConfig = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(60),
                SigningCredentials = credentials,
                // configuración desde donde se va a generar el token (debe ser la ip del servidor y su puerto)
                Issuer = _config["Token:Issuer"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenConfig);
            // Método WriteToken(token) para devolver el token serializado a valor alfanumérico
            return tokenHandler.WriteToken(token);

        }
    }
}
