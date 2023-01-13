using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        // Representa la condición lógica a aplicar a una entidad
        Expression<Func<T, bool>> Criteria { get; }

        // Representa las relaciones que se pueden implementar sobre una entidad
        List<Expression<Func<T, object>>> Includes { get; }

    }
}
