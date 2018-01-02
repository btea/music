import React from 'react';

export  default class SingleComment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let inf = this.props.info;
        return(
            <li className="single_comment" id={inf.user.userId}>
                <div className="avatar">
                    <img src={inf.user.avatarUrl} alt=""/>
                </div>
            </li>
        )
    }
}