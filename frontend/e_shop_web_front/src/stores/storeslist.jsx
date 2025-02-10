// Import necessary libraries
import axios from 'axios';
import React, { Component } from 'react';
// StoreList Component
class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storesData: [] // Array to store the fetched list of stores
    };
  }

  // When the component mounts, fetch the store data.
  componentDidMount() {
    this.fetchStores();
  }

  // Fetches the list of stores from the API
  fetchStores = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_URL);
      this.setState({ storesData: response.data });
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Render method displays the list of stores
  render() {
    const { storesData } = this.state;

    return (
      <div style={styles.listContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>Store Directory</h1>
          <div style={styles.headerMeta}>
            <span style={styles.countBadge}>{storesData.length} Locations</span>
            <button 
                  style={styles.addButton}
                  onClick={() => this.props.onAddClick()}
                >
                  + Add New Store
            </button>
            <div style={styles.statusLegend}>
              <span style={styles.legendItemActive}>Active</span>
              <span style={styles.legendItemInactive}>Inactive</span>
            </div>
          </div>
        </header>

        <div style={styles.storeGrid}>
          {storesData.map((store) => (
            <article
              key={store.id}
              style={{
                ...styles.storeCard,
                backgroundColor: store.active ? '#f8fbf9' : '#fef6f5',
                borderColor: store.active ? '#d4ede0' : '#fadbd9',
              }}
              onClick={() => this.props.onItemClick(store)}
            >
              <div style={styles.cardHeader}>
                <h2 style={styles.storeName}>{store.name}</h2>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: store.active ? '#27ae60' : '#e74c3c',
                  }}
                >
                  {store.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.storeLocation}>
                    {store.city}, {store.state} {store.zip_code}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.storeContact}>{store.phone_number}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}



// Inline styles for the component
const styles = {
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
    padding: '40px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '40px',
    paddingBottom: '24px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
    letterSpacing: '-0.025em',
  },
  headerMeta: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  statusLegend: {
    display: 'flex',
    gap: '16px',
  },
  legendItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#27ae60',
    fontSize: '0.875rem',
  },
  legendItemInactive: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#e74c3c',
    fontSize: '0.875rem',
  },
  storeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  storeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #eee',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    // Note: Pseudo-classes like :hover must be implemented using CSS or a library
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  storeName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0',
    lineHeight: '1.3',
    flex: 1,
  },
  statusBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    marginLeft: '12px',
    flexShrink: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  icon: {
    width: '20px',
    height: '20px',
    fill: '#6b7280',
    flexShrink: 0,
  },
  storeLocation: {
    fontSize: '0.875rem',
    color: '#4b5563',
    lineHeight: '1.5',
  },
  storeContact: {
    fontSize: '0.875rem',
    color: '#4b5563',
    fontWeight: '500',
  },
};

export default StoreList;
