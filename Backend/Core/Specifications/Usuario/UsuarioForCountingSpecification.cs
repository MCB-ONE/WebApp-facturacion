using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Usuario
{
    public class UsuarioForCountingSpecification : BaseSpecification<Core.Entities.Usuario>
    {
        public UsuarioForCountingSpecification(UsuarioSpecificationParams usuarioParams) : base(x =>
             (string.IsNullOrEmpty(usuarioParams.Search) || x.Nombre.Contains(usuarioParams.Search)) &&
             (string.IsNullOrEmpty(usuarioParams.Nombre) || x.Nombre.Contains(usuarioParams.Nombre)) &&
             (string.IsNullOrEmpty(usuarioParams.Apellido) || x.Nombre.Contains(usuarioParams.Apellido)) &&
             (string.IsNullOrEmpty(usuarioParams.Email) || x.Nombre.Contains(usuarioParams.Email))
        )
        {
        }
    }
}
