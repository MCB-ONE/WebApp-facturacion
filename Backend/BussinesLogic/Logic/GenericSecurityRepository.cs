using BussinesLogic.Data;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BussinesLogic.Logic
{
    public class GenericSecurityRepository<T> : IGenericSecurityRepository<T> where T : IdentityUser
    {

        private readonly SecurityDbContext _context;
        private readonly ILogger<GenericSecurityRepository<T>> _logger;

        public GenericSecurityRepository(SecurityDbContext context, ILogger<GenericSecurityRepository<T>> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            // Configurar loggings
            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Critical Log Level");

            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            // Configurar loggings
            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllAsync)} - Critical Log Level");

            return await _context.Set<T>().FindAsync(id);

        }

        public async Task<T> GetByIdWithSpecAsync(ISpecification<T> spec)
        {
            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Critical Log Level");
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec)
        {

            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Critical Log Level");

            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<int> Add(T entity)
        {
            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(Add)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(Add)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(Add)} - Critical Log Level");

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Set<T>().Add(entity);
            return await _context.SaveChangesAsync();

        }

        public async Task<int> Update(T entity)
        {

            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(Update)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(Update)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(Update)} - Critical Log Level");

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            _logger.LogWarning($"{nameof(GenericSecurityRepository<T>)} - {nameof(Delete)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericSecurityRepository<T>)} - {nameof(Delete)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericSecurityRepository<T>)} - {nameof(Delete)} - Critical Log Level");

            T entity = await _context.Set<T>().FindAsync(id);

            _context.Set<T>().Remove(entity);

            return await _context.SaveChangesAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SecuirtySpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }
    }
}
