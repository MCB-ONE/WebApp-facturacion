using Core.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BussinesLogic.Data
{
    public class ApiDbContextData
    {
        public static async Task SeedDataAsync(ApiDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Empresa.Any())
                {
                    var empresaData = File.ReadAllText("../BussinesLogic/Data/InitialData/empresa.json");
                    var empresas = JsonSerializer.Deserialize<List<Empresa>>(empresaData);
                    foreach (var empresa in empresas)
                    {
                        context.Empresa.Add(empresa);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<ApiDbContextData>();
                logger.LogError(ex.Message);


            }
        }
    }
}
