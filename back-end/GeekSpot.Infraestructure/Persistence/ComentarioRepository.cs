﻿using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Infraestructure.Persistence
{
    public class ComentarioRepository : IComentarioRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public ComentarioRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task Adicionar(ComentarioDTO dto)
        {
            Comentario comentario = _map.Map<Comentario>(dto);

            _context.Add(comentario);
            await _context.SaveChangesAsync();
        }

        public async Task Atualizar(ComentarioDTO dto)
        {
            Comentario comentario = _map.Map<Comentario>(dto);

            _context.Update(comentario);
            await _context.SaveChangesAsync();
        }

        public async Task Deletar(int id)
        {
            var dados = await _context.Comentarios.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Comentarios.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ComentarioDTO>> GetTodos()
        {
            var todos = await _context.Comentarios.
                        Include(i => i.Itens).ThenInclude(u => u.Usuarios).
                        Include(u => u.Usuarios).
                        Where(i => i.IsAtivo == 1).
                        OrderBy(d => d.DataMensagem).AsNoTracking().ToListAsync();

            List<ComentarioDTO> dto = _map.Map<List<ComentarioDTO>>(todos);
            return dto;
        }

        public async Task<ComentarioDTO> GetPorId(int id)
        {
            var porId = await _context.Comentarios.
                        Include(i => i.Itens).ThenInclude(u => u.Usuarios).
                        Include(u => u.Usuarios).
                        Where(i => i.IsAtivo == 1 && i.ComentarioId == id).
                        OrderBy(d => d.DataMensagem).AsNoTracking().FirstOrDefaultAsync();

            ComentarioDTO dto = _map.Map<ComentarioDTO>(porId);
            return dto;
        }

        public async Task<List<ComentarioDTO>> GetPorItemId(int itemId)
        {
            var itens = await _context.Comentarios.
                        Include(i => i.Itens).ThenInclude(u => u.Usuarios).
                        Include(u => u.Usuarios).
                        Where(i => i.ItemId == itemId && i.IsAtivo == 1).
                        OrderBy(d => d.DataMensagem).AsNoTracking().ToListAsync();

            List<ComentarioDTO> dto = _map.Map<List<ComentarioDTO>>(itens);
            return dto;
        }

        public async Task ResponderComentario(ComentarioDTO dto)
        {
            Comentario comentario = _map.Map<Comentario>(dto);

            var comentarioBd = await _context.Comentarios.FindAsync(comentario.ComentarioId);

            if (comentarioBd is null)
            {
                throw new Exception("Registro com o id " + comentario.ComentarioId + " não foi encontrado");
            }

            comentarioBd.Resposta = comentario.Resposta;
            comentarioBd.DataResposta = HorarioBrasilia();

            _context.Update(comentarioBd);
            await _context.SaveChangesAsync();
        }
    }
}
