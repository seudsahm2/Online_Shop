import axios from 'axios';
import React, { Component } from 'react';
import StoreDetail from './storedetail';
class StoreList extends Component{
    constructor(props){
        super(props);
        this.state = {
            storesData : [],
            store : " ",
            showComponent : false
        };
        this.getStoreDetail = this.getStoreDetail.bind(this);
        this.showStoreDetail = this.showStoreDetail.bind(this); 
    }

    getStoreDetail(item){
        axios.get(item.absolute_url)
        .then((response)=>{
            this.setState({store:response.data})
        })
        .catch(function(error){
            console.log(error);
        })
    }

    showStoreDetail(item){
        this.getStoreDetail(item);
        this.setState({showComponent:true});
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/store/")
        .then((response) => {
            this.setState({storesData: response.data})
        })
        .catch(function(error){
            console.log(error);
        })
    }

    render(){
        return(
            <div>
                {this.state.storesData.map(item =>{
                    return <h3 key={item.id} onClick={() => this.showStoreDetail(item)}>{item.name} - {item.city}</h3>
                    }
                )}
                {this.state.showComponent ? (<StoreDetail store={this.state.store}/>):null}
            </div>
        )
    }
}
export default StoreList; 
