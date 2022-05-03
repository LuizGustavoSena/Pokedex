import { useState } from 'react'
import './menu-style.scss'

type Props = {
    toggleFilterPokemon(words: string):void
}

const Menu: React.FC<Props> = ({ toggleFilterPokemon }: Props) => {
    return(
        <div className='menuCard'>
        <div className='leftItem'>
            <div className='imgTitle'>
                <img src='data:image/gif;base64,R0lGODlh9AH8AfMLAMMzO+l7fGpgKYcsP5JTO38sDP///5ykvdumVAAAAPzUWAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMUE1NjdBM0FCQUMxMUUzOUIxQkU2MTQ5RDgzNTBCRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMUE1NjdBNEFCQUMxMUUzOUIxQkU2MTQ5RDgzNTBCRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxQTU2N0ExQUJBQzExRTM5QjFCRTYxNDlEODM1MEJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxQTU2N0EyQUJBQzExRTM5QjFCRTYxNDlEODM1MEJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm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' />
                <h2>Pokedex</h2>
            </div>
        </div>
        <div className='rightItem'>
            <input type='text' placeholder='Buscar Pokemon'/>
        </div>
    </div>
    )
}

export default Menu