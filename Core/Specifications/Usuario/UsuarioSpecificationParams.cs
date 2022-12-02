using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Usuario
{
    /* Clase que que a partir de los parametros que llegan desde el cliente permite:
     * -> Organizar el listado de usuarios
     * -> Conocer la cantidad de elementos por página
     * -> Realizar filtrado de elementos 
     */
    public class UsuarioSpecificationParams
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Sort { get; set; }
        public int PageIndex { get; set; } = 1;

        private const int MaxPageSize = 50;

        private int _pageSize = 3;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Search { get; set; }

    }
}
