namespace WebApi.Dtos.FacturaDtos
{
    public class LineasFacturaCreateDto
    {
        public string Concepto { get; set; }
        public decimal PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
    }
}
