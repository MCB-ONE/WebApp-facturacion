using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IEmpresaRepository : IGenericRepository<Empresa>
    {
        Task<int> AddEmpresaAsync(Empresa empresa, string usuarioEmail);
        Task<int> UpdateEmpresaAsync(Empresa empresaUpdated, string usuarioEmail);
        Task<Empresa> ActivateEmpresaAsync(int empresaId, string usuarioEmail);
        Task<int> DeleteEmpresaAsync(int id, string usuarioEmail);

    }
}
