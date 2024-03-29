﻿using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Factura;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Dtos;
using WebApi.Dtos.FacturaDtos;

namespace WebApi.Controllers
{
    public class FacturaController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IFacturaRepository _repository;

        public FacturaController(IMapper mapper, IFacturaRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }


        [HttpGet("empresa/{id}")]
        [Authorize]
        public async Task<ActionResult<Pagination<FacturaDto>>> GetAllFacturasByEmpresaId(int id, [FromQuery] SpecificationParams facturaParams)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var spec = new FacturaSpecification(facturaParams, id);

            var facturas = await _repository.GetAllWithSpecAsync(spec);

            if (facturas is null)
            {
                return NotFound();
            }

            var specCount = new FacturaForCountingSpecification(facturaParams, id);

            var totalFacuras = await _repository.CountAsync(specCount);


            var rounded = Math.Ceiling(Convert.ToDecimal(totalFacuras / facturaParams.PageSize));
            var totalPages = Convert.ToInt32(rounded);
            var data = _mapper.Map<IReadOnlyList<Factura>, IReadOnlyList<FacturaDto>>(facturas);

            return Ok(new Pagination<FacturaDto>
            {
                Count = totalFacuras,
                PageCount = totalPages,
                Data = data,
                PageIndex = facturaParams.PageIndex,
                PageSize = facturaParams.PageSize
            });
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FacturaDto>> GetFacturaById(int id)
        {

            var spec = new FacturaSpecification(id);

            var factura = await _repository.GetByIdWithSpecAsync(spec);

            return Ok(_mapper.Map<FacturaDto>(factura));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FacturaDto>> CreateFactura(FacturaCreateDto facturaCreate)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var lineasFactura = _mapper.Map<HashSet<LineaFactura>>(facturaCreate.LineasFactura);

            var result = await _repository.AddFacturaAsync(emailUsuario, _mapper.Map<Factura>(facturaCreate), lineasFactura);

            if (result == 0)
            {
                return BadRequest("No se ha podido crear la factura");
            };

            return Ok(facturaCreate);
        }

        [HttpPut("actualizar/{id}")]
        [Authorize]
        public async Task<ActionResult<List<FacturaDto>>> UpdateFactura(int id, FacturaCreateDto facturaUpdated)
        {

            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var result = await _repository.UpdateFacturaAsync(id, _mapper.Map<Factura>(facturaUpdated));

            if (result == 0)
            {
                throw new Exception("No se ha podido actualizar la factura");
            }

            return Ok(facturaUpdated);

        }

        [HttpDelete("eliminar/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFactura(int id)
        {
            var result = await _repository.Delete(id);

            if (result == 0)
            {
                throw new Exception("No se ha podido borrar la factura");
            }

            return Ok();

        }
    }
}
