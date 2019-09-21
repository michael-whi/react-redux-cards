export function mainReducer(state={}, action) {
    switch(action.type){
        case "UPDATE_POS":
            return {cards: state.cards.map(card => 
                card.key === action.state.key ? {...card, pos:{...action.state.pos}} : card
            )}
        case "UPDATE_TEXT":
            return {cards: state.cards.map(card => 
                card.key === action.state.key ? {...card, text:action.state.text} : card
            )}
        case "UPDATE_TITLE":
            return {cards: state.cards.map(card => 
                card.key === action.state.key ? {...card, text:action.state.title} : card
            )}    
        default:
            return state
    }
}