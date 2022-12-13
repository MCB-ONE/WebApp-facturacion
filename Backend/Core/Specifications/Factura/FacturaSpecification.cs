using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Factura
{
    public class FacturaSpecification : BaseSpecification<Core.Entities.Factura>
    {
        public FacturaSpecification(SpecificationParams facturaParams) : base(x =>
        (
            string.IsNullOrEmpty(facturaParams.Search)
            || x.Numero.ToString().Contains(facturaParams.Search)
            || x.FechaExpedicion.ToString("MMMM dd, yyyy").Contains(facturaParams.Search)
            || x.Cliente.Nombre.Contains(facturaParams.Search)
        ))
        {
            AddInclude(factura => factura.Cliente);
            AddInclude(factura => factura.LineasFactura);

            ApplyPaging(facturaParams.PageSize * (facturaParams.PageIndex - 1), facturaParams.PageSize);

            if (!string.IsNullOrEmpty(facturaParams.Sort))
            {
                switch (facturaParams.Sort)
                {
                    case "fechaAsc":
                        AddOrderBy(empresa => empresa.FechaExpedicion);
                        break;

                    case "fechaDesc":
                        AddOrderByDescending(empresa => empresa.FechaExpedicion);
                        break;

                    case "numAsc":
                        AddOrderBy(empresa => empresa.FechaExpedicion);
                        break;

                    case "numDesc":
                        AddOrderByDescending(empresa => empresa.FechaExpedicion);
                        break;

                    default:
                        AddOrderByDescending(empresa => empresa.Id);
                        break;
                }
            }

        }

        public FacturaSpecification(int facturaId) : base(x => x.Id == facturaId)
        {
            AddInclude(factura => factura.Cliente);
            AddInclude(factura => factura.LineasFactura);
        }

        public FacturaSpecification(SpecificationParams facturaParams, int empresaId) : base(x =>
                x.EmpresaId == empresaId &&
                (
                    string.IsNullOrEmpty(facturaParams.Search)
                    || x.FechaExpedicion.ToString("MMMM dd, yyyy").Contains(facturaParams.Search)
                    || x.Cliente.Nombre.Contains(facturaParams.Search)
                ))
        {

            AddInclude(factura => factura.Cliente);
            AddInclude(factura => factura.LineasFactura);

        }
    }
}
