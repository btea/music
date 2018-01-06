import React from 'react';
import FetchData from '../../fetch/fetch';
import './mvindex.css';


export default class MV extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mvinfo: null,
            mvList: {
                5454024: './source/5454204.mp4',
                5443264: './source/b472d1d6292f1842ff4fd6f0a9cab12c.mp4'
            }
        }
    }

    componentWillMount(){
        let id = this.props.match.params.mvid;
        FetchData('type=mv&search_type=1004&id='+ id,'get').then(res => {
            res.json().then(response => {
                this.setState({
                    mvinfo: response.data
                })
            })
        })
    }
    componentDidMount(){

    }
    render(){
        let info = this.state.mvinfo;
        console.log(info);
        // info.brs[240]
        if(info) {
            return (
                <div className="mv_index">
                    <div className="getCover_Img">
                        <img src={info.cover} alt=""/>
                        <video src={info[240]}  width="100%" height="235"></video>
                        <div className="progress">

                        </div>
                    </div>
                    <div className="mv_info">
                        <div className="name_time_list">
                            <div className="mv_name">
                                <span>MV</span>
                                <span className="mv_name">{info.name}</span>
                            </div>
                            <div className="singer_publish_play">
                                <div className="singer">歌手: {artist(info.artists)}</div>
                                <span className="time">发布: {info.publishTime}</span>
                                |
                                <span className="play_count">播放: {playCount(info.playCount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
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

function playCount(count){
    let play;
    if(count < 10000){
        play = count;
    }else if(count >= 10000 && count < 10000){
        play = (count / 10000).toFixed(1) + '万';
    }else{
        play = Math.floor(count / 10000) + '万';
    }
    return play;
}
function artist(list){
    let artists = '';
    for(let i = 0; i < list.length; i++){
        artists += list[i].name + '/'
    }
    artists.slice(-1);
    return artists;
}