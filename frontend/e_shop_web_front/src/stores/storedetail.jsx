import React, { Component } from 'react';

class StoreDetail extends Component{
    render(){
        const p = this.props.p;
        return(
            <div>
                <h4>{p.id}</h4>
                <h4>{p.name}</h4>
                <h4>{p.city}</h4>
            </div>
        )
    }
}
export default StoreDetail;