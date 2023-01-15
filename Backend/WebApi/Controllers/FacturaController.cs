using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Factura;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Dtos.FacturaDtos;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using System.Text;
using WebApi.Utility;
using DinkToPdf.Contracts;
using DinkToPdf;

namespace WebApi.Controllers
{
    public class FacturaController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IFacturaRepository _repository;
        private readonly IConverter _converter;

        public FacturaController(IMapper mapper, IFacturaRepository repository, IConverter converter)
        {
            _mapper = mapper;
            _repository = repository;
            _converter = converter;
        }

        [HttpGet("empresa/{id}")]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<FacturaDto>>> GetAllFacturasByEmpresaId(int id)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var spec = new FacturaSpecification(id);

            var facturas = await _repository.GetAllWithSpecAsync(spec);

            if (facturas is null)
            {
                return NotFound();
            }

            var data = _mapper.Map<IReadOnlyList<Factura>, IReadOnlyList<FacturaDto>>(facturas);

            return Ok(data);
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FacturaDto>> GetFacturaById(int id)
        {

            var factura = await _repository.GetByIdAsync(id);

            return Ok(_mapper.Map<FacturaDto>(factura));
        }

        [HttpGet("generarPDF/{id}")]
        [Authorize]
        public async Task<IActionResult> generarPDF(int id)
        {
            bool generateFlag = true;

            var spec = new FacturaSpecification(id, generateFlag);

            var factura = await _repository.GetByIdWithSpecAsync(spec);

            var document = new PdfDocument();

            var templateGenerator = new TemplateGenerator(factura);

            var htmlContent = templateGenerator.GetHTMLString();

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 18, Bottom = 18 }
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = htmlContent,
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9 },
                FooterSettings = { FontName = "Arial", FontSize = 9 }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            string Filename = "Factura_0" + factura.Numero + ".pdf";

            return File(_converter.Convert(pdf), "application/pdf", Filename);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FacturaDto>> CreateFactura(FacturaCreateDto facturaCreate)
        {
            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var lineasFactura = _mapper.Map<HashSet<LineaFactura>>(facturaCreate.LineasFactura);

            var result = await _repository.AddFacturaAsync(emailUsuario, _mapper.Map<Factura>(facturaCreate), lineasFactura);

            if (result == null)
            {
                return BadRequest("No se ha podido crear la factura");
            };

            return Ok(_mapper.Map<FacturaDto>(result));
        }

        [HttpPut("lineas/{id}")]
        [Authorize]
        public async Task<ActionResult<FacturaDto>> UpdateLineasFactura(int id, HashSet<LineasFacturaCreateDto> lineasFacturaUpdate)
        {

            var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var lineasFactura = _mapper.Map<HashSet<LineaFactura>>(lineasFacturaUpdate);

            var result = await _repository.UpdateLienasFacturaAsync(id, lineasFactura);

            if (result == null)
            {
                throw new Exception("No se ha podido actualizar la factura");
            }

            return Ok(_mapper.Map<Factura>(result));

        }

        //[HttpPut("actualizar/{id}")]
        //[Authorize]
        //public async Task<ActionResult<List<FacturaDto>>> UpdateFactura(int id, FacturaCreateDto facturaUpdated)
        //{

        //    var emailUsuario = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

        //    var result = await _repository.UpdateFacturaAsync(id, _mapper.Map<Factura>(facturaUpdated));

        //    if (result == 0)
        //    {
        //        throw new Exception("No se ha podido actualizar la factura");
        //    }

        //    return Ok(facturaUpdated);

        //}

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
