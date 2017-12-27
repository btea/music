import React from 'react';
import FetchData from '../fetch/fetch';
export default class Lyric extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        FetchData('https://api.imjad.cn/cloudmusic/?type=lyric&search_type=1006&id='+ this.props.id,'get').then(
            res => {
                res.json().then(response => {
                    console.log(response);
                })
            }
        )
    }

    render(){

        return(
            <div>

            </div>
        )
    }
}