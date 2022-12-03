using AutoMapper;
using Core.Entities;

namespace WebApi.Dtos.FacturaDtos
{
    public class FacturaMappingProfile : Profile
    {
        public FacturaMappingProfile()
        {
            CreateMap<Factura, FacturaDto>().ReverseMap();
            CreateMap<Cliente, ClienteDto>().ReverseMap();

        }
    }
}
