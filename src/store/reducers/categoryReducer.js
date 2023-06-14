const defaultState = {
    category:[
        {id:1,title:'1'},
        {id:2,title:'2'},
        {id:3,title:'3'},
    ]
}

export const categoryReducer = (state = defaultState,action)=>{
    switch (action.type){
        default:
            return state
    }
}