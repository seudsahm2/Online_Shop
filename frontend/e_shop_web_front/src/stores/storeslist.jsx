import axios from 'axios';
import React, { Component } from 'react';
import StoreDetail from './storedetail';

class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storesData: [], // List of stores fetched initially
      currentView: 'list', // Possible values: 'list', 'detail'
      selectedStore: null, // Detailed store object
    };
  }

  componentDidMount() {
    this.fetchStores();
  }

  // Fetch the list of stores
  fetchStores = () => {
    axios
      .get(import.meta.env.VITE_APP_URL)
      .then((response) => {
        this.setState({ storesData: response.data });
      })
      .catch((error) => console.error(error));
  };

  // Fetch detailed data for a specific store
  getStoreDetail = (item) => {
    axios
      .get(item.absolute_url) // Assuming `absolute_url` points to the store detail endpoint
      .then((response) => {
        this.setState({
          selectedStore: response.data, // Update selected store with detailed data
          currentView: 'detail', // Switch to detail view
        });
      })
      .catch((error) => console.error(error));
  };

  // Show store detail view
  showStoreDetail = (item) => {
    if (item.absolute_url) {
      this.getStoreDetail(item); // Fetch detailed data
    } else {
      console.error('Missing absolute_url for store:', item);
    }
  };

  // Go back to the list view
  handleBack = () => {
    this.setState({ currentView: 'list', selectedStore: null });
  };

  renderView() {
    const { currentView, selectedStore, storesData } = this.state;

    // Render the appropriate view based on currentView state
    if (currentView === 'detail') {
      return (
        <StoreDetail
          store={selectedStore} // Pass the selected store to StoreDetail
          onBack={this.handleBack} // Allow navigation back to the list view
        />
      );
    }

    // Default to rendering the list view
    return (
      <div style={styles.listContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>Store Directory</h1>
          <div style={styles.headerMeta}>
            <span style={styles.countBadge}>
              {storesData.length} Locations
            </span>
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
              onClick={() => this.showStoreDetail(store)} // Navigate to detail view when clicked
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
                  <svg style={styles.icon} viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span style={styles.storeLocation}>
                    {store.city}, {store.state} {store.zip_code}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <svg style={styles.icon} viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span style={styles.storeContact}>{store.phone_number}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return <main style={styles.container}>{this.renderView()}</main>;
  }
}

// Styles
const styles = {
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
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
    '::before': {
      content: '""',
      display: 'block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#27ae60',
    },
  },
  legendItemInactive: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#e74c3c',
    fontSize: '0.875rem',
    '::before': {
      content: '""',
      display: 'block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#e74c3c',
    },
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
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    },
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