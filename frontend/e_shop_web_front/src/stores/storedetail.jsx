import React, { Component } from 'react';
class StoreDetail extends Component{

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
                
            </div>
        )
    }
}
export default StoreDetail;