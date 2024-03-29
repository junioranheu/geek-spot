import Router from 'next/router';
import { useEffect, useState } from 'react';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import gerarFraseAleatoria from '../../utils/outros/gerarFraseAleatoria';
import Seta from '../svg/seta.um';
import Styles from './modulo.principal.module.scss';

interface iParametros {
    i: number;
    usuarioId: number;
    usuarioNomeSistema: string;
    titulo: string | null;
    descricao: string | null;
    textoTagTitle: string;
}

export default function ModuloHeader({ i, usuarioId, usuarioNomeSistema, titulo, descricao, textoTagTitle }: iParametros) {

    const [fraseAleatoria, setFraseAleatoria] = useState<string>('');
    useEffect(() => {
        setFraseAleatoria(gerarFraseAleatoria());
    }, [i]);

    return (
        <div className={`${Styles.divHeader} flexRow`}>
            <div className='flexColumn'>
                <b className='titulo cor-principal-hover pointer' onClick={() => Router.push(`/usuario/perfil/${usuarioId}/@${ajustarUrl(usuarioNomeSistema)}`)}>
                    {titulo ?? `Itens do usuário @${usuarioNomeSistema}`}
                </b>

                <span className='texto'>{descricao}</span>
            </div>

            <div className={`${Styles.infoDireita} cor-principal-hover`} onClick={() => Router.push(`/usuario/perfil/${usuarioId}/@${ajustarUrl(usuarioNomeSistema)}`)} title={textoTagTitle}>
                {fraseAleatoria}
                <Seta width='1rem' />
            </div>
        </div>
    )
}