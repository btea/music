import React from 'react';
import SingleComment from './singleComment';
import FetchData from '../../fetch/fetch';

export default class DetailComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: this.props.comments,
            hotComments: this.props.comments.hotComments,
            commentsList: this.props.comments.comments,
            id: this.props.id, /*音乐id*/
            offset: 0,  /*评论加载页数*/
            isobtain: true /*是否允许继续加载*/
        }
    }

    getComment(){
        if(this.state.isobtain){
            FetchData('type=comments&id='+this.state.id + '&offset=' + this.state.offset,'get').then(res => {
                this.setState({
                    isobtain: !this.state.isobtain
                })
                res.json().then(response => {
                    this.setState({
                        commentsList: this.state.commentsList.concat(response.comments),
                        isobtain: !this.state.isobtain
                    })
                })
            })
        }
    }

    componentDidUpdate(){
        window.addEventListener('scroll',() => {
            let target = this.refs.comment_list;
            let style = window.getComputedStyle(target,null) || target.currentStyle;
            let height = +style.height.split('px')[0];
            if(style.height !== 'auto'){
                let viewHeight = document.body.clientHeight;
                let scrollTop = document.documentElement.scrollTop;
                if(height - scrollTop - viewHeight   < 50 ){
                    // 发起请求
                    this.setState({
                        offset: this.state.offset + 1
                    },() => {
                        this.getComment();
                    })
                }
                console.log(height);
                console.log(scrollTop);
                console.log(viewHeight);
            }
        });

    }

    render(){
        let comment = this.state.comments;
        return(
            <div className="comment_list" ref="comment_list">
                <div className="header">
                    <i className="material-icons back" onClick={() => this.props.commentStateChange()}>arrow_back</i>
                    <span>评论({comment.total})</span>
                </div>
                <p className="hot_comment_title">精彩评论</p>
                <ul className="hot_comment">
                    {
                        this.state.hotComments.map((item,index) => {
                            return <SingleComment info={item} key={index}/>
                        })
                    }
                </ul>
                <p className="new_comment">最新评论</p>
                <ul className="all_comment">
                    {
                        this.state.commentsList.map((item,index) => {
                            return <SingleComment info={item} key={index}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}