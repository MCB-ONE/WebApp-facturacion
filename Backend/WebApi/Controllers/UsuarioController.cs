using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Dtos;
using WebApi.Dtos.UsuarioDtos;
using WebApi.Errors;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : BaseApiController
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly ITokenService _tokenServcie;
        private readonly IPasswordHasher<Usuario> _passwordHasher;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly IGenericSecurityRepository<Usuario> _securityRepository;

        public UsuarioController(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, ITokenService tokenServcie, IPasswordHasher<Usuario> passwordHasher, RoleManager<IdentityRole> roleManager, IMapper mapper, IGenericSecurityRepository<Usuario> securityRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenServcie = tokenServcie;
            _passwordHasher = passwordHasher;
            _roleManager = roleManager;
            _mapper = mapper;
            _securityRepository = securityRepository;
        }

        /// <summary>
        /// Permite acceder al sistema a un usuario
        /// </summary>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDto>> Login(LoginDto loginDto)
        {
            var usuario = await _userManager.FindByEmailAsync(loginDto.Email);

            if (usuario is null)
                return Unauthorized(new CodeErrorResponse(401, "Email incorrecto"));

            /* Ejecutamos el login mediante el servicio _signInManager y su método CheckPasswordSignInAsync
             * => CheckPasswordSignInAsync: compara email y pasword contra la BDD */
            var resultado = await _signInManager.CheckPasswordSignInAsync(usuario, loginDto.Password, false);

            if (!resultado.Succeeded)
                return Unauthorized(new CodeErrorResponse(401, "Contraseña incorrecta"));

            var roles = await _userManager.GetRolesAsync(usuario);


            return new UsuarioDto
            {
                Id = usuario.Id,
                Email = usuario.Email,
                UserName = usuario.UserName,
                Token = _tokenServcie.CreateToken(usuario, roles), // Usar token service para generar el token
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Imagen = usuario.Imagen,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }


        /// <summary>
        /// Permite registrase en el sistema a un usuario
        /// </summary>
        /// <returns></returns>
        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioDto>> Registrar(SingUpDto singUpDto)
        {
            var usuario = new Usuario
            {
                Email = singUpDto.Email,
                UserName = singUpDto.UserName,
                Nombre = singUpDto.Nombre,
                Apellido = singUpDto.Apellido,
            };

            var resultado = await _userManager.CreateAsync(usuario, singUpDto.Password);

            if (!resultado.Succeeded)
                return BadRequest(new CodeErrorResponse(400));

            return new UsuarioDto
            {
                Id = usuario.Id,
                Email = usuario.Email,
                UserName = usuario.UserName,
                Nombre = usuario.Nombre,
                Apellido = singUpDto.Apellido,
                Token = _tokenServcie.CreateToken(usuario, null), // Usar token service para generar el token
                Admin = false
            };

        }

        /// <summary>
        /// Permite a un usuario registrado editar sus propios datos de perfil de usuario
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPut("actualizar/{id}")]
        public async Task<ActionResult<UsuarioDto>> Actualizar(string id, SingUpDto singUpDto)
        {
            var usuario = await _userManager.FindByIdAsync(id);

            if (usuario is null)
                return NotFound(new CodeErrorResponse(404, $"El usuario con id {id} no existe"));

            usuario.Nombre = singUpDto.Nombre;
            usuario.Apellido = singUpDto.Apellido;
            usuario.Imagen = singUpDto.Imagen;
            usuario.UpdatedAt = DateTime.Now;

            if (!string.IsNullOrEmpty(singUpDto.Password))
                usuario.PasswordHash = _passwordHasher.HashPassword(usuario, singUpDto.Password);

            var resultado = await _userManager.UpdateAsync(usuario);

            if (!resultado.Succeeded)
                return BadRequest(new CodeErrorResponse(400, $"No se ha podido actualizar el usuario con id{id}"));


            var roles = await _userManager.GetRolesAsync(usuario);

            return new UsuarioDto
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Email = usuario.Email,
                UserName = usuario.UserName,
                Token = _tokenServcie.CreateToken(usuario, roles),
                Imagen = usuario.Imagen,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        /// <summary>
        /// Permite a los Administradores obtener la data de todos los usuarios de forma ordeanda, paginada y filtrada.
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        public async Task<ActionResult<Pagination<UsuarioDto>>> GetUsuarios()
        {
            var usuarios = await _securityRepository.GetAllAsync();

            var data = _mapper.Map<IReadOnlyList<Usuario>, IReadOnlyList<UsuarioDto>>(usuarios);

            foreach (var user in data)
            {
                var roles = await _userManager.GetRolesAsync(_mapper.Map<Usuario>(user));
                user.Admin = roles.Contains("ADMIN") ? true : false;
            }

            return Ok(data);
        }


        /// <summary>
        /// Permite a los Administradores del sistema añadir o eliminar un rol a un usuario existente
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpPut("role/{id}")]
        public async Task<ActionResult<UsuarioDto>> ActualizarRole(string id, RoleDto roleParam)
        {
            var role = await _roleManager.FindByNameAsync(roleParam.Nombre);
            if (role is null)
                return NotFound(new CodeErrorResponse(44, $"El role {roleParam.Nombre} no existe"));

            var usuario = await _userManager.FindByIdAsync(id);

            if (usuario is null)
                return NotFound(new CodeErrorResponse(404, $"El usuario con id {id} no existe"));

            var usuarioDto = _mapper.Map<UsuarioDto>(usuario);

            if (roleParam.Status)
            {
                // Si llega desde el cliente estatus = true se ha de añadir el nuevo role
                var resultado = await _userManager.AddToRoleAsync(usuario, roleParam.Nombre);

                if (resultado.Succeeded)
                    usuarioDto.Admin = true;

                if (resultado.Errors.Any())
                {
                    // Manejar posible excepción si el usuario ya tiene el role establecido en su registro de la BDD
                    if (resultado.Errors.Where(error => error.Code == "UserAlreadyInRole").Any())
                        usuarioDto.Admin = true;
                }
            }
            else
            {
                var resultado = await _userManager.RemoveFromRoleAsync(usuario, roleParam.Nombre);
                if (resultado.Succeeded)
                    usuarioDto.Admin = false;
            }

            if (usuarioDto.Admin)
            {
                var roles = new List<string>();
                roles.Add("ADMIN");
                usuarioDto.Token = _tokenServcie.CreateToken(usuario, roles);
            }
            else
            {
                usuarioDto.Token = _tokenServcie.CreateToken(usuario, null);
            }

            return usuarioDto;
        }

        /// <summary>
        /// Permite a los Administradores del sistema obtener la data de un usuario
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpGet("account/{id}")]
        public async Task<ActionResult<UsuarioDto>> GetUsuarioBy(string id)
        {
            var usuario = await _userManager.FindByIdAsync(id);

            if (usuario is null)
                return NotFound(new CodeErrorResponse(404, $"El usuario con id {id} no existe."));

            var roles = await _userManager.GetRolesAsync(usuario);

            return new UsuarioDto
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Email = usuario.Email,
                UserName = usuario.UserName,
                Imagen = usuario.Imagen,
                Admin = roles.Contains("ADMIN") ? true : false
            };

        }

        /// <summary>
        /// Permite recuperar el ususrio actual a partir de un JWT incluido en los headers de la petición HTTP
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("recuperar")]
        public async Task<ActionResult<UsuarioDto>> GetUsuario()
        {
            // El token se pasa en los headers de la request, por eso el método no lo recive cómo parámetro
            // El usuario ha de mandar el token obligatoriamente y por eso podemos acceder a los claims.
            var email = HttpContext.User?.Claims?.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;

            var usuario = await _userManager.FindByEmailAsync(email);

            var roles = await _userManager.GetRolesAsync(usuario);

            return new UsuarioDto
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                UserName = usuario.UserName,
                Email = usuario.Email,
                Imagen = usuario.Imagen,
                Token = _tokenServcie.CreateToken(usuario, roles),
                Admin = roles.Contains("ADMIN") ? true : false

            };
        }

        /// <summary>
        /// Permite evaluar la existencia de un email ya registrado en la tabla de Usuarios
        /// </summary>
        /// <returns></returns>
        [HttpGet("emailValido")]
        public async Task<ActionResult<bool>> EmailValido([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user is null)
                return false;

            return true;
        }
    }
}
