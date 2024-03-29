﻿using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infrastructure.Persistence
{
    public class UsuarioSeguirRepository : IUsuarioSeguirRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public UsuarioSeguirRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task? Adicionar(UsuarioSeguirDTO dto)
        {
            UsuarioSeguir item = _map.Map<UsuarioSeguir>(dto);

            await _context.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task? Deletar(int usuarioSeguidoId, int usuarioLogadoId)
        {
            var dados = await _context.UsuariosSeguir.FirstOrDefaultAsync(us => us.UsuarioSeguidoId == usuarioSeguidoId && us.UsuarioSeguidorId == usuarioLogadoId);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + usuarioSeguidoId + " não foi encontrado");
            }

            _context.UsuariosSeguir.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UsuarioSeguirDTO>>? GetTodosSeguidoresByUsuarioSeguidoId(int usuarioSeguidoId)
        {
            var itens = await _context.UsuariosSeguir.
                        Include(us => us.UsuariosSeguidos).
                        Include(us => us.UsuariosSeguidores).
                        Where(us => us.UsuarioSeguidoId == usuarioSeguidoId && us.IsAtivo == true).AsNoTracking().ToListAsync();

            List<UsuarioSeguirDTO> dto = _map.Map<List<UsuarioSeguirDTO>>(itens);
            return dto;
        }

        public async Task<bool>? GetIsJaSigoEsseUsuario(int usuarioSeguidoId, int usuarioSeguidor)
        {
            var isJaSigo = await _context.UsuariosSeguir.AnyAsync(us => us.UsuarioSeguidoId == usuarioSeguidoId && us.UsuarioSeguidorId == usuarioSeguidor);
            return isJaSigo;
        }
    }
}
