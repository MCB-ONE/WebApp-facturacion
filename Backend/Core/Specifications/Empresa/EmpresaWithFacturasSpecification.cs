
namespace Core.Specifications.Empresa
{


    public class EmpresaWithFacturasSpecification : BaseSpecification<Core.Entities.Empresa>
    {

        // Especificación para devolver las empresas de un usuario concreto
        public EmpresaWithFacturasSpecification(string usuarioEmail, SpecificationParams empresaParams)
: base(x =>
        x.EmailUsuario == usuarioEmail &&
    (
        string.IsNullOrEmpty(empresaParams.Search)
        || x.Nombre.Contains(empresaParams.Search)
        || x.NIF.Contains(empresaParams.Search)
    ))
        {
            AddInclude(empresa => empresa.Facturas);

            ApplyPaging(empresaParams.PageSize * (empresaParams.PageIndex - 1), empresaParams.PageSize);


            if (!string.IsNullOrEmpty(empresaParams.Sort))
            {
                switch (empresaParams.Sort)
                {
                    case "nombreAsc":
                        AddOrderBy(empresa => empresa.Nombre);
                        break;

                    case "nombreDesc":
                        AddOrderByDescending(empresa => empresa.Nombre);
                        break;

                    case "nifAsc":
                        AddOrderBy(empresa => empresa.NIF);
                        break;

                    case "nifDesc":
                        AddOrderByDescending(empresa => empresa.NIF);
                        break;

                    case "idAsc":
                        AddOrderBy(empresa => empresa.Id);
                        break;

                    case "idDesc":
                        AddOrderByDescending(empresa => empresa.Id);
                        break;

                    default:
                        AddOrderByDescending(empresa => empresa.Id);
                        break;
                }
            }
        }

        // Especificación para devolver todas las empresas (ADMIN)
        public EmpresaWithFacturasSpecification(SpecificationParams empresaParams)
        : base(x =>
            (
                string.IsNullOrEmpty(empresaParams.Search)
                || x.Nombre.Contains(empresaParams.Search)
                || x.NIF.Contains(empresaParams.Search)
            ))
        {
            AddInclude(empresa => empresa.Facturas);

            ApplyPaging(empresaParams.PageSize * (empresaParams.PageIndex - 1), empresaParams.PageSize);


            if (!string.IsNullOrEmpty(empresaParams.Sort))
            {
                switch (empresaParams.Sort)
                {
                    case "nombreAsc":
                        AddOrderBy(empresa => empresa.Nombre);
                        break;

                    case "nombreDesc":
                        AddOrderByDescending(empresa => empresa.Nombre);
                        break;

                    case "nifAsc":
                        AddOrderBy(empresa => empresa.NIF);
                        break;

                    case "nifDesc":
                        AddOrderByDescending(empresa => empresa.NIF);
                        break;

                    case "idAsc":
                        AddOrderBy(empresa => empresa.Id);
                        break;

                    case "idDesc":
                        AddOrderByDescending(empresa => empresa.Id);
                        break;

                    default:
                        AddOrderByDescending(empresa => empresa.Id);
                        break;
                }
            }
        }

        public EmpresaWithFacturasSpecification(bool isActive, string usuarioEmail) : base(x => x.isActive == true && x.EmailUsuario == usuarioEmail)
        {
            AddInclude(empresa => empresa.Facturas);
        }

        // Especificación para devolver una empresa de un usuario NO ADMIN
        public EmpresaWithFacturasSpecification(int id, string usuarioEmail) : base(x => x.Id == id && x.EmailUsuario == usuarioEmail)
        {
            AddInclude(empresa => empresa.Facturas);
        }

        // Especificación para devolver una empresa cualquiera si es ADMIN
        public EmpresaWithFacturasSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(empresa => empresa.Facturas);
        }
    }
}
