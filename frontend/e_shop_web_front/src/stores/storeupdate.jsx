import axios from 'axios';
import { Component } from 'react';

class StoreUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj_to_update: this.props.updateStore,
      name: this.props.updateStore.name,
      street: this.props.updateStore.street,
      city: this.props.updateStore.city,
      state: this.props.updateStore.state,
      zip_code: this.props.updateStore.zip_code,
      description: this.props.updateStore.description,
      website: this.props.updateStore.website,
      phone_number: this.props.updateStore.phone_number,
      logo_image: this.props.updateStore.logo_image,
      email: this.props.updateStore.email,
      active: this.props.updateStore.active
    };
  }

  handleChange = (event) => {
    const { name, type } = event.target;
    if (type === 'file') {
      this.setState({ [name]: event.target.files[0] });
    } else {
      this.setState({ [name]: event.target.value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  render() {
    const { name, city, state, street, zip_code, description, website, 
            phone_number, email, active, logo_image } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Update Store Details</h1>
        </div>

        <form onSubmit={this.handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            {/* Left Column */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Store Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter store name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={street}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter street address"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter city"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter state"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Zip Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={zip_code}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            {/* Right Column */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter contact email"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={phone_number}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter phone number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Website</label>
                <input
                  type="url"
                  name="website"
                  value={website}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="Enter website URL"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  name="active"
                  value={active}
                  onChange={this.handleChange}
                  style={styles.select}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Store Logo</label>
                <div style={styles.fileInputContainer}>
                  <input
                    type="file"
                    name="logo_image"
                    onChange={this.handleChange}
                    style={styles.fileInput}
                    accept="image/*"
                  />
                  <span style={styles.fileInputText}>
                    {logo_image?.name || 'Choose file...'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.fullWidthGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              style={styles.textarea}
              placeholder="Enter store description"
              rows="4"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  select: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    backgroundColor: 'white',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="%236B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '14px 8px',
  },
  fileInputContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  fileInput: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  fileInputText: {
    display: 'block',
    padding: '12px 16px',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    resize: 'vertical',
    minHeight: '100px',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  fullWidthGroup: {
    gridColumn: '1 / -1',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '16px',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },
  '@media (max-width: 480px)': {
    container: {
      padding: '24px',
      borderRadius: '0',
    },
    title: {
      fontSize: '1.5rem',
    },
    formGrid: {
      gap: '20px',
    },
  },
};

export default StoreUpdate;