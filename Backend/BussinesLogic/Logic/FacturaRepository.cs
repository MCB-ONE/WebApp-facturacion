using BussinesLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Logic
{
    public class FacturaRepository : GenericRepository<Factura>, IFacturaRepository
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<FacturaRepository> _logger;


        public FacturaRepository(ApiDbContext context, ILogger<FacturaRepository> logger) : base(context, logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Factura> AddFacturaAsync(string emailUsuario, Factura factura, HashSet<LineaFactura> lineasFactura)
        {
            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(AddFacturaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(AddFacturaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(AddFacturaAsync)} - Critical Log Level");

            if (factura is null)
            {
                return null;
            }

            if (!lineasFactura.Any())
            {
                return null;
            }

            // Subtotal factura acumulado
            decimal subTotalFactura = 0;

            foreach (var item in lineasFactura)
            {
                // Calcular total linea factura
                var totalLinea = item.PrecioUnitario * item.Cantidad;

                item.Total = totalLinea;

                // Calcular total factura acumulado
                subTotalFactura = subTotalFactura + totalLinea;
            }



            factura.Subtotal = subTotalFactura;
            //Calcular número de factura
            var count = await _context.Set<Factura>().CountAsync();
            factura.Numero = count + 1;

            //Calcular iva y sumar a total factura
            decimal iva = Convert.ToDecimal(factura.Iva) / 100;

            factura.Total = (iva * factura.Subtotal) + factura.Subtotal;
            factura.LineasFactura = lineasFactura;

            _context.Set<Factura>().Add(factura);

            await _context.SaveChangesAsync();


            return factura;

        }
        public async Task<int> UpdateFacturaAsync(int id, Factura facturaUpdated)
        {
            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(UpdateFacturaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(UpdateFacturaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(UpdateFacturaAsync)} - Critical Log Level");


            if (facturaUpdated is null || facturaUpdated.LineasFactura is null)
            {
                return 0;
            };

            var dbFactura = await _context.Set<Factura>().FindAsync(id);

            facturaUpdated.Id = id;
            facturaUpdated.Numero = dbFactura.Numero;
            facturaUpdated.UpdatedAt = DateTime.Today;

            // Subtotal factura acumulado
            decimal subTotalFactura = 0;

            foreach (var item in facturaUpdated.LineasFactura)
            {
                // Calcular total linea factura
                var totalLinea = item.PrecioUnitario * item.Cantidad;
                item.Total = totalLinea;

                // Calcular total factura acumulado
                subTotalFactura = subTotalFactura + totalLinea;
            }

            facturaUpdated.Subtotal = subTotalFactura;

            //Calcular iva y sumar a total factura
            decimal iva = Convert.ToDecimal(facturaUpdated.Iva) / 100;

            facturaUpdated.Total = (iva * facturaUpdated.Subtotal) + facturaUpdated.Subtotal;

            _context.Entry(dbFactura).CurrentValues.SetValues(facturaUpdated);
            dbFactura.LineasFactura = facturaUpdated.LineasFactura;

            _context.Set<Factura>().Attach(dbFactura);
            _context.Entry(dbFactura).State = EntityState.Modified;

            return await _context.SaveChangesAsync();
        }

        public async Task<Factura> UpdateLienasFacturaAsync(int id, HashSet<LineaFactura> lineasFactura)
        {
            _logger.LogWarning($"{nameof(EmpresaRepository)} - {nameof(UpdateLienasFacturaAsync)} - Warning Level Log");
            _logger.LogError($"{nameof(EmpresaRepository)} - {nameof(UpdateLienasFacturaAsync)} - Error Level Log");
            _logger.LogCritical($"{nameof(EmpresaRepository)} - {nameof(UpdateLienasFacturaAsync)} - Critical Log Level");

            var dbFactura = await _context.Set<Factura>().FindAsync(id);

            if (lineasFactura is null || lineasFactura.Count == 0 || dbFactura is null)
            {
                return null;
            };



            // Subtotal factura acumulado
            decimal subTotalFactura = 0;

            foreach (var item in lineasFactura)
            {
                // Calcular total linea factura
                var totalLinea = item.PrecioUnitario * item.Cantidad;
                item.Total = totalLinea;

                // Calcular total factura acumulado
                subTotalFactura = subTotalFactura + totalLinea;
            }

            dbFactura.Subtotal = subTotalFactura;

            //Calcular iva y sumar a total factura
            decimal iva = Convert.ToDecimal(dbFactura.Iva) / 100;

            dbFactura.Total = (iva * dbFactura.Subtotal) + dbFactura.Subtotal;

            dbFactura.LineasFactura = lineasFactura;
            dbFactura.UpdatedAt = DateTime.Now;

            _context.Set<Factura>().Attach(dbFactura);
            _context.Entry(dbFactura).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return dbFactura;
        }

        public async Task<int> DeleteFacturaAsync(int facturaId, string emailUsuario)
        {
            var factura = await _context.Set<Factura>().FindAsync(facturaId);

            if (factura == null)
            {
                return 0;
            }

            var empresa = await _context.Set<Empresa>().FindAsync(factura.EmpresaId);

            if(empresa.EmailUsuario != emailUsuario)
            {
                return 0;
            }

            _context.Set<Empresa>().Remove(empresa);

            return await _context.SaveChangesAsync();   
        }

    }
}
