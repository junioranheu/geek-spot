﻿using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IItemTipoRepository
    {
        Task? Adicionar(ItemTipoDTO dto);
        Task? Atualizar(ItemTipoDTO dto);
        Task? Deletar(int id);
        Task<List<ItemTipoDTO>>? GetTodos();
        Task<ItemTipoDTO>? GetById(int id);    
    }
}
