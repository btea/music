import React from 'react';
import './carousel.css';
import FetchData from '../../fetch/fetch';

export default class CarouselTemplate extends React.Component{
    constructor(props){
        super(props);
    }

    // 获取歌单详细信息
    songlist = () =>{
        console.log(this);
        let listid = this.props.source.id;
        let data = {
            id: listid
        }
        FetchData('http://music.163.com/api/playlist/detail','post',data).then(res => {
            res.json().then(response => {
                console.log(response);
            })
        })
    }

    render(){
        let source = this.props.source;
        let loc = this.props.location,styles;
        if(loc === 'left'){
            styles = {
                left: this.props.duration + '%'
            }
        }else{
            styles = {
                right: this.props.duration + '%'
            }
        }
        return (
            <div className="loop_block" data-id={source.id} style={styles} onClick={this.songlist}>
                <img className="cover" src={source.coverImgUrl} atl=""/>
                <span className={this.props.describe}>{source.name}</span>
            </div>
        )
    }
}