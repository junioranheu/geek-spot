import Router from 'next/router';

interface iParametros {
    width: number | null
    url: string | null;
    title: string | null;
}

export default function Configuracao({ width, url, title }: iParametros) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className='pointer' onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-configuracao' viewBox='0 0 24 24'>
                    <path d='M22.31,14.85l-1.66-1.39a9.24,9.24,0,0,0,0-3.13l1.68-1.4a1.92,1.92,0,0,0,.43-2.41L22,5.16a1.85,1.85,0,0,0-2.29-.81l-2,.78A8.69,8.69,0,0,0,15,3.6l-.36-2.12A1.79,1.79,0,0,0,12.77,0H11.23A1.79,1.79,0,0,0,9.37,1.48L9,3.54A8.7,8.7,0,0,0,6.36,5.09l-2-.76A1.92,1.92,0,0,0,2,5.16L1.25,6.52a1.9,1.9,0,0,0,.43,2.4l1.67,1.4a9.31,9.31,0,0,0-.13,1.56,9,9,0,0,0,.13,1.56l-1.68,1.4a1.91,1.91,0,0,0-.43,2.41L2,18.62a1.9,1.9,0,0,0,2.29.83l2-.78A8.71,8.71,0,0,0,9,20.24l.36,2.18A1.89,1.89,0,0,0,11.23,24h1.55a1.88,1.88,0,0,0,1.86-1.59L15,20.24a8.91,8.91,0,0,0,2.77-1.65l1.92.75a1.93,1.93,0,0,0,2.31-.8l.74-1.26A1.9,1.9,0,0,0,22.31,14.85Zm-.44,1.92L21.13,18A.89.89,0,0,1,20,18.4l-2.16-.84-.18,0a.71.71,0,0,0-.48.19,7.88,7.88,0,0,1-2.73,1.64.7.7,0,0,0-.47.56l-.38,2.34a.89.89,0,0,1-.87.75H11.23a.89.89,0,0,1-.87-.75L10,19.91a.71.71,0,0,0-.47-.55,7.72,7.72,0,0,1-2.62-1.54.71.71,0,0,0-.47-.18h0L4,18.52a.89.89,0,0,1-1.07-.39l-.77-1.36a.91.91,0,0,1,.2-1.15l1.8-1.51a.71.71,0,0,0,.24-.68,8.1,8.1,0,0,1-.15-1.54,8.23,8.23,0,0,1,.15-1.54.71.71,0,0,0-.24-.68L2.32,8.16A.9.9,0,0,1,2.12,7l.77-1.36A.9.9,0,0,1,4,5.27l2.27.85.17,0A.7.7,0,0,0,6.88,6,7.72,7.72,0,0,1,9.5,4.43.71.71,0,0,0,10,3.88l.38-2.23A.79.79,0,0,1,11.23,1h1.55a.79.79,0,0,1,.87.64L14,3.92a.71.71,0,0,0,.47.56A7.69,7.69,0,0,1,17.12,6a.67.67,0,0,0,.47.18L20,5.28a.84.84,0,0,1,1.06.38L21.88,7a.91.91,0,0,1-.2,1.15l-1.8,1.5a.71.71,0,0,0-.25.69,8.21,8.21,0,0,1,0,3.08.72.72,0,0,0,.24.68l1.79,1.5A.9.9,0,0,1,21.86,16.77Z' fill='currentColor'></path>
                    <path d='M12 8a4 4 0 1 0 4 4A4 4 0 0 0 12 8m0 7a3 3 0 1 1 3 -3A3 3 0 0 1 12 15' fill='currentColor'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-configuracao' fill='#222222'></use>
        </svg>
    )
}