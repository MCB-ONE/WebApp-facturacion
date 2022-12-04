using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Factura
{
    public class FacturaForCountingSpecification : BaseSpecification<Core.Entities.Factura>
    {
        public FacturaForCountingSpecification(SpecificationParams facturaParams, int empresaId) : base(x =>
                x.EmpresaId == empresaId &&
                (
                    string.IsNullOrEmpty(facturaParams.Search)
                    || x.FechaExpedicion.ToString("MMMM dd, yyyy").Contains(facturaParams.Search)
                    || x.Cliente.Nombre.Contains(facturaParams.Search)
                ))
        {

        }
    }
}
