using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Usuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.DTOs;
using WebApi.DTOs.Usuario;
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
    }
}
