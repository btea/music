import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import FetchData from '../../fetch/fetch';
import CarouselTemplate from '../../component/IndexCarousel/carousel';
import SingleSong from './singleSong';
import './carousel.css';

export default class IndexCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            songListShow: false,
            songList: []
        }
    }

    transferMsg(status,list){
        this.setState({
            songListShow: status,
            songList: list
        })
    }

    componentWillMount(){
        let s = searchWord();
        let request = {
            type: 'post',
            url: 'http://music.163.com/api/search/pc',
            data: {
                type: 1000,
                s: s
            }
        };
        // 获取关键词歌单
        FetchData(request.url,request.type,request.data).then(
            res => res.json().then(response => {
                this.setState({
                    playlists: response.result.playlists
                })
            })
        )
    }
    render(){
        console.log(this.state);
        if(!this.state.playlists){
            return <div className='loading'>
                <img src={require('../../images/loading.gif')} alt=''/>
            </div>
        }else{
            let descDirection,location,status = this.state.songListShow,result = this.state.songList.result;
            if(Math.random() >= 0.5){
                descDirection = 'describe left';
                location = 'left';
            }else{
                descDirection = 'describe right';
                location = 'right';
            }
            return(
                <div className="index_show">
                    <div className="playlist_block">
                        {
                            this.state.playlists.map((item,index) => {
                                return <CarouselTemplate source={item} key={index} describe={descDirection} duration={index*10} location={location} transferMsg={(status,list) => {this.transferMsg(status,list)}}/>
                            })
                        }
                    </div>
                    <div className="song_lists_show" style={{display: status ? 'block' : 'none'}}>
                        <ul className="playlist_show">
                            <p className="playlist_detail">
                                <img src={status ? result.coverImgUrl : ''} alt="" className="playlist_cover"/>
                                <span className="playCount">{status ? result.playCount > 10000 ? (result.playCount /10000).toFixed(1) + '万' : result.playCount : ''}</span>&nbsp;&nbsp;
                                <span className="shareCount">{status ? result.shareCount > 10000 ? (result.shareCount / 10000).toFixed(1) + '万' : result.shareCount : ''}</span>
                                <span className="details_describe" >{status ? result.description : ''}</span>
                            </p>
                            <SingleSong source = {status ? result.tracks : null}/>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

function searchWord(){
    let  words = ['古风','ACG','动漫','纯音乐','怀旧','治愈','轻音乐','古风对白歌','唯美','秦时明月','古装电视剧'];
    let index = Math.floor(Math.random()*(words.length) + 1) - 1;
    return words[index];
}
