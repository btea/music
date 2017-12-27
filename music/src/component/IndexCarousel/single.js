import React from 'react';
import {Link} from 'react-router-dom';
import FetchData from '../../fetch/fetch';
import './single.css';

export default class Single extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            song: null,
            buffer: 0, /*缓冲长度*/
            played: 0,  /*已经播放长度*/
            duration: 0, /*总时长*/
            play: false, /*是否播放,默认为否*/
            playState: false, /*动画的状态*/
            barWidth: 0, /*进度条长度*/
            currentTime: 0,/*当前播放进度*/
            lyricShow: false /*是否显示歌词*/
        }
    }

    // 监听音频播放进度
    progress(event){
        let bar = this.refs.pro_bar_w;
        let style = window.getComputedStyle(bar,null) || bar.currentStyle;
        let w = style.width.split('px')[0];
        let target = event.target;
        if(!target.ended){
            this.setState({
                buffer: target.buffered.end(0)*1000,
                played:  target.currentTime*1000,
                barWidth: w
            });
        }else{
            this.setState({
                playState: false,
                play: false,
                played: this.state.duration
            })

        }

    }
    // 播放/暂停切换
    playStatus(){
        this.setState({
            play: !this.state.play,
            playState: !this.state.playState
        },() => {
            let targetVideo = this.refs.audio;
            if(this.state.play){
                targetVideo.play();
            }else{
                targetVideo.pause();
            }
        })

    }
    // 定时播放
    timePlay(event){
        let target = event.target;
        let audio = this.refs.audio;
        let percentage = (event.pageX - 37) / this.state.barWidth;
        console.log(percentage);
        console.log(this.state);
        audio.currentTime =  this.state.duration * percentage / 1000;
        this.setState({
            played: this.state.duration * percentage
        })
    }
    // 歌词显示/隐藏
    lyricShow(){
        this.setState({
            lyricShow: !this.state.lyricShow
        })
    }


    componentWillMount(){
        let props = this.props;
        let state = props.location.state;
        FetchData('https://api.imjad.cn/cloudmusic/?type=song&id=' + state.id + '&br=320000','get').then(
            res => {
                res.json().then(response => {
                    this.setState({
                        song: response.data[0],
                        duration: state.duration
                    });
                })
            }
        )
    }
    render(){
        if(this.state.song){
            let playState = this.state.playState ? 'running':'paused';
            return(
                <div className="single_music">
                    <Link to="/">
                        <header className="back">
                            <i className="material-icons">arrow_back</i>
                        </header>
                    </Link>
                    {/*播放动画*/}
                    <div className="container">
                        <div className="lyrci_show" style={{display: this.state.lyricShow ? 'block': 'none'}} onClick={() => this.lyricShow()}>
                            歌词
                        </div>
                        <img src={this.props.location.state.picUrl} alt="" style={{animationPlayState: playState,display:this.state.lyricShow ? 'none':'inline-block'}} onClick={() => this.lyricShow()}/>
                    </div>
                    {/*播放进度条*/}
                    <footer className="progress_bar">
                        <span className="played_time">{time_show(this.state.played)}</span>
                        <div className="rate" ref="pro_bar_w" onClick={(event) => this.timePlay(event)}>
                            <div className="buffer" style={{width: this.state.buffer / this.state.duration * this.state.barWidth + 'px'}}>
                                {/*{time_show(this.state.buffer)}*/}
                            </div>
                            <div className="played"  style={{width: this.state.played / this.state.duration * this.state.barWidth + 'px'}}>
                            </div>
                        </div>
                        <span className="total_time">{time_show(this.state.duration)}</span>
                        <audio src={this.state.song.url} ref="audio" onTimeUpdate={(event) => this.progress(event)}>

                        </audio>
                        <div className="button_list">
                            <div className="per">
                                <i className="material-icons">skip_previous</i>
                            </div>
                            <div className="play_pause" onClick={() => this.playStatus()}>
                                <i className="material-icons" style={{display: this.state.play ? 'block':'none'}}>pause</i>
                                <i className="material-icons" style={{display: this.state.play ? 'none':'block'}}>play_arrow</i>
                            </div>
                            <div className="next">
                                <i className="material-icons">skip_next</i>
                            </div>
                        </div>
                    </footer>
                </div>
            )
        }else{
            return <div>
                <img src={require('../../images/loading.gif')} alt=""/>
            </div>
        }
    }
}

function time_show(time){
    let minutes = Math.floor(time/1000/60);
    let seconds = Math.round(time/1000 - minutes*60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
}