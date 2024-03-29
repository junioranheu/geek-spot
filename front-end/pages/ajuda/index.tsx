import Image from 'next/image';
import { useEffect, useState } from 'react';
import EmojiMedicacao from '../../static/image/outros/emoji-meditacao.webp';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_AJUDAS_TOPICOS from '../../utils/consts/data/constAjudasTopicos';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import paginaCarregada from '../../utils/outros/paginaCarregada';
import iAjudaTopico from '../../utils/types/ajuda.topico';
import Styles from './index.module.scss';
import AjudaInputPesquisaTopico from './outros/ajuda.inputPesquisaTopico';
import AjudaListaTopicos from './topico/outros/ajuda.listaTopicos';

interface iParametros {
    listaTopicos: iAjudaTopico[];
}

export default function Index({ listaTopicos }: iParametros) {

    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
            {/* #1 - Título */}
            <div className={Styles.divTitulo}>
                <span>Central de ajuda</span>

                <div className='animate__animated animate__pulse animate__slower animate__infinite'>
                    <Image src={EmojiMedicacao} alt='' width={50} height={63} />
                </div>
            </div>

            {/* #2 - Input para filtragem dos tópicos */}
            <AjudaInputPesquisaTopico topicoBuscado='' />

            {/* #3 - Lista de tópicos */}
            <AjudaListaTopicos listaTopicos={listaTopicos} />

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTS_AJUDAS_TOPICOS.API_URL_GET_TODOS;
    const listaTopicos = await Fetch.getApi(url) as iAjudaTopico[];

    return {
        props: {
            listaTopicos
        }
    }
}

