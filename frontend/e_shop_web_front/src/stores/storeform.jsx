import axios from 'axios';
import { Component } from 'react';

class StoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      state: '',
      street: '',
      zip_code: '',
      description: '',
      website: '',
      phone_number: '',
      logo_image: null,  // will store the file object
      email: '',
      active: ''
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
    this.props.onSuccess();

    axios.post(import.meta.env.VITE_APP_URL, formData, {
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
        
      <div style={formStyles.container}>
        <div style={formStyles.header}>
          <h2 style={formStyles.title}>Add New Store</h2>
          <button 
            style={formStyles.cancelButton} 
            onClick={this.props.onCancel}
          >
            &times;
          </button>
        </div>

        <form onSubmit={this.handleSubmit} style={formStyles.form}>  <div style={formStyles.grid}>
            <div style={formStyles.formGroup}>
              <label style={formStyles.label}>Store Name</label>
              <input
                style={formStyles.input}
                type='text'
                name='name'
                value={name}
                onChange={this.handleChange}
                placeholder="Enter store name"
              />
            </div>
  
            <div style={formStyles.formGroup}>
              <label style={formStyles.label}>City</label>
              <input
                style={formStyles.input}
                type='text'
                name='city'
                value={city}
                onChange={this.handleChange}
                placeholder="Enter city"
              />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>State</label>
            <input
                style={formStyles.input}
                type='text'
                name='state'
                value={state}
                onChange={this.handleChange}
                placeholder="Enter state"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Street</label>
            <input
                style={formStyles.input}
                type='text'
                name='street'
                value={street}
                onChange={this.handleChange}
                placeholder="Enter street"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Zip Code</label>
            <input
                style={formStyles.input}
                type='text'
                name='zip_code'
                value={zip_code}
                onChange={this.handleChange}
                placeholder="Enter zip code"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Description</label>
            <input
                style={formStyles.input}
                type='text'
                name='description'
                value={description}
                onChange={this.handleChange}
                placeholder="Enter description"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Website</label>
            <input
                style={formStyles.input}
                type='text'
                name='website'
                value={website}
                onChange={this.handleChange}
                placeholder="Enter website URL"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Phone</label>
            <input
                style={formStyles.input}
                type='text'
                name='phone_number'
                value={phone_number}
                onChange={this.handleChange}
                placeholder="Enter phone number"
            />
            </div>

            <div style={formStyles.formGroup}>
              <label style={formStyles.label}>Logo Image</label>
              <input
                style={formStyles.fileInput}
                type='file'
                name='logo_image'
                onChange={this.handleChange}
              />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Email</label>
            <input
                style={formStyles.input}
                type='text'
                name='email'
                value={email}
                onChange={this.handleChange}
                placeholder="Enter email"
            />
            </div>

            <div style={formStyles.formGroup}>
            <label style={formStyles.label}>Active</label>
            <input
                style={formStyles.input}
                type='text'
                name='active'
                value={active}
                onChange={this.handleChange}
                placeholder="Enter active status"
            />
            </div>
          </div>
  
          <div style={formStyles.buttonGroup}>
            <button 
              type="button" 
              style={formStyles.cancelButton}
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={formStyles.submitButton}
            >
              Save Store
            </button>
          </div>
        
        </form>
        </div>
    );
  }
}
  
  const formStyles = {
    container: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
    },
    title: {
        margin: 0,
        color: '#2c3e50'
        },
        cancelButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#95a5a6',
        fontSize: '1.5em',
        cursor: 'pointer',
        padding: '0 10px',
        ':hover': {
            color: '#7f8c8d'
        }
        },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '15px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontSize: '0.9em',
      color: '#2c3e50',
      fontWeight: '600'
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #bdc3c7',
      fontSize: '1em',
      transition: 'border-color 0.2s',
      ':focus': {
        outline: 'none',
        borderColor: '#3498db',
        boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
      }
    },
    fileInput: {
      padding: '8px 0'
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1em',
      fontWeight: '600',
      transition: 'background-color 0.2s',
      alignSelf: 'flex-start',
      ':hover': {
        backgroundColor: '#2980b9'
      }
    }
  };
  
  export default StoreForm;