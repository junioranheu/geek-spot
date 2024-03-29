import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function Inbox({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-inbox' viewBox='0 0 24 24'>
                    <path d='M23,12.51h0a.48.48,0,0,0,0-.1.47.47,0,0,0,0-.09h0L19.32,3.37A2,2,0,0,0,17.42,2H6.58A2,2,0,0,0,4.7,3.34L1,12.3H1a.47.47,0,0,0,0,.09.48.48,0,0,0,0,.1H1V20a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V12.51ZM5.63,3.68A1,1,0,0,1,6.58,3H17.42a1,1,0,0,1,1,.71L21.76,12H16.5A1.5,1.5,0,0,0,15,13.5V15a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V13.5A1.5,1.5,0,0,0,7.5,12H2.24ZM22,20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13H7.5a.5.5,0,0,1,.5.5V15a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V13.5a.5.5,0,0,1,.5-.5H22Z' fill='currentColor'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-inbox' fill='currentColor'></use>
        </svg>
    )
}