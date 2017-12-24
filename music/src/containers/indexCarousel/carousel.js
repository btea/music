import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import FetchData from '../../fetch/fetch';
import CarouselTemplate from '../../component/IndexCarousel/carousel';

export default class IndexCarousel extends React.Component{
    constructor(props){
        super(props);
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
        FetchData(request.url,request.type,request.data).then(
            res => res.json().then(response => {
                this.setState({
                    playlists: response.result.playlists
                })

            })
        )
    }
    render(){
        if(!this.state){
            return <div className='loading'>
                <img src={require('../../images/loading.gif')} alt=''/>
            </div>
        }else{
            console.log(this.state.playlists)
            let descDirection,location;
            if(Math.random() >= 0.5){
                descDirection = 'describe left';
                location = 'left';
            }else{
                descDirection = 'describe right';
                location = 'right';
            }
            return (
            <div className="index_show">
                {
                    this.state.playlists.map((item,index) => {
                        return <CarouselTemplate source={item} key={index} describe={descDirection} duration={index*10} location={location}/>
                    })
                }
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