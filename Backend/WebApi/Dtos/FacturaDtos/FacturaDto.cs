using Core.Entities;
using WebApi.Dtos.EmpresaDtos;

namespace WebApi.Dtos.FacturaDtos
{
    public class FacturaDto
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public DateTimeOffset FechaExpedicion { get; set; }
        public decimal Subtotal { get; set; }
        public int Iva { get; set; }
        public decimal Total { get; set; }
        public ClienteDto Cliente { get; set; }
        public int EmpresaId { get; set; }
        public EmpresaDto Empresa { get; set; }
        public HashSet<LineaFactura> LineasFactura { get; set; }

    }
}
