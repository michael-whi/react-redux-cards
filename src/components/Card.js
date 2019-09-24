import React from 'react';
import { updatePosition, updateTitle, updateText } from './../actions/'

export default class Card extends React.Component {

    state = {
        textEditing: false,
        titleEditing: false
    }

    componentDidMount() {
        /* Well, I wanted to use BEM, but className and style
        don't work together. I had to define the position.
        Is that a way good? */
        const { cardData } = this.props
        const card = document.getElementById(cardData.key)
        const root = document.getElementById('root')
        const grabArea = card.firstChild

        card.style.left = cardData.pos.x
        card.style.top = cardData.pos.y

        grabArea.onmousedown = () => {
            root.style.userSelect = 'none'
            document.onmousemove = (e) => {
                card.style.zIndex = 10
                card.style.left = `${Number.parseInt(card.style.left) + e.movementX}px`
                card.style.top = `${Number.parseInt(card.style.top) + e.movementY}px`
            }
            grabArea.onmouseup = () => {
                card.style.zIndex = 0
                document.onmousemove = null
                grabArea.onmouseup = null
                root.style.userSelect = 'auto'
                this.props.dispatch(updatePosition({key: cardData.key, pos: { x: card.style.left, y: card.style.top }}))
            }
        }
    }

    render() {
        const { cardData } = this.props
        return (
            <div className='card' id={cardData.key}>
                <div className='card__grabarea' />
                {this.state.titleEditing ?
                    <textarea
                        autoFocus
                        key={'text' + cardData.key}
                        rows={1}
                        readOnly={!this.state.titleEditing}
                        className={'card__title_editing'}
                        defaultValue={cardData.title}
                        onBlur={(e) => {
                            this.props.dispatch(updateTitle({ title: e.target.value, key: cardData.key }))
                            this.setState({ titleEditing: false })
                        }}
                    />
                    :
                    <div key={'div' + cardData.key} className='card__title' onClick={() => { this.setState({ titleEditing: true }) }}>{cardData.title}</div>}
                <br />
                <textarea
                    readOnly={!this.state.textEditing}
                    className={this.state.textEditing ? 'card__textarea_editing' : 'card__textarea'}
                    key={cardData.key + 'edit'}
                    defaultValue={cardData.text}
                    onClick={() => { this.setState({ textEditing: true }) }}
                    onBlur={(e) => {
                        this.props.dispatch(updateText({ text: e.target.value, key: cardData.key }))
                        this.setState({ textEditing: false })
                    }}
                />
            </div>
        )
    }
}