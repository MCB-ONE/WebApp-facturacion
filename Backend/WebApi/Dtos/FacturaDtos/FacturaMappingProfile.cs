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
            CreateMap<Factura, FacturaCreateDto>().ReverseMap();
            CreateMap<Cliente, ClienteCreateDto>().ReverseMap();
            CreateMap<LineaFactura, LineasFacturaCreateDto>().ReverseMap();

        }
    }
}
