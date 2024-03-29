﻿using AutoMapper;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;

namespace GeekSpot.Infrastructure.AutoMapper
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            // Outros; 
            CreateMap<RefreshToken, RefreshTokenDTO>().ReverseMap();
            CreateMap<AjudaTopico, AjudaTopicoDTO>().ReverseMap();
            CreateMap<AjudaItem, AjudaItemDTO>().ReverseMap();

            // Usuário e afins;
            CreateMap<UsuarioTipo, UsuarioTipoDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
            CreateMap<Usuario, UsuarioSenhaDTO>().ReverseMap();
            CreateMap<UsuarioInformacao, UsuarioInformacaoDTO>().ReverseMap();
            CreateMap<UsuarioSenhaDTO, UsuarioDTO>().ReverseMap();
            CreateMap<UsuarioSeguirDTO, UsuarioSeguir>().ReverseMap();

            // Logradouro;
            CreateMap<Estado, EstadoDTO>().ReverseMap();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            // Item;
            CreateMap<ItemTipo, ItemTipoDTO>().ReverseMap();
            CreateMap<Item, ItemDTO>().ReverseMap();
            CreateMap<ItemImagem, ItemImagemDTO>().ReverseMap();

            // Comentário;
            CreateMap<Comentario, ComentarioDTO>().ReverseMap();
        }
    }
}
