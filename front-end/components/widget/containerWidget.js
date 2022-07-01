
import Image from 'next/image';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/widget.module.css';
import Seta from '../svg/seta';

export default function ContainerWidget({ titulo, descricao, listaWidgets }) {
    const tamanhoGrande = 406;
    const tamanhoPequeno = 196;

    const [ordemTamanhosImagens, setOrdemTamanhosImagens] = useState([]);
    useEffect(() => {
        function gerarOrdemTamanhosImagens(qtd) {
            let ordens = [];

            for (let index = 0; index < qtd; index++) {
                // Se o index for 0, isso significa que é o primeiro caso... vamos randomizar se o primeiro caso vai ser 1 [grande] ou 0 [pequeno];
                if (index === 0) {
                    // Se tiver apenas 1 item, automaticamente deve ser 1 [grande];
                    if (qtd === 1) {
                        ordens.push(1);
                        continue;
                    }

                    // Randomizar 1 [grande] ou não;
                    var randomBoolean = Math.random() < 0.5; // Aleatório, true ou false;
                    ordens.push((randomBoolean ? 1 : 0));
                    continue;
                }

                // Verificar se:
                // #01 - O último é 1 [grande];
                // #02 - Ou se o último é 0 [pequeno] e o penúltimo é 1 [grande];
                // #03 - Se o index for 1 [o segundo da lista] e o último for 0 [pequeno];
                // Caso sim... o próximo tem que ser 0 [pequeno];
                const isOkParaSerPequeno =
                    (ordens[index - 1] === 1) ||
                    (ordens[index - 1] === 0 && ordens[index - 2] === 1) ||
                    (index === 1 && ordens[index - 1] === 0);

                if (isOkParaSerPequeno) {
                    // Verificar se for o último item e o anterior for 1 [grande], esse AINDA deve ser 1 [grande]!
                    const isDeveSeGrande = (index === qtd - 1) && (ordens[index - 1] === 1);
                    // console.log(index === qtd, ordens[index - 1] === 1, isDeveSeGrande);

                    if (isDeveSeGrande) {
                        ordens.push(1); // Grande;
                    } else {
                        ordens.push(0); // Pequeno;
                    }
                } else {
                    ordens.push(1); // Grande;
                }
            }

            return ordens;
        }

        const ordens = gerarOrdemTamanhosImagens(listaWidgets.length);
        // console.log(ordens);
        setOrdemTamanhosImagens(ordens);
    }, [listaWidgets.length]);

    function definirPreco(preco, precoDesconto) {
        let precoFinal = `R$ ${preco}`;

        if (precoDesconto) {
            precoFinal = `<b style="color: var(--cor-principal);">R$ ${precoDesconto}</b> 
                          <span style="text-decoration: line-through;">R$ ${preco}</span>`;
        }

        return (
            <div dangerouslySetInnerHTML={{ __html: precoFinal }} />
        );
    }

    function fraseAleatoria() {
        const frases = [
            'aqui', 'ver tudo', 'quero', 'muito mais aqui', 'corre aqui',
            'é aqui', 'imperdível', 'aí sim, meu patrão', 'muito chic', 'iti malia',
            'ver agora', 'uhu', 'aí sim'
        ];

        const random = Math.floor(Math.random() * frases.length);
        return frases[random];
    }

    return (
        <div className='flexColumn margem6'>
            <div className='flexRow'>
                <div className='flexColumn'>
                    <b className='titulo cor-principal-hover pointer' onClick={() => Router.push(`xxx`)}>{titulo}</b>
                    <span className='texto'>{descricao}</span>
                </div>

                <div className={`${Styles.infoDireita} cor-principal-hover`} onClick={() => Router.push(`xxx`)}>
                    {fraseAleatoria()}
                    <Seta width='1rem' />
                </div>
            </div>

            <div className={`margem1 ${Styles.containerWidgets}`}>
                {
                    listaWidgets?.slice(0, 6).map((item, i) => (
                        <Fragment key={item.id}>
                            {
                                ordemTamanhosImagens[i] === 1 ? (
                                    // Tamanho grande;
                                    <div className={`${Styles.divImagemGrande} ${Styles.wrapImagem}`}>
                                        <Image
                                            src={item.imagem}
                                            width={tamanhoGrande}
                                            height={tamanhoGrande}
                                            onError={() => setSrc(ImgCinza)}
                                            alt=''
                                            onClick={() => Router.push(`${item?.url}`)}
                                        />

                                        <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                    </div>
                                ) : (
                                    // Tamanho pequeno;
                                    listaWidgets[i + 1] && ordemTamanhosImagens[i + 1] === 0 && (
                                        <div className={Styles.divGrupoImagens}>
                                            <div className={Styles.wrapImagem}>
                                                <Image
                                                    src={item.imagem}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    onError={() => setSrc(ImgCinza)}
                                                    alt=''
                                                    onClick={() => Router.push(`${item?.url}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                            </div>

                                            <div className={Styles.wrapImagem}>
                                                <Image
                                                    src={listaWidgets[i + 1].imagem}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    onError={() => setSrc(ImgCinza)}
                                                    alt=''
                                                    onClick={() => Router.push(`${listaWidgets[i + 1]?.url}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(listaWidgets[i + 1]?.preco, listaWidgets[i + 1]?.precoDesconto)}</span>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

