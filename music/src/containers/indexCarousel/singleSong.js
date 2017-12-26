import React from 'react';
import {Link,hashHistory} from 'react-router-dom';
import FetchData from '../../fetch/fetch';

export default class SingSong extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.setState({
            songs: this.props.source
        })
    }
    render(){
        if(this.props.source){
            let data,path;
            return(
                this.props.source.map((item,index) => {
                    data = {
                        id: item.id,
                        picUrl: item.album.picUrl,
                        duration: item.duration
                    };
                    path = {
                        pathname: 'single/',
                        state: data
                    };
                    return (
                        <Link key={index} to={path}>
                            <li className="single_song" key={index} data-id={item.id}>
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