
namespace Core.Specifications.Empresa
{


    public class EmpresaWithFacturasSpecification : BaseSpecification<Core.Entities.Empresa>
    {

        // Especificación para devolver las empresas de un usuario concreto
        public EmpresaWithFacturasSpecification(string usuarioEmail): base(x => x.EmailUsuario == usuarioEmail )
        {
            AddInclude(empresa => empresa.Facturas);

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
