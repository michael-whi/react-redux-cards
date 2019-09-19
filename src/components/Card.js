import React from 'react';

export default class Card extends React.Component {

    setPosition(){

    }

    componentDidMount(){
        /* Well, I wanted to use BEM, but className and style
        don't work together. I had to define the position.
        Is that a way good? */
        const { cardData } = this.props
        const card = document.getElementById(cardData.key)
        card.style.left = cardData.pos.x
        card.style.top = cardData.pos.y
    }

    render(){
        const { cardData } = this.props
        return (
            <div id={cardData.key} className="card">
                <div className="card__title">
                    {cardData.title}
                    <br />
                    <textarea value={cardData.text} />
                </div>
            </div>
        )
    }
}