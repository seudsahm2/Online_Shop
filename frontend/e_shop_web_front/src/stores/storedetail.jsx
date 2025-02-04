import axios from 'axios';
import React, { Component } from 'react';
import StoreUpdate from './storeupdate';
class StoreDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            showComponent:false,
        };
        this.updateStoreDetails = this.updateStoreDetails.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }
    updateStoreDetails(){
        this.setState({showComponent:true});
    }

    deleteStore(store){
        axios.delete(store.delete)
        .then((response)=> {
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render(){
        const store = this.props.store;
        return(
            <div style={{color:"yellow", border:"1px solid yellow"}}>
                <h3>{store.id}</h3>
                <h4>{store.name}</h4>
                
                <h5>{store.street} - {store.city} - {store.state} - {store.zip_code}</h5>

                <h3>{store.description}</h3>
                <h3>{store.website}</h3>
                <h3>{store.phone_number}</h3>
                <h3>{store.logo_image}</h3>
                <h3>{store.email}</h3>
                <h3>{store.active}</h3>
                <button style={{backgroundColor:"yellow"}} onClick={()=>this.updateStoreDetails()}>
                    Update
                </button>

                <button style={{backgroundColor:"yellow"}} onClick={()=>this.deleteStore(store)}>
                    Delete
                </button>
                {this.state.showComponent ? <StoreUpdate updateStore = {store}/>:null}
            </div>
        )
    }
}
export default StoreDetail;