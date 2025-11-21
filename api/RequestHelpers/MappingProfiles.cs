using System;
using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();

    }
}
