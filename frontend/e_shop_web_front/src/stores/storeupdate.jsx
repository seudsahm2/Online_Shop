import axios from 'axios';
import { Component } from 'react';
class StoreUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            obj_to_update : this.props.updateStore,
            name : this.props.updateStore.name,
            street : this.props.updateStore.street,
            city : this.props.updateStore.city,
            state : this.props.updateStore.state,
            zip_code : this.props.updateStore.zip_code,
            description : this.props.updateStore.description,
            website : this.props.updateStore.website,
            phone_number : this.props.updateStore.phone_number,
            logo_image : this.props.updateStore.logo_image,
            email : this.props.updateStore.email,
            active : this.props.updateStore.active
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, type } = event.target;
        if (type === 'file') {
          // For file input, use the file object
          this.setState({ [name]: event.target.files[0] });
        } else {
          this.setState({ [name]: event.target.value });
        }
      }

      handleSubmit(event) {
        event.preventDefault();
        // Create a FormData object
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('city', this.state.city);
        formData.append('state', this.state.state);
        formData.append('street', this.state.street);
        formData.append('zip_code', this.state.zip_code);
        formData.append('description', this.state.description);
        formData.append('website', this.state.website);
        formData.append('phone_number', this.state.phone_number);
        if (this.state.logo_image) {
          formData.append('logo_image', this.state.logo_image);
        }
        formData.append('email', this.state.email);
        formData.append('active', this.state.active);
    
        axios.patch(this.state.obj_to_update.update, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      render() {
        const { name, city, state, street, zip_code, description, website, phone_number, email, active } = this.state;
        return (
          <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
            <div>
                <h1>Updating</h1>
            </div>
            <div>
              Name
              <input
                type='text'
                name='name'
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              City
              <input
                type='text'
                name='city'
                value={city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              State
              <input
                type='text'
                name='state'
                value={state}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Street
              <input
                type='text'
                name='street'
                value={street}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Zip_Code
              <input
                type='text'
                name='zip_code'
                value={zip_code}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Description
              <input
                type='text'
                name='description'
                value={description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Website
              <input
                type='text'
                name='website'
                value={website}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Phone
              <input
                type='text'
                name='phone_number'
                value={phone_number}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Logo
              <input
                type='file'
                name='logo_image'
                onChange={this.handleChange}
              />
            </div>
            <div>
              Email
              <input
                type='text'
                name='email'
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Active
              <input
                type='text'
                name='active'
                value={active}
                onChange={this.handleChange}
              />
            </div>
            <input style={{ backgroundColor: 'white' }} type="submit" value="submit" />
          </form>
        );
      }
}

export default StoreUpdate;