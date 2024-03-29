﻿using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IUsuarioSeguirRepository
    {
        Task? Adicionar(UsuarioSeguirDTO dto);
        Task? Deletar(int usuarioSeguidoId, int usuarioLogadoId);
        Task<List<UsuarioSeguirDTO>>? GetTodosSeguidoresByUsuarioSeguidoId(int usuarioSeguidoId);
        Task<bool>? GetIsJaSigoEsseUsuario(int usuarioSeguidoId, int usuarioSeguidor);
    }
}
