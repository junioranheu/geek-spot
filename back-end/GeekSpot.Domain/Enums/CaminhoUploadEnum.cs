﻿using System.ComponentModel;

namespace GeekSpot.Domain.Enums
{
    public enum CaminhoUploadEnum
    {
        [Description("usuarios/perfil/imagem")]
        FotoPerfilUsuario = 1,

        [Description("usuarios/lojinha/imagem")]
        CapaLojinha = 2
    }
}
