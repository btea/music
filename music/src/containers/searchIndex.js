import React from 'react';
import {Link} from 'react-router-dom';
import FetchDta from '../fetch/fetch';
import './searchIndex.css';
import SingleSong from './indexCarousel/singleSong';
import './indexCarousel/carousel.css';

export default class SearchIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            words: ['红昭愿','诀别诗','天行九歌','牵丝戏','不谓侠','明月天涯','我的世界','青丝','大浪淘沙','九九八十一','换世奇恋','拂雪','霜雪千年','烽火入冬来','战争世界'],
            wordShow: true,
            songList: null
        }
    }

    obtainData(event){
        let target = event.target,word;
        if(target.nodeName === 'SPAN'){
            word = target.innerText;
        }else{
            word = this.refs.keyword.value;
        }
        if(word){
            FetchDta('type=search&s=' + word,'get').then(res => {
                res.json().then(response => {
                    console.log(response);
                    this.setState({
                        songList: response.result.songs,
                        wordShow: !this.state.wordShow
                    },() => {
                        this.refs.keyword.value = word;
                    })
                })
            });
        }else{
            return false;
        }
    }

    render(){
        return(
            <div className="search_index">
                <div className="input_search">
                    <Link to="/">
                        <i className="material-icons">arrow_back</i>
                    </Link>
                    <input type="text" autoFocus className="search_word" placeholder="音乐、音频、歌词、电台" ref='keyword'/>
                    <i className="material-icons" onClick={(event) => this.obtainData(event) }>search</i>
                </div>
                <div className="search_word_list" style={{display: this.state.wordShow ? 'block': 'none'}}>
                    <p className="word">关键词搜索</p>
                    {
                        this.state.words.map((item,index) => {
                            return <span className="single_word" key={index} onClick={event => this.obtainData(event)}>{item}</span>
                        })
                    }
                </div>
                <div className="playlist_show" style={{display: this.state.wordShow ? 'none': 'block'}}>
                    <SingleSong source = {this.state.songList}/>
                </div>
            </div>
        )
    }
}
