import React from 'react';
import SingleComment from './singleComment';
import FetchData from '../../fetch/fetch';

export default class DetailComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: this.props.comments,
            id: this.props.id,
            offset: 0
        }
    }

    // getComment(){
    //     FetchData('type=comments&id='+)
    // }

    componentDidUpdate(){
        let target = this.refs.comment_list;
        let style = window.getComputedStyle(target,null) || target.currentStyle;
        if(style.height !== 'auto'){
            let height = +style.height.split('px')[0];
            console.log(target);
            window.addEventListener('scroll',() => {
                let scrollTop = window.scrollTop;
                console.log(scrollTop);
            });
            console.log(height);
            console.log(style.height);
            console.log(this.state);
        }
    }

    render(){
        let comment = this.state.comments;
        console.log(comment);
        return(
            <div className="comment_list" ref="comment_list">
                <div className="header">
                    <i className="material-icons back" onClick={() => this.props.commentStateChange()}>arrow_back</i>
                    <span>评论({comment.total})</span>
                </div>
                <p className="hot_comment_title">精彩评论</p>
                <ul className="hot_comment">
                    {
                        comment.hotComments.map((item,index) => {
                            return <SingleComment info={item} key={index}/>
                        })
                    }
                </ul>
                <p className="new_comment">最新评论</p>
                <ul className="all_comment">
                    {
                        comment.comments.map((item,index) => {
                            return <SingleComment info={item} key={index}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}