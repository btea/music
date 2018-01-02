import React from 'react';
import {Link} from 'react-router-dom';
import SingleSongTemp from '../singleSongTemp';

// 歌单单曲列表展示
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
            console.log(this.props.source);
            let data,path;
            return(
                this.props.source.map((item,index) => {
                    data = {
                        id: item.id,
                        picUrl: item.al.picUrl,
                        duration: item.dt,
                        name: item.name,
                        arname: item.ar[0].name
                    };
                    path = {
                        pathname: 'single/',
                        state: data
                    };
                    return (
                        <Link key={index} to={path}>
                            <SingleSongTemp key={index} item={item} index={index}/>
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
