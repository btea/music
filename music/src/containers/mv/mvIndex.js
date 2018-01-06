import React from 'react';
import FetchData from '../../fetch/fetch';
import './mvindex.css';


export default class MV extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mvinfo: null
        }
    }

    componentWillMOunt(){
        console.log(this.props);
    }
    componentDidMount(){
        let id = this.props.match.params.mvid
        FetchData('type=mv&search_type=1004&id='+ id,'get').then(res => {
            res.json().then(response => {
                console.log(response);
                this.setState({
                    mvinfo: response.data
                })
            })
        })
    }
    render(){
        let info = this.state.mvinfo;
        if(info) {
            return (
                <div className="mv_info">
                    <div className="mv_index">
                        <div className="cover_img">
                            <img src={info.cover} alt=""/>
                        </div>
                        <video src={info.brs[240]}  width="100%" height="235"></video>
                        <div className="progress"></div>
                    </div>
                    <div className="name_time_list">
                        <div className="mv_name">
                            <span>MV</span>
                            <span>{info.name}</span>
                        </div>
                        <div className="singer">歌手: {nameList(info.artists)}</div>
                        <div className="time_play">
                            <span className="time">发布: {info.publishTime}</span>
                            |
                            <span className="play">播放: {playCOunt(info.playCount)}</span>
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
function playCOunt(count){
    let counts = '';
    if(count < 10000){
        counts = count;
    }else if(count >= 10000 && count < 100000){
        counts = (count / 10000).toFixed(1) + '万';
    }else{
        counts = Math.floor(count / 10000) + '万';
    }
    return counts;
}

function nameList(artist){
    console.log(artist);
    let artists = '';
    for(let i = 0; i < artist.length; i++){
        artists += artist[i].name + '/'
    }
    return artists.substr(0,artists.length - 1);
}