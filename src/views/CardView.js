import React from 'react';
import { connect } from 'react-redux'
import Card from './../components/Card'

class CardView extends React.Component {
    render(){
        return (
            <div style={{ position: "absolute" }}>
                {this.props.cards.length > 0 && 
                    this.props.cards.map((card, index)=><Card key={index} cardData={card} dispatch={this.props.dispatch} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {cards: state.cards}
}

export default connect(mapStateToProps)(CardView);