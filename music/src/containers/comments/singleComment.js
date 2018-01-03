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
                <div className="content">
                    <div className="name_time">
                        <div className="nickname_time">
                            <p className="nickname">{inf.user.nickname}</p>
                            <p className="release_time">{new Date(inf.time).toLocaleString()}</p>
                        </div>
                        <p className="likedCount">
                            {inf.likedCount ? inf.likedCount : ''}
                            <i className="material-icons">thumb_up</i>
                        </p>
                    </div>
                    <p className="content_des">{inf.beReplied.length ? '回复@' + inf.beReplied[0].user.nickname + ': ' +inf.content : inf.content}</p>
                    <p className="replay" style={{display: inf.beReplied.length ? 'block' : 'none'}}>{inf.beReplied.length ? '@' + inf.beReplied[0].user.nickname + ': ' + inf.beReplied[0].content : ''}</p>
                </div>
            </li>
        )
    }
}