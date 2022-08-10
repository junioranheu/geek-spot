﻿using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }

        public string? Nome { get; set; } = null;
        public string? Descricao { get; set; } = null;
        public string? Imagem { get; set; } = null;
        public double? Preco { get; set; } = 0;
        public double? PrecoDesconto { get; set; } = 0;

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }
        public Usuario? Usuarios { get; set; }

        // Fk (De lá pra cá);
        public int ItemTipoId { get; set; }
        public ItemTipo? ItensTipos { get; set; }

        public int IsAtivo { get; set; } = 1;
        public DateTime? DataRegistro { get; set; } = HorarioBrasilia();
    }
}