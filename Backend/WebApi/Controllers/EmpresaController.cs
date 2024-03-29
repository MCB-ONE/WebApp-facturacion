﻿using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Empresa;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Dtos;
using WebApi.Dtos.EmpresaDtos;

namespace WebApi.Controllers
{
    public class EmpresaController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IEmpresaRepository _repository;

        public EmpresaController(IMapper mapper, IEmpresaRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<EmpresaDto>>> GetAllEmpresasByUsuarioEmail([FromQuery] SpecificationParams empresaParams)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var spec = new EmpresaWithFacturasSpecification(emailUsuario, empresaParams);

            var empresas = await _repository.GetAllWithSpecAsync(spec);

            var specCount = new EmpresaForCountingSpecification(empresaParams, emailUsuario);

            var totalEmpresas = await _repository.CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(totalEmpresas / empresaParams.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            var data = _mapper.Map<IReadOnlyList<Empresa>, IReadOnlyList<EmpresaDto>>(empresas);

            return Ok(new Pagination<EmpresaDto>
            {
                Count = totalEmpresas,
                PageCount = totalPages,
                Data = data,
                PageIndex = empresaParams.PageIndex,
                PageSize = empresaParams.PageSize
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<EmpresaDto>> GetEmpresaByIdAndUsuarioEmail(int id)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var spec = new EmpresaWithFacturasSpecification(id, emailUsuario);

            var empresa = await _repository.GetByIdWithSpecAsync(spec);

            return Ok(_mapper.Map<EmpresaDto>(empresa));
        }

        [HttpGet("activa")]
        [Authorize]
        public async Task<ActionResult<EmpresaDto>> GetUsuarioActiveEmpresa()
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var spec = new EmpresaWithFacturasSpecification(true, emailUsuario);

            var empresa = await _repository.GetByIdWithSpecAsync(spec);

            return Ok(_mapper.Map<EmpresaDto>(empresa));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<EmpresaDto>> CreateEmpresa(CreateEmpresaDto dto)
        {
            var usuarioEmail = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var result = await _repository.AddEmpresaAsync(_mapper.Map<Empresa>(dto), usuarioEmail);

            if (result == 0)
            {
                throw new Exception("No se ha podido crear su nueva empresa");
            }

            return Ok(dto);
        }



        [HttpPut("actualizar/{id}")]
        [Authorize]
        public async Task<ActionResult<EmpresaDto>> UpdateEmpresa(int id, UpdateEmpresaDto empresaUpdated)
        {

            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;


            if (empresaUpdated.Id != id)
            {
                return BadRequest("No se ha podido actualizar la empresa. Los Ids de la petición no coinciden");
            }

            var result = await _repository.UpdateEmpresaAsync(_mapper.Map<Empresa>(empresaUpdated), emailUsuario);


            if (result == 0)
            {
                throw new Exception("No se ha podido actualizar la empresa");
            }

            return Ok(empresaUpdated);

        }


        [HttpPut("activar/{id}")]
        [Authorize]
        public async Task<ActionResult<EmpresaDto>> ActivarEmpresa(int id)
        {

            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;


            var result = await _repository.ActivateEmpresaAsync(id, emailUsuario);


            if (result is null)
            {
                throw new Exception("No se ha podido activar la empresa");
            }

            return Ok(_mapper.Map<EmpresaDto>(result));

        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEmpresa(int id)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var result = await _repository.DeleteEmpresaAsync(id, emailUsuario);

            if (result == 0)
            {
                return BadRequest("No se ha podido borrar la empresa.");
            }

            return Ok();

        }

    }
}
