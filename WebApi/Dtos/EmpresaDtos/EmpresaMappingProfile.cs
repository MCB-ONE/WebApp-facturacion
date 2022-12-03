using AutoMapper;
using Core.Entities;

namespace WebApi.Dtos.EmpresaDtos
{
    public class EmpresaMappingProfile : Profile
    {
        public EmpresaMappingProfile()
        {
            CreateMap<Empresa, EmpresaDto>().ReverseMap();

            CreateMap<CreateEmpresaDto, Empresa>();

            CreateMap<UpdateEmpresaDto, Empresa>();

        }
    }
}
