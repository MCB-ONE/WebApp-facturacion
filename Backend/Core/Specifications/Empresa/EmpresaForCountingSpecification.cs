namespace Core.Specifications.Empresa
{
    public class EmpresaForCountingSpecification : BaseSpecification<Core.Entities.Empresa>
    {

        public EmpresaForCountingSpecification(SpecificationParams empresaParams, string emailUsuario)
        : base(x =>
               x.EmailUsuario == emailUsuario &&
            (
                string.IsNullOrEmpty(empresaParams.Search)
                || x.Nombre.Contains(empresaParams.Search)
                || x.NIF.Contains(empresaParams.Search)
            ))
        {

        }
    }
}
