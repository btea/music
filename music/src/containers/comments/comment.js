import React  from 'react';

export default class Comment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let comment = this.props.comments;
        return(
            if(comment){
                
            }else{
                return(
                    <div>
                        <img src={require('../../images/loading.gif')} alt=""/>
                    </div>
                )
            }
            <div>123</div>
        )
    }

}