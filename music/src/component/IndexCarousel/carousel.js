import React from 'react';
import './carousel.css';
import FetchData from '../../fetch/fetch';

export default class CarouselTemplate extends React.Component{
    constructor(props){
        super(props);
    }

    // 获取歌单详细信息
    songlist(e){
        console.log(e);
        console.log(this);
        let listid = this.props.source.id;
        FetchData('http://music.163.com/api/playlist/detail/?id=' + listid,'get').then(res => {
            res.json().then(response => {
                // 改变父组件的state，显示歌单
                this.props.transferMsg(true,response);
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
            <div className="loop_block" data-id={source.id} style={styles} onClick={e => {this.songlist(e)}}>
                <img className="cover" src={source.coverImgUrl} atl=""/>
                <span className={this.props.describe}>{source.name}</span>
            </div>
        )
    }
}