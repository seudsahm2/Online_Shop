import React, { Component } from 'react';

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    // No local state is needed for toggling the update view
    console.log("StoreDetail initialized with props:", props);
  }

  render() {
    console.log("StoreDetail received props:", this.props);
    const store = this.props.item;
    if (!store) {
      console.log("StoreDetail: store data not available, rendering Loading...");
      return <div style={detailStyles.loading}>Loading...</div>;
    }

    console.log("Rendering StoreDetail with store:", store);
    return (
      <div style={detailStyles.container}>
        {/* Header Section */}
        <div style={detailStyles.header}>
          <h1 style={detailStyles.title}>{store.name}</h1>
          <button 
              style={detailStyles.addButton}
              onClick={() => this.props.onListClick("product",store)}
            >
              Products
            </button>
          <button style={detailStyles.backButton} onClick={this.props.onBack}>
            Back
          </button>
        </div>

        {/* Store Details Section */}
        <div style={detailStyles.content}>
          <div style={detailStyles.section}>
            <h2 style={detailStyles.sectionTitle}>Description</h2>
            <p style={detailStyles.detailItem}>
              {store.description || 'No description provided'}
            </p>
          </div>

          <div style={detailStyles.section}>
            <h2 style={detailStyles.sectionTitle}>Contact Information</h2>
            <p style={detailStyles.detailItem}>
              <span style={detailStyles.label}>Phone:</span>{' '}
              {store.phone_number || 'N/A'}
            </p>
            <p style={detailStyles.detailItem}>
              <span style={detailStyles.label}>Email:</span>{' '}
              {store.email || 'N/A'}
            </p>
            <p style={detailStyles.detailItem}>
              <span style={detailStyles.label}>Website:</span>{' '}
              {store.website ? (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={detailStyles.link}
                >
                  {store.website}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          </div>

          <div style={detailStyles.section}>
            <h2 style={detailStyles.sectionTitle}>Address</h2>
            <p style={detailStyles.detailItem}>
              {store.street}, {store.city}, {store.state} {store.zip_code || 'N/A'}
            </p>
          </div>

          <div style={detailStyles.section}>
            <h2 style={detailStyles.sectionTitle}>Logo Image</h2>
            {store.logo_image ? (
              <img
                src={store.logo_image}
                alt={`${store.name} Logo`}
                style={detailStyles.logoImage}
              />
            ) : (
              <p style={detailStyles.noLogo}>No Logo Available</p>
            )}
          </div>

          <div style={detailStyles.section}>
            <h2 style={detailStyles.sectionTitle}>Status</h2>
            <p style={detailStyles.status}>
              {store.active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Button Group */}
        <div style={detailStyles.buttonGroup}>
          <button
            style={detailStyles.updateButton}
            onClick={() => this.props.onUpdateClick(store)}
          >
            Update Store
          </button>
          <button style={detailStyles.deleteButton} onClick={()=>this.props.onDeleteClick(store)}>
            Delete Store
          </button>
        </div>
      </div>
    );
  }
}

// Inline styles for StoreDetail
const detailStyles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    borderBottom: '1px solid #ecf0f1',
    paddingBottom: '20px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#2c3e50',
    fontSize: '1.5em',
    margin: '0 0 8px 0',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  section: {
    padding: '15px',
    border: '1px solid #ecf0f1',
    borderRadius: '8px',
  },
  sectionTitle: {
    color: '#3498db',
    margin: '0 0 15px 0',
    fontSize: '1.1em',
  },
  detailItem: {
    color: '#34495e',
    margin: '0 0 10px 0',
    lineHeight: '1.5',
  },
  label: {
    fontWeight: '600',
    marginRight: '8px',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '25px',
  },
  updateButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  backButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  logoImage: {
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '2px solid #ecf0f1',
    margin: '10px 0',
  },
  noLogo: {
    color: '#7f8c8d',
    fontSize: '0.9em',
    textAlign: 'center',
  },
  status: {
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.9em',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2em',
    color: '#7f8c8d',
  },
};

export default StoreDetail;
