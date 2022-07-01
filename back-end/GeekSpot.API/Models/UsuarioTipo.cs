﻿using System.ComponentModel.DataAnnotations;

namespace GeekSpot.API.Models
{
    public class UsuarioTipo
    {
        [Key]
        public int UsuarioTipoId { get; set; }
        public string? Tipo { get; set; }
        public string? Descricao { get; set; }
        public int IsAtivo { get; set; }
        public DateTime DataRegistro { get; set; }
    }
}
