using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Factura
{
    public class FacturaSpecification : BaseSpecification<Core.Entities.Factura>
    {
        public FacturaSpecification(int empresaId) : base(x => x.EmpresaId == empresaId)      
        {

            AddInclude(factura => factura.Cliente);
            AddInclude(factura => factura.LineasFactura);

        }

        public FacturaSpecification(int facturaId, bool generateFlag) : base(x => x.Id == facturaId)
        {
            AddInclude(factura => factura.Empresa);
            AddInclude(factura => factura.Cliente);
            AddInclude(factura => factura.LineasFactura);
        }
    }
}
