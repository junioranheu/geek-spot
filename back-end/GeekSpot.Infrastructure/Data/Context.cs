﻿using GeekSpot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infrastructure.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
       
        }

        // Outros;
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<AjudaTopico> AjudasTopicos { get; set; }
        public DbSet<AjudaItem> AjudasItens { get; set; }

        // Cidades e estados;
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Cidade> Cidades { get; set; }

        // Usuários e afins;
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<UsuarioTipo> UsuariosTipos { get; set; }
        public DbSet<UsuarioInformacao> UsuariosInformacoes { get; set; }
        public DbSet<UsuarioSeguir> UsuariosSeguir { get; set; }

        // Itens;
        public DbSet<ItemTipo> ItensTipos { get; set; }
        public DbSet<Item> Itens { get; set; }
        public DbSet<ItemImagem> ItensImagens { get; set; }

        // Comentários;
        public DbSet<Comentario> Comentarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
