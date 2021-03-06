import React from 'react';
import './carousel.css';
import FetchData from '../../fetch/fetch';

export default class CarouselTemplate extends React.Component{
    constructor(props){
        super(props);
    }

    // 获取歌单详细信息
    songList(){
        let listid = this.props.source.id;
        FetchData('type=playlist&search_type=1000&id=' + listid,'get').then(res => {
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
            <div className="loop_block" data-id={source.id} style={styles} onClick={() => {this.songList()}}>
                <img className="cover" src={source.coverImgUrl} alt=""/>
                <span className={this.props.describe}>{source.name}</span>
            </div>
        )
    }
}