import { useEffect, useState } from 'react';
import Carousel from '../components/outros/carousel';
import ContainerWidget from '../components/widget/widget.container';
import CarouselDois from '../static/image/carousel/dois.webp';
import CarouselUm from '../static/image/carousel/um.webp';
import CONSTANTS_ITENS from '../utils/data/constItens';
import CONSTANTS_USUARIOS from '../utils/data/constUsuarios';
import { Fetch } from '../utils/outros/fetch';
import HabilitarHttp from '../utils/outros/habilitarHttp';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Home({ listaItens }: any) {
    document.title = 'GeekSpot — Início';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(false, 100, 300, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <main className={'paddingPadrao margem3_5'}>
            <Carousel listaSlides={[
                { imagem: CarouselUm, url: '/xxx' },
                { imagem: CarouselDois, url: '/xxx' }
            ]} />

            <div className='margem3'>
                {
                    listaItens?.map((item: any, i: number) => (
                        <ContainerWidget
                            key={i}
                            i={i}
                            usuarioId={item[0]?.usuarios?.usuarioId}
                            usuarioNomeSistema={item[0]?.usuarios?.nomeUsuarioSistema}
                            descricao='Isso é apenas um teste'
                            listaWidgets={item}
                        />
                    ))
                }
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </main>
    )
}

export async function getStaticProps() {
    HabilitarHttp();
    let listaItens = [];

    // Pegar todos os usuários;
    const urlUsuarios = CONSTANTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(urlUsuarios, null);

    if (usuarios) {
        for (const u of usuarios) {
            // Encontrar os itens com base no usuário;
            const urlItens = `${CONSTANTS_ITENS.API_URL_GET_POR_USUARIO_ID}/${u.usuarioId}`;
            const itens = await Fetch.getApi(urlItens, null);

            if (itens?.length) {
                listaItens.push(itens);
            }
        }
    }

    return {
        props: {
            listaItens
        },
        // revalidate: 60 // segundos
    }
}