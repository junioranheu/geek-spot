﻿using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infrastructure.Persistence
{
    public class ItemRepository : IItemRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public ItemRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task? Adicionar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            await _context.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task? Atualizar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            // Pegar os dados "originais" do item em questão;
            ItemDTO dadosOriginaisDTO = await GetById(dto.ItemId);
            Item dadosOriginais = _map.Map<Item>(dadosOriginaisDTO);

            dadosOriginais.Nome = item.Nome ?? dadosOriginais.Nome;
            dadosOriginais.Descricao = item.Descricao ?? dadosOriginais.Descricao;
            dadosOriginais.Tamanho = item.Tamanho ?? dadosOriginais.Tamanho;
            dadosOriginais.Marca = item.Marca ?? dadosOriginais.Marca;
            dadosOriginais.Condicao = item.Condicao ?? dadosOriginais.Condicao;
            dadosOriginais.Preco = item.Preco > 0 ? item.Preco : dadosOriginais.Preco;
            dadosOriginais.PrecoDesconto = !String.IsNullOrEmpty(item.ItemTipoId.ToString()) ? item.PrecoDesconto : dadosOriginais.PrecoDesconto;
            dadosOriginais.ItemTipoId = !String.IsNullOrEmpty(item.ItemTipoId.ToString()) ? item.ItemTipoId : dadosOriginais.ItemTipoId;

            _context.Update(dadosOriginais);
            await _context.SaveChangesAsync();
        }

        public async Task? Deletar(int id)
        {
            var dados = await _context.Itens.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Itens.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ItemDTO>>? GetTodos()
        {
            var todos = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == true).
                        OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(todos);
            return dto;
        }

        public async Task<ItemDTO>? GetById(int id)
        {
            var byId = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.ItemId == id && i.IsAtivo == true).AsNoTracking().FirstOrDefaultAsync();

            ItemDTO dto = _map.Map<ItemDTO>(byId);
            return dto;
        }

        public async Task<List<ItemDTO>>? GetByItemTipoId(int itemTipoId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(it => it.ItemTipoId == itemTipoId && it.IsAtivo == true).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }

        public async Task<List<ItemDTO>>? GetByUsuarioId(int usuarioId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(it => it.UsuarioId == usuarioId && it.IsAtivo == true).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }

        public async Task<List<List<ItemDTO>>>? GetListaItensGroupByUsuario()
        {
            // #1 - Buscar todos os usuários ativos;
            var todosUsuarios = await _context.Usuarios.
                                Where(i => i.IsAtivo == true && i.IsVerificado == true && i.IsVerificado == true).
                                OrderBy(ui => ui.UsuarioId).
                                AsNoTracking().
                                Select(u => u.UsuarioId).
                                ToListAsync();

            if (todosUsuarios is null)
            {
                return null;
            }

            // #2 - Com base nos usuários encontrados, encontre, agora, seus itens;
            List<List<Item>> listaItens = new();
            foreach (var usuarioId in todosUsuarios)
            {
                var item = await _context.Itens.
                           Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                           Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                           Include(it => it.ItensTipos).
                           Include(ii => ii.ItensImagens).
                           Where(ui => ui.UsuarioId == usuarioId && ui.IsAtivo == true).AsNoTracking().ToListAsync();

                if (item?.Count > 0)
                {
                    listaItens.Add(item);
                }
            }

            if (listaItens is null || listaItens?.Count == 0)
            {
                return null;
            }

            List<List<ItemDTO>> dto = _map.Map<List<List<ItemDTO>>>(listaItens);
            return dto;
        }

        public async Task<dynamic>? GetListaItensGroupByItemTipo()
        {
            var itensAgrupados = await _context.Itens.
                                 Include(it => it.ItensTipos).
                                 Where(i => i.IsAtivo == true).
                                 GroupBy(it => it.ItemTipoId).
                                 Select(x => new { xItemTipoId = x.Key, xItemTipo = x.FirstOrDefault().ItensTipos.Tipo, xQuantidade = x.Count() }).
                                 AsNoTracking().ToListAsync();

            if (itensAgrupados is null)
            {
                return null;
            }

            return itensAgrupados;
        }
    }
}
