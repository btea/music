import React from 'react';
import {Link,hashHistory} from 'react-router-dom';
import FetchData from '../../fetch/fetch';

export default class SingSong extends React.Component{
    constructor(props){
        super(props)
    }
    songDetail(event){
        let target = event.currentTarget;
        let id = target.getAttribute('data-id');
        FetchData('https://api.imjad.cn/cloudmusic/?type=song&id=' + id + '&br=320000','get').then(
            res => {
                res.json().then(response => {
                    console.log(response);
                })
            }
        )
    }
    componentWillMount(){
        this.setState({
            songs: this.props.source
        })
    }
    render(){
        if(this.props.source){
            return(
                this.props.source.map((item,index) => {
                    return (
                        <Link key={index} to={"single" + item.id}>
                            <li className="single_song" key={index} data-id={item.id} onClick={event => this.songDetail(event)} time={item.duration}>
                                <div className="img_picUrl">
                                    <img src={index < 10 ? item.album.picUrl :''} data-src={index >= 10 ? item.album.picUrl : ''} alt="" className="picUrl"/>
                                </div>
                                <div className="right">
                                    <div className="name">
                                        <div className="song_name">{item.name}</div>
                                        <span className="mv" style={{display: item.mvid ? 'block' : 'none'}} data-mv={item.mvid || ''}>MV</span>
                                    </div>
                                    <div className="className">{item.artists[0].name}</div>
                                </div>
                            </li>
                            {hashHistory.push(`single${item.id}`)}
                        </Link>

                    )
                })
            )
        }else{
            return (<li className="single_song">
                ....
            </li>)
        }
    }
}