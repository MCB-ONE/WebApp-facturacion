namespace WebApi.Dtos.FacturaDtos
{
    public class FacturaCreateDto
    {
        public DateTimeOffset FechaExpedicion { get; set; }
        public int Iva { get; set; }
        public int EmpresaId { get; set; }
        public ClienteCreateDto Cliente { get; set; }
        public HashSet<LineasFacturaCreateDto> LineasFactura { get; set; }
    }
}
