﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GeekSpot.Domain.Entities
{
    public class UsuarioSeguir
    {
        [Key]
        public int Id { get; set; }

        /////////////////////////////////////////////////////////
        // Como fazer duas FKs da mesma classe se relacionarem //
        // https://stackoverflow.com/a/57470931                //
        /////////////////////////////////////////////////////////

        // Fk (De lá pra cá);
        [ForeignKey(nameof(UsuariosSeguidos))]
        public int UsuarioSeguidoId { get; set; } // Usuário que é seguido;
        public Usuario? UsuariosSeguidos { get; set; }

        // Fk (De lá pra cá);
        [ForeignKey(nameof(UsuariosSeguidores))]
        public int UsuarioSeguidorId { get; set; } // Usuário que segue o "UsuarioSeguidoId"; 
        public Usuario? UsuariosSeguidores { get; set; }

        public int IsAtivo { get; set; } = 1;
        public DateTime? DataRegistro { get; set; }
    }
}