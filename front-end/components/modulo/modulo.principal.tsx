import Image from 'next/image';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import definirPreco from '../../utils/outros/definirPreco';
import randomizarArray from '../../utils/outros/randomizarArray';
import { iListaItensCompleto, iListaItensInterno } from '../../utils/types/listaItens';
import ModuloHeader from './modulo.header';
import Styles from './modulo.principal.module.scss';

export default function ModuloPrincipal({ i, usuarioId, usuarioNomeSistema, titulo, descricao, listaItens }: iListaItensCompleto) {
    const tamanhoGrande = 406;
    const tamanhoPequeno = 196;

    const [ordemTamanhosImagens, setOrdemTamanhosImagens] = useState<number[]>([]);
    const [listaItensAleatorio, setListaItensAleatorio] = useState<Array<iListaItensInterno>>([]);
    useEffect(() => {
        function gerarOrdemTamanhosImagens(qtd: number) {
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

        // #01;
        const ordens = gerarOrdemTamanhosImagens(listaItens?.length);
        // console.log(ordens);
        setOrdemTamanhosImagens(ordens);

        // #02;
        setListaItensAleatorio(randomizarArray(listaItens));
    }, [listaItens]);

    return (
        <div className={`flexColumn ${i > 0 && 'margem3_5'}`}>
            <ModuloHeader
                i={i}
                usuarioId={usuarioId}
                usuarioNomeSistema={usuarioNomeSistema}
                titulo={titulo}
                descricao={descricao}
                textoTagTitle='Ver tudo'
            />

            <div className={`${Styles.container} margem1`}>
                {
                    listaItensAleatorio?.slice(0, 6).map((item, i) => (
                        <Fragment key={i}>
                            {
                                ordemTamanhosImagens[i] === 1 ? (
                                    <Fragment>
                                        <ReactTooltip multiline={true} />

                                        {/* // Tamanho grande; */}
                                        <div className={`${Styles.divImagemGrande} ${Styles.wrapImagem}`} data-tip={item.nome}>
                                            <Image
                                                src={(item.itensImagens ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.itensImagens.find((x: any) => x.isAtivo)?.caminhoImagem}` : ImgCinza)}
                                                width={tamanhoGrande}
                                                height={tamanhoGrande}
                                                alt=''
                                                onClick={() => Router.push(`/item/${item?.itemId}/${ajustarUrl(item?.nome)}`)}
                                            />

                                            <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                        </div>
                                    </Fragment>
                                ) : (
                                    // Tamanho pequeno;
                                    listaItens[i + 1] && ordemTamanhosImagens[i + 1] === 0 && (
                                        <div className={Styles.divGrupoImagens}>
                                            <div className={Styles.wrapImagem} data-tip={item.nome}>
                                                <Image
                                                    src={(item.itensImagens ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.itensImagens.find((x: any) => x.isAtivo)?.caminhoImagem}` : ImgCinza)}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    alt=''
                                                    onClick={() => Router.push(`/item/${item?.itemId}/${ajustarUrl(item?.nome)}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(item?.preco, item?.precoDesconto)}</span>
                                            </div>

                                            <div className={Styles.wrapImagem} data-tip={listaItens[i + 1].nome}>
                                                <Image
                                                    src={(listaItens[i + 1]?.itensImagens ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${listaItens[i + 1].itensImagens.find((x: any) => x.isAtivo)?.caminhoImagem}` : ImgCinza)}
                                                    width={tamanhoPequeno}
                                                    height={tamanhoPequeno}
                                                    alt=''
                                                    onClick={() => Router.push(`/item/${listaItens[i + 1]?.itemId}/${ajustarUrl(listaItens[i + 1]?.nome)}`)}
                                                />

                                                <span className={Styles.infoBottomLeft}>{definirPreco(listaItens[i + 1]?.preco, listaItens[i + 1]?.precoDesconto)}</span>
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