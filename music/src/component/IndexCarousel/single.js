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
            playState: false /*动画的状态*/
        }
    }

    // 监听音频播放进度
    progress(event){
        let target = event.target;
        this.setState({
            buffer: target.buffered.end(0)*1000,
            played:  target.currentTime*1000,
        });
    }
    // 播放/暂停切换
    playStatus(){
        this.setState({
            play: !this.state.play,
            playState: !this.state.playState
        },() => {
            let targetVideo = this.refs.video;
            if(this.state.play){
                targetVideo.play();
            }else{
                targetVideo.pause();
            }
        })

    }

    componentDidUpdate(){
        let video = this.refs.video;
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
                        <img src={this.props.location.state.picUrl} alt="" style={{animationPlayState: playState}} />
                    </div>
                    {/*播放进度条*/}
                    <footer className="progress_bar">
                        <div className="rate">
                            {time_show(this.state.duration)}
                            <div className="buffer">
                                {time_show(this.state.buffer)}
                            </div>
                            <div className="played">
                                {time_show(this.state.played)}
                            </div>
                        </div>
                        <video src={this.state.song.url} ref="video" onTimeUpdate={(event) => this.progress(event)}>

                        </video>
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