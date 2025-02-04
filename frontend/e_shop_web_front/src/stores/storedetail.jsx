import axios from 'axios';
import React, { Component } from 'react';

class StoreDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateStoreDetails = this.updateStoreDetails.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }

    updateStoreDetails() {
        if (this.props.onUpdate) {
            this.props.onUpdate(); // Notify parent to switch to 'update' view
        }
    }

    deleteStore(store) {
        axios.delete(store.delete)
            .then((response) => {
                console.log(response);
                if (this.props.onBack) this.props.onBack(); // Go back to list view after deletion
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this store?')) {
            this.deleteStore(this.props.store);
        }
    };

    render() {
        const store = this.props.store;

        return (
            <div style={detailStyles.container}>
                <div style={detailStyles.header}>
                    <h1 style={detailStyles.title}>{store.name}</h1>
                    <button style={detailStyles.backButton} onClick={this.props.onBack}>
                        Back
                    </button>
                </div>

                {/* Logo Section */}
                <div style={detailStyles.logoSection}>
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

                <div style={detailStyles.content}>
                    {/* Description Section */}
                    <div style={detailStyles.section}>
                        <h2 style={detailStyles.sectionTitle}>Description</h2>
                        <p style={detailStyles.detailItem}>{store.description || 'No description provided'}</p>
                    </div>

                    {/* Contact Information Section */}
                    <div style={detailStyles.section}>
                        <h2 style={detailStyles.sectionTitle}>Contact Information</h2>
                        <p style={detailStyles.detailItem}>
                            <span style={detailStyles.label}>Phone:</span> {store.phone_number || 'N/A'}
                        </p>
                        <p style={detailStyles.detailItem}>
                            <span style={detailStyles.label}>Email:</span> {store.email || 'N/A'}
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

                    {/* Address Section */}
                    <div style={detailStyles.section}>
                        <h2 style={detailStyles.sectionTitle}>Address</h2>
                        <p style={detailStyles.detailItem}>
                            {store.street}, {store.city}, {store.state} {store.zip_code || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Button Group */}
                <div style={detailStyles.buttonGroup}>
                    <button style={detailStyles.updateButton} onClick={this.updateStoreDetails}>
                        Update Store
                    </button>
                    <button style={detailStyles.deleteButton} onClick={this.handleDelete}>
                        Delete Store
                    </button>
                </div>
            </div>
        );
    }
}

// Styles (unchanged)
const detailStyles = {
    container: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Inter', sans-serif",
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
        fontSize: '2rem',
        fontWeight: '700',
        margin: '0 0 8px 0',
    },
    logoSection: {
        textAlign: 'center',
        marginBottom: '25px',
    },
    logoImage: {
        maxWidth: '150px',
        maxHeight: '150px',
        borderRadius: '8px',
        objectFit: 'cover',
        border: '2px solid #ecf0f1',
    },
    noLogo: {
        color: '#7f8c8d',
        fontSize: '1rem',
        fontWeight: '500',
    },
    content: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '30px',
    },
    section: {
        padding: '20px',
        border: '1px solid #ecf0f1',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
    },
    sectionTitle: {
        color: '#3498db',
        fontSize: '1.2rem',
        fontWeight: '600',
        margin: '0 0 15px 0',
    },
    detailItem: {
        color: '#34495e',
        fontSize: '1rem',
        margin: '0 0 10px 0',
        lineHeight: '1.5',
    },
    label: {
        fontWeight: '600',
        marginRight: '8px',
        color: '#555',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
        },
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '25px',
    },
    updateButton: {
        backgroundColor: '#3498db',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#2980b9',
        },
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#c0392b',
        },
    },
    backButton: {
        backgroundColor: '#95a5a6',
        color: '#ffffff',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#7f8c8d',
        },
    },
};

export default StoreDetail;