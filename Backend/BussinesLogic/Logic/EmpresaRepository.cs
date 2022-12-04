
using BussinesLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BussinesLogic.Logic
{
    public class EmpresaRepository : GenericRepository<Empresa>, IEmpresaRepository
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<EmpresaRepository> _logger;

        public EmpresaRepository(ApiDbContext context, ILogger<EmpresaRepository> logger) : base(context, logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<int> AddEmpresaAsync(Empresa empresa, string usuarioEmail)
        {
            if(empresa == null)
            {
                return 0;
            }

            var total = await _context.Set<Empresa>()
                                .Where(e => e.EmailUsuario == usuarioEmail)
                                .CountAsync();

            if (total == 0)
            {
                empresa.isActive = true;
            }

            empresa.EmailUsuario = usuarioEmail;

            _context.Set<Empresa>().Add(empresa);

            return await _context.SaveChangesAsync();

        }

        public async Task<int> UpdateEmpresaAsync(Empresa empresaUpdated, string usuarioEmail)
        {
            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(UpdateEmpresaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(UpdateEmpresaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(UpdateEmpresaAsync)} - Critical Log Level");


            if (empresaUpdated == null)
            {
                throw new ArgumentNullException("Entity");
            }


            var empresa = await _context.Set<Empresa>().FindAsync(empresaUpdated.Id);


            if (empresa.EmailUsuario != usuarioEmail)
            {
                throw new ArgumentNullException("No se ha podido actualizar la empresa. Credenciales incorrectas");
            }

            empresa.Nombre = empresaUpdated.Nombre;
            empresa.NIF = empresaUpdated.NIF;
            empresa.Logo = empresaUpdated.Logo;
            empresa.Calle = empresaUpdated.Calle;
            empresa.CodigoPostal = empresaUpdated.CodigoPostal;
            empresa.Ciudad = empresaUpdated.Ciudad;
            empresa.Provincia = empresaUpdated.Provincia;
            empresa.Pais = empresaUpdated.Pais;
            empresa.Telefono = empresaUpdated.Telefono;
            empresa.Email = empresaUpdated.Email;
            empresa.UpdatedAt = DateTime.Now;
            empresa.IsDeleted = false;


            _context.Set<Empresa>().Attach(empresa);
            _context.Entry(empresa).State = EntityState.Modified;

            return await _context.SaveChangesAsync();
        }



        public async Task<Empresa> ActivateEmpresaAsync(int empresaId, string usuarioEmail)
        {
            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(ActivateEmpresaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(ActivateEmpresaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(ActivateEmpresaAsync)} - Critical Log Level");


            //var empresa = await _context.Set<Empresa>().FindAsync(empresaId);

            var empresa = await _context.Set<Empresa>()
                .Include(e => e.Facturas)
                .FirstOrDefaultAsync(e => e.Id == empresaId);

            if(empresa is null)
            {
                return null;
            }

            var oldActiveEmpresa = await _context.Set<Empresa>()
                .Where(e => e.isActive == true)
                .FirstOrDefaultAsync();


            if (empresa.EmailUsuario != usuarioEmail)
            {
                throw new ArgumentNullException("No se ha podido actualizar la empresa. Email de usuario logeado y email empresa a actualizarno coinciden");
            }


            empresa.isActive = true;
            empresa.UpdatedAt = DateTime.Now;
            empresa.IsDeleted = false;

            if (oldActiveEmpresa is not null)
            {
                oldActiveEmpresa.isActive = false;
            }

            var result = await _context.SaveChangesAsync();

            if (result == 0)
            {
                return null;
            }

            return empresa;
        }


        public async Task<int> DeleteEmpresaAsync(int id, string usuarioEmail)
        {

            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(DeleteEmpresaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(DeleteEmpresaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(DeleteEmpresaAsync)} - Critical Log Level");

            Empresa empresa = await _context.Set<Empresa>().FindAsync(id);

            if (empresa == null || empresa.EmailUsuario != usuarioEmail)
            {
                return 0;
            }

            _context.Set<Empresa>().Remove(empresa);

            if (empresa.isActive)
            {
                var newActiveEmpresa = await _context.Set<Empresa>().Where(e => e.EmailUsuario == usuarioEmail).FirstOrDefaultAsync();

                if (newActiveEmpresa != null)
                {
                    newActiveEmpresa.isActive = true;
                }
            }


            return await _context.SaveChangesAsync();
        }

    }
}
