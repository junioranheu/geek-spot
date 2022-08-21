import { Fragment, useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import Styles from '../../styles/navbar.padrao.module.scss';
import randomizarArray from '../../utils/outros/randomizarArray';
import Lupa from '../svg/lupa';

export default function InputFiltroNavbar() {

    // Pegar os dados a cada X ms do elemento #Typewriter__wrapper;
    const tw = document.getElementsByClassName('Typewriter__wrapper');
    const [efeitoTypewriter__wrapper, setEfeitoTypewriter__wrapper] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore;
            const typewriter__wrapper = tw[0]?.innerText;
            setEfeitoTypewriter__wrapper(typewriter__wrapper);
        }, 100);

        return () => clearInterval(interval);
    }, [tw])

    const [listaOpcoes, setListaOpcoes] = useState<string[]>([]);
    useEffect(() => {
        const lista = [
            '"PS4"', '"Xbox"', '"Naruto"', '"iPhone"', '"Breaking bad"',
            '"Headset"', '"Guitarra"', '"Nintendo"', '"Pink Floyd"', '"Oasis"',
            '"Violão"', '"Walter White"', '"Harry Potter"', '"GTA San Andreas"', '"PS5"',
            '"LOL"', '"Dota 2"'
        ];

        const listaRandom = randomizarArray(lista);
        setListaOpcoes(listaRandom);
    }, [])

    return (
        <Fragment>
            <div className='esconder'>
                <Typewriter
                    options={{
                        strings: listaOpcoes,
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>

            <div className={`${Styles.divPesquisa} animate__animated animate__fadeIn`}>
                <input className={Styles.inputPesquisaNavbar} type='text' placeholder={`Busque por ${efeitoTypewriter__wrapper}`} />
                <Lupa width='1.5rem' cor='var(--preto)' />
            </div>
        </Fragment>
    )
}