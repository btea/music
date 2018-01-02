import React  from 'react';

export default class Comment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let comment = this.props.commens;
        console.log(comment);
        return(
            <div>123</div>
        )
    }

}