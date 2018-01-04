import React from 'react';
import SingleComment from './singleComment';
import FetchData from '../../fetch/fetch';

export default class DetailComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: this.props.comments,
            hotComments: this.props.comments.hotComments, /*热评*/
            commentList: this.props.comments.comments, /*所有评论*/
            id: this.props.id,
            offset: 20, /*每页评论的数量*/
            page: 0, /*页数*/
            isMore: true, /*是否还有更多评论*/
            isObtain: false, /**是否继续加载**/
            loading: false /* 加载动画*/
        }
    }

    getComment(){
        if(!this.state.isObtain){
            this.setState({
                page: this.state.page + 1,
                isObtain: !this.state.isObtain,
                loading: !this.state.loading
            },() => {
                if(this.state.isMore){
                    FetchData('type=comments&id='+this.state.id + '&limit=20&offset=' + this.state.offset * this.state.page,'get').then(res => {
                        res.json().then(response => {
                            this.setState({
                                commentList: this.state.commentList.concat(response.comments),
                                isMore: response.more,
                                isObtain: !this.state.isObtain,
                                loading: !this.state.loading
                            })
                        })
                    })
                }else{
                    alert('已没有更多评论')
                }
            })
        }

    }

    componentDidMount(){
        window.addEventListener('scroll',() => {
            let target = this.refs.comment_list;
            if(target){
                let style = window.getComputedStyle(target,null) || target.currentStyle;
                let height = +style.height.split('px')[0];
                let viewHeight = document.documentElement.clientHeight;
                let scrollTop = document.documentElement.scrollTop;
                // 最大值40
                if(scrollTop + viewHeight - height >= 10){
                    this.getComment();
                }
            }

            // console.log(height,viewHeight,scrollTop);
        })
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
                        this.state.commentList.map((item,index) => {
                            return <SingleComment info={item} key={index}/>
                        })
                    }
                </ul>
                <div className="refresh" style={{display: this.state.loading ? 'block' : 'none'}}>
                    <i className="material-icons">refresh</i>
                </div>
                {/*<button onClick={() => this.getComment()}>加载更多</button>*/}
            </div>
        )
    }
}