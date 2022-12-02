
namespace Core.Specifications.Usuario
{
    public class UsuarioSpecification : BaseSpecification<Core.Entities.Usuario>
    {
        public UsuarioSpecification(UsuarioSpecificationParams usuarioParams)
        : base(x =>
            (string.IsNullOrEmpty(usuarioParams.Search) || x.Nombre.Contains(usuarioParams.Search)) &&
            (string.IsNullOrEmpty(usuarioParams.Nombre) || x.Nombre.Contains(usuarioParams.Nombre)) &&
            (string.IsNullOrEmpty(usuarioParams.Apellido) || x.Nombre.Contains(usuarioParams.Apellido)) &&
            (string.IsNullOrEmpty(usuarioParams.Email) || x.Nombre.Contains(usuarioParams.Email))
        )
        {
            ApplyPaging(usuarioParams.PageSize * (usuarioParams.PageIndex - 1), usuarioParams.PageSize);

            if (!string.IsNullOrEmpty(usuarioParams.Sort))
            {
                switch (usuarioParams.Sort)
                {
                    case "nombreAsc":
                        AddOrderBy(usuarios => usuarios.Nombre);
                        break;
                    case "nombreDesc":
                        AddOrderByDescending(usuarios => usuarios.Nombre);
                        break;
                    case "emailAsc":
                        AddOrderBy(usuarios => usuarios.Email);
                        break;
                    case "emailDesc":
                        AddOrderByDescending(usuarios => usuarios.Email);
                        break;
                    default:
                        AddOrderBy(usuarios => usuarios.Nombre);
                        break;
                }

            }

        }
    }
}
