﻿using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IItemRepository
    {
        Task? Adicionar(ItemDTO dto);
        Task? Atualizar(ItemDTO dto);
        Task? Deletar(int id);
        Task<List<ItemDTO>>? GetTodos();
        Task<ItemDTO>? GetById(int id);
        Task<List<ItemDTO>>? GetByItemTipoId(int itemTipoId);
        Task<List<ItemDTO>>? GetByUsuarioId(int usuarioId);
        Task<List<List<ItemDTO>>>? GetListaItensGroupByUsuario();
        Task<dynamic>? GetListaItensGroupByItemTipo();
    }
}
