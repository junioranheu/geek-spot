import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Fragment, useState } from 'react';
import Styles from '../../styles/navbarMobile.module.css';
import Geekspot from '../svg/geekspot';
import Hamburguer from '../svg/hamburguer';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';
import Botao from './botao';

export default function NavbarMobile({ auth, isAuth, setIsAuth }) {
    const [isLupa, setIsLupa] = useState(false);
    const [isHamburguer, setIsHamburguer] = useState(false);

    function handleLupa() {
        setIsLupa(!isLupa);
    }

    function handleHamburguer() {
        setIsHamburguer(!isHamburguer);
    }

    function deslogar() {
        NProgress.start();

        // Deslogar;
        auth.deleteUsuarioLogado();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/');

        // Desatribuir autenticação ao contexto de usuário;
        setTimeout(function () {
            setIsAuth(false);
        }, 100);
    }

    return (
        <Fragment>
            {/* #01 - Navbar */}
            <nav className={Styles.navbar}>
                {
                    !isLupa ? (
                        <div className={Styles.wrapper}>
                            <div className={Styles.divEsquerda}>
                                <Link href='/'><a className={Styles.iconeCorInvertida}><Geekspot width='0.9rem' cor='var(--branco)' />&nbsp;&nbsp;GeekSpot</a></Link>
                                <a onClick={() => handleLupa()}><Lupa height='1.5rem' width='1.5rem' cor='rgba(255, 255, 255, 0.7)' /></a>
                            </div>

                            <div className={Styles.divDireita}>
                                <a onClick={() => handleHamburguer()}><Hamburguer width='1rem' cor='var(--branco)' /></a>
                            </div>
                        </div>
                    ) : (
                        <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
                            <div>
                                <Lupa width='1.5rem' cor='rgba(255, 255, 255, 0.7)' />
                                <input className={Styles.inputPesquisaNavbar} type='text' placeholder='Busque algo aqui...' />
                                <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1rem' width='1rem' cor='rgba(255, 255, 255, 0.7)' /></button>
                            </div>
                        </div>
                    )
                }
            </nav>

            {/* #02 - Hamburguer */}
            {
                isHamburguer && (
                    <section className={`${Styles.sessaoHamburguer} animate__animated animate__slideInRight animate__faster`}>
                        <div className={Styles.divDireita}>
                            <a onClick={() => handleHamburguer()}><Xis height='1.7rem' width='1.7rem' cor='rgba(255, 255, 255, 0.8)' /></a>
                        </div>

                        <div className={Styles.divAtalhos}>
                            <Link href='/xxx'><a>Produtos</a></Link>
                            <Link href='/xxx'><a>Promoções 🔥</a></Link>

                            {
                                isAuth && (
                                    <Fragment>
                                        <Link href='/xxx'><a>xxx</a></Link>
                                        <Link href='/xxx'><a>xxx</a></Link>
                                    </Fragment>
                                )
                            }

                            <div className='divisao margem1'>ou</div>

                            {
                                isAuth ? (
                                    <div className={Styles.sessaoBotoes}>
                                        <div className={Styles.botaoPadrao} onClick={() => deslogar()}>
                                            <Botao texto={'Sair'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={Styles.sessaoBotoes}>
                                        <div className={Styles.botaoCriarConta}>
                                            <Botao texto={'Crie sua conta'} url={'/usuario/criar-conta'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </div>

                                        <div className={Styles.botaoPadrao}>
                                            <Botao texto={'Entrar agora'} url={'/usuario/entrar'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                )
            }
        </Fragment>
    )
}
