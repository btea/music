import React from 'react';
import {Link} from 'react-router-dom';
import SingleSongTemp from '../singleSongTemp';

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
