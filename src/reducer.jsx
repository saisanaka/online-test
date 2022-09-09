export const initialState = {
    questions : [],
    answers : [],
    user : null,
}

const reducer = (state , action) => {
    
    switch(action.type) {
        
        case 'Add_new':
        
            return {
                ...state,
                questions: [...state.questions , action.item]
            }
        case "Add_ans":
        
            return {
                ...state ,
                answers: [...state.answers , action.item]
            }

        case "clear":

            return {
                ...state,
                answers: []
            }
        
        default :
            return state;
    }
}

export default reducer;