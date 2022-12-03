using BussinesLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BussinesLogic.Logic
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<GenericRepository<T>> _logger;

        public GenericRepository(ApiDbContext context, ILogger<GenericRepository<T>> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Critical Log Level");


            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec)
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(GetAllWithSpecAsync)} - Critical Log Level");

            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(GetAllAsync)} - Critical Log Level");

            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetByIdWithSpecAsync(ISpecification<T> spec)
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(GetByIdWithSpecAsync)} - Critical Log Level");

            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<int> Add(T entity)
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(Add)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(Add)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(Add)} - Critical Log Level");

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            _context.Set<T>().Add(entity);

            return await _context.SaveChangesAsync();
        }


        public async Task<int> Update(T entity)
        {
            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(Update)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(Update)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(Update)} - Critical Log Level");

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

            _logger.LogWarning($"{nameof(GenericRepository<T>)} - {nameof(Delete)} - Warning Level Log");
            _logger.LogError($"{nameof(GenericRepository<T>)} - {nameof(Delete)} - Error Level Log");
            _logger.LogCritical($"{nameof(GenericRepository<T>)} - {nameof(Delete)} - Critical Log Level");

            T entity = await _context.Set<T>().FindAsync(id);

            _context.Set<T>().Remove(entity);

            return await _context.SaveChangesAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

    }
}
