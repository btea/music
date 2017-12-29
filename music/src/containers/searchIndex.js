import React from 'react';
import {Link} from 'react-router-dom';
import FetchDta from '../fetch/fetch';
import './searchIndex.css';

export default class SearchIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            words: ['红昭愿','诀别诗','天行九歌','牵丝戏','不谓侠','明月天涯','我的世界','青丝','大浪淘沙']
        }
    }

    render(){
        return(
            <div className="search_index">
                <div className="input_search">
                    <Link to="/">
                        <i className="material-icons">arrow_back</i>
                    </Link>
                    <input type="text" autoFocus className="search_word" placeholder="音乐、音频、歌词、电台"/>
                </div>
                <div className="search_word_list">
                    <p className="word">关键词搜索</p>
                    {
                        this.state.words.map((item,index) => {
                            return <span className="single_word" key={index} onclick={}>{item}</span>
                        })
                    }
                </div>
            </div>
        )
    }
}
