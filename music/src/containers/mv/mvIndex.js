import React from 'react';
import FetchData from '../../fetch/fetch';


export default class MV extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mvinfo: null
        }
    }

    componentWillMOunt(){
        console.log(this.props);
    }
    componentDidMount(){
        let id = this.props.match.params.mvid
        FetchData('type=mv&search_type=1004&id='+ id,'get').then(res => {
            res.json().then(response => {
                console.log(response);
                this.setState({
                    mvinfo: response.data
                })
            })
        })
    }
    render(){
        let info = this.state.mvinfo;
        if(info) {
            return (
                <video src={info.brs[240]} controls width="100%" height="200"></video>
            )
        }else{
            return(
                <div>
                    <img src={require('../../images/loading.gif')} alt=""/>
                </div>
            )
        }
    }
}