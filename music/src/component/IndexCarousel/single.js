import React from 'react';
import {Link} from 'react-router-dom';
import FetchData from '../../fetch/fetch';
import './single.css';
import  Comment from '../../containers/comments/comment';


export default class Single extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cur: null, // 当前播放进度高亮显示的歌词
            song: null,
            buffer: 0, /*缓冲长度*/
            played: 0,  /*已经播放长度*/
            duration: 0, /*总时长*/
            play: false, /*是否播放,默认为否*/
            playState: false, /*动画的状态*/
            barWidth: 0, /*进度条长度*/
            currentTime: 0,/*当前播放进度*/
            lyricShow: false, /*是否显示歌词*/
            lyric: null, /*获取的歌词*/
            tlyric: null, /*需要翻译的歌词，翻译之后*/
            lyricTime: null, /*歌曲时间分布*/
            volume: 0.5, /*歌曲音量大小*/
            // marginTop: 235, /*歌词展示默认位置*/
            zIndex: false, /*显示歌词还是显示动画*/
            commentTotal: null, /*评论数*/
            comments: null, /*评论内容*/
            favorite: false, /*是否喜欢*/
            commentShow: false /*是否展示评论*/
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
                // marginTop: 235 // 赋值未改变 ????????
            })

        }
        if(this.state.lyricTime){
            let container = this.refs.container;
            let style = window.getComputedStyle(container,null) || container.currentStyle;
            let h = style.height.split('px')[0];
            let time = time_show(this.state.played); //当前播放时间
            for(let i = 0; i < this.state.lyricTime.length; i++){
                if(this.state.lyricTime[i] !== '00:00'){
                    if(time >= this.state.lyricTime[i] && time < this.state.lyricTime[i+1]){
                        this.setState({
                            cur: i,
                            top: h/2 - 15 - i*30
                        });
                    }
                }
            }
        }else{
            let p = document.querySelectorAll('.lyric_show p');
            let lyricTime = [];
            for(let  i = 0; i < p.length; i++){
                lyricTime.push(p[i].getAttribute('data-time'));
            }
            this.setState({
                lyricTime: lyricTime
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
        // let target = event.target;
        let audio = this.refs.audio;
        let percentage = (event.pageX - 37) / this.state.barWidth;
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


    // 歌词格式处理
    lyricFormat(lyric){
        if(lyric){
            // 匹配时间(数组)(时间包含毫秒)
            let reg = new RegExp(/\[.{8,9}\]/);
            let newReg = new RegExp(/\[.{5}\]/); //时间只包含分秒，包括冒号只有五位
            // newLyr(数组)(包含时间和歌词);
            let newLyr = lyric.split(/\n/);
            newLyr.splice(newLyr.length - 1,1);//删除最后一段多余  最后一段似乎可不删除？
            for(let i = 0; i < newLyr.length; i++){
                if(!reg.test(newLyr[i])){
                    newLyr[i] = '[00:00:00]' + newLyr[i];
                }
            }
            // 匹配了时间之后新的歌词
            let newLyric = newLyr.join('\n');
            let lastTime = newLyric.match(/\[.{8,9}\]/g);
            let lastLyric = newLyric.split(reg);
            lastLyric.splice(0,1);
            lastTime.push(time_show(this.state.duration));
            lastLyric.push('');
            let lyricInf = [];
            for(let i = 0; i < lastTime.length; i++){
                lyricInf.push({
                    time: lastTime[i],
                    lyric: lastLyric[i]
                })
            }
            this.setState({
                lyric: lyricInf
            });
        }
    }
    // 歌曲音量大小设置
    volume(event){
        let target = event.target;
        let audio = this.refs.audio;
        let style = window.getComputedStyle(target,null) || target.currentStyle;
        let width = style.width.split('px')[0];
        let percentage = (event.pageX - 40) / width;
        audio.volume = percentage;
        this.setState({
            volume: percentage
        })
    }

    // 获取评论
    comment(event){
        event.stopPropagation();
        let props = this.props;
        let state = props.location.state;
        let id = state.id;
        FetchData('type=comments&id='+id,'get').then(res => {
            res.json().then(response => {
                console.log(response);
                this.setState({
                    commentTotal: response.total,
                    comments: response,
                    commentShow: !this.state.commentShow
                })
            })
        })
    }
    // 是否标记喜欢
    favorite(event){
        event.preventDefault();
        event.stopPropagation();
        // let target = event.target;
        this.setState({
            favorite: !this.state.favorite
        })
    }
    // 下载
    download(event){
        event.preventDefault();
        event.stopPropagation();
        let a = this.refs.download;
        a.setAttribute('href',this.state.song.url);
        a.setAttribute('download',this.state.name + '.mp3');
        // console.log(a.onclick);
        // a.onclick();
        console.log(a);
    }



    componentWillMount(){
        let props = this.props;
        let state = props.location.state;
        FetchData('type=song&id=' + state.id + '&br=320000','get').then(
            res => {
                res.json().then(response => {
                    this.setState({
                        song: response.data[0],
                        duration: state.duration,
                        name: state.name, /*歌名*/
                        arname: state.arname /*歌手名*/
                    });
                })
            }
        );
        // 获取歌词
        FetchData('type=lyric&search_type=1006&id='+ state.id,'get').then(
            res => {
                res.json().then(response => {
                    if(response.nolyric){
                        this.setState({
                            lyric: [
                                {
                                    lyric: '纯音乐，请欣赏',
                                    time: '[00:00:00]'
                                }
                            ]
                        })
                    }else{
                        this.lyricFormat(response.lrc.lyric)
                    }
                })
            }
        );
    }
    componentDidUpdate(){
        let target = this.refs.audio;
        if(target){
            target.volume = this.state.volume;
        }
    }
    render(){
        if(this.state.song && this.state.lyric){
            // 显示音乐播放界面
            let playState = this.state.playState ? 'running':'paused';
            return(
                <div>
                    <div className="single_music">
                        <header className="back">
                            <Link to="/">
                                <i className="material-icons">arrow_back</i>
                            </Link>
                            <div className="name">{this.state.name}</div>
                            <div className="arname">{this.state.arname}</div>
                        </header>

                        {/*播放动画*/}
                        <div className="container" ref='container'>
                            <i className="material-icons volume" style={{zIndex: this.state.lyricShow ? 1 : 0}}>volume_up</i>
                            <div className="volume_bar" onClick={event => this.volume(event)} style={{zIndex: this.state.lyricShow ? 1 : 0}}>
                                <div className="current_volume"  style={{width: this.state.volume*100 + '%'}}></div>
                                <div className="dot"></div>
                            </div>
                            <div className="lyric" style={{zIndex: this.state.lyricShow ? 1 : 0}}>
                            <pre className="lyric_show" style={{top: this.state.top + 'px'}} onClick={() => this.lyricShow()} ref='lyric'>
                                {
                                    this.state.lyric.map((item,index) => {
                                        return <p key={index} data-time={item.time.slice(1,6)} className={index === this.state.cur ? 'line_lyric show':'line_lyric'}>{item.lyric}</p>
                                    })
                                }
                            </pre>
                            </div>
                            <div className="bg_animation" style={{zIndex:this.state.lyricShow ? 0 : 1}} onClick={() => this.lyricShow()}>
                                <img src={this.props.location.state.picUrl} alt="" style={{animationPlayState: playState}} />
                                <div className="download_dis_icon" style={{display: this.state.lyricShow ? 'none' : 'block'}}>
                                    <i className="material-icons" style={{display: this.state.favorite ? 'inline-block': 'none'}} onClick={(event) => this.favorite(event)}>favorite</i>
                                    <i className="material-icons" style={{display: this.state.favorite ? 'none' : 'inline-block'}} onClick={(event) => this.favorite(event)}>favorite_border</i>
                                    <i className="material-icons" onClick={(event) => this.download(event)}>arrow_downward<a ref="download"></a></i>
                                    <span className="comment">
                                    <i className="material-icons" onClick={(event) => this.comment(event)}>message</i>
                                    <span className="total">{this.state.commentTotal > 999 ? '999+' : this.state.commentTotal > 99 ? '99+' : this.state.commentTotal}</span>
                                </span>
                                    <i className="material-icons">more_vert</i>
                                </div>
                            </div>

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
                    <div className="comments_show">
                        <Comment comments={this.state.comments}/>
                    </div>
                </div>

            )
        }else{
            return <div>
                <img src={require('../../images/loading.gif')} alt=""/>
            </div>
        }
    }
}
// 播放进度
function time_show(time){
    let minutes = Math.floor(time/1000/60);
    let seconds = Math.floor(time/1000 - minutes*60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
}
