import React  from 'react';
import DetailComment from './detailComment';
import './comment.css';


export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            comments: null
        };
    }

    render(){
        let comment = this.props.comments;
            if(comment){
                return(
                    <DetailComment comments={comment} commentStateChange={() => this.props.commentState()} id={this.props.id}/>
                )
            }else{
                return(
                    <div>
                        <img src={require('../../images/loading.gif')} alt=""/>
                    </div>
                )
            }
    }
}