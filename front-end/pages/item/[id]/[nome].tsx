import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Auth } from '../../../utils/context/usuarioContext';
import CONSTS_ITENS from '../../../utils/data/constItens';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import iItem from '../../../utils/types/item';
import Styles from './index.module.scss';
import SessaoDireita from './sessaoDireita';
import SessaoEsquerda from './sessaoEsquerda';

export default function Item({ item }: iItem) {
    // console.log(item);
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{(item?.nome ? `${item?.nome} — ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title>
            </Head>

            <section className={`${Styles.wrapper} margem3`}>
                <div className={Styles.sessaoPrincipal}>
                    <SessaoEsquerda item={item} />
                    <SessaoDireita item={item} />
                </div>
            </section>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </Fragment>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os itens;
    const url = CONSTS_ITENS.API_URL_GET_TODOS;
    const itens = await Fetch.getApi(url, null);
    // console.log(itens);

    // Gerar o "paths";
    const paths = itens?.map((i: any) => ({
        params: {
            id: i.itemId.toString(),
            nome: ajustarUrl(i.nome)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const id = context.params.id;

    // Item;
    const url = `${CONSTS_ITENS.API_URL_GET_POR_ID}/${id}`;
    const item = await Fetch.getApi(url, null) as iItem;
    // console.log(item);

    return {
        props: {
            item
        },
        // revalidate: 10 // segundos
    }
}