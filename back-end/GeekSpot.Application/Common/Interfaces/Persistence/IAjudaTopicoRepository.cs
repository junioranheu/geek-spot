﻿using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IAjudaTopicoRepository
    {
        Task? Adicionar(AjudaTopicoDTO dto);
        Task? Atualizar(AjudaTopicoDTO dto);
        Task? Deletar(int id);
        Task<List<AjudaTopicoDTO>>? GetTodos();
        Task<AjudaTopicoDTO>? GetById(int id);    
    }
}
