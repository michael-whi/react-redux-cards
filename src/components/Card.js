import React from 'react';
import { updatePosition, updateTitle, updateText } from './../actions/'

export default class Card extends React.Component {

    state = {
        textEditing: false
    }

    componentDidMount() {
        /* Well, I wanted to use BEM, but className and style
        don't work together. I had to define the position.
        Is that a way good? */
        const { cardData } = this.props
        const card = document.getElementById(cardData.key)
        const grabArea = card.firstChild

        card.style.left = cardData.pos.x
        card.style.top = cardData.pos.y

        grabArea.onmousedown = () => {
            document.onmousemove = (e) => {
                card.style.zIndex = 10
                card.style.left = `${Number.parseInt(card.style.left) + e.movementX}px`
                card.style.top = `${Number.parseInt(card.style.top) + e.movementY}px`
            }
            grabArea.onmouseup = () => {
                card.style.zIndex = 0
                document.onmousemove = null
                grabArea.onmouseup = null
            }
        }
    }

    render() {
        const { cardData } = this.props
        return (
            <div id={cardData.key} className='card'>
                <div className='card__grabarea' />
                <div className='card__title'>
                    {cardData.title}
                    <br />
                        <textarea
                            autoFocus
                            readOnly={!this.state.textEditing}
                            className={this.state.textEditing ? 'card__textarea_editing':'card__textarea'}
                            key={cardData.key + 'edit'}
                            defaultValue={cardData.text}
                            onClick={()=>{this.setState({ textEditing: true })}}
                            onBlur={(e)=>{
                                this.props.dispatch(updateText({ text: e.target.value, key: cardData.key }))
                                this.setState({ textEditing: false })
                            }}
                        />
                </div>
            </div>
        )
    }
}