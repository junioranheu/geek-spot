﻿using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class ItemImagem
    {
        [Key]
        public int ItemImagemId { get; set; }

        public string? CaminhoImagem { get; set; } = null;

        // Fk (De lá pra cá);
        public int ItemId { get; set; }

        public bool IsFotoPrincipal { get; set; } = false;
        public bool IsAtivo { get; set; } = true;
        public DateTime? DataRegistro { get; set; } = HorarioBrasilia();
    }
}
