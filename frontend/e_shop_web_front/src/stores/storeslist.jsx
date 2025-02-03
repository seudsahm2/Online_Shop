import axios from 'axios';
import React, { Component } from 'react';
import DummyData from './dummydata.json';
import PizzaDetail from './storedetail';
class StoreList extends Component{

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/store/")
        .then((response) => {
            console.log(response)
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render(){
        return(
            <div>
                {DummyData.map(item =>{
                    return <PizzaDetail p = {item}/>
                    }
                )}
            </div>
        )
    }
}
export default StoreList; 
