import React, { Component } from 'react';
import StoreDetail from './stores/storedetail';
import StoreForm from './stores/storeform';
import StoreList from './stores/storeslist';
import StoreUpdate from './stores/storeupdate';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'list', // Possible values: 'list', 'detail', 'update'
      selectedStore: null,
    };
  }

  // Navigate back to the previous view
  handleBack = () => {
    if (this.state.currentView === 'update') {
      this.setState({ currentView: 'detail' }); // Go back to detail view
    } else {
      this.setState({ currentView: 'list', selectedStore: null }); // Go back to list view
    }
  };

  // Show store detail view
  showStoreDetail = (store) => {
    this.setState({ currentView: 'detail', selectedStore: store });
  };

  showStoreForm = () => {
    this.setState({ currentView: 'form', selectedStore: null });
  };

  renderView() {
    const { currentView, selectedStore } = this.state;

    switch (currentView) {
      case 'detail':
        return (
          <StoreDetail
            store={selectedStore}
            onBack={this.handleBack}
            onUpdate={() => this.setState({ currentView: 'update' })}
          />
        );

      case 'update':
        return (
          <StoreUpdate
            updateStore={selectedStore}
            onSuccess={() => this.setState({ currentView: 'detail' })}
          />
        );

      case 'form':
        return (
          <StoreForm
            onCancel={this.handleBack}
            onSuccess={this.handleBack}
          />
        );

      default:
        return (
          <StoreList
            onStoreClick={(store) => this.showStoreDetail(store)}
            onAddClick={this.showStoreForm} // Pass the onAddClick handler
          />
        );
    }
  }

  render() {
    return <main style={styles.container}>{this.renderView()}</main>;
  }
}
const styles = {
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
};

export default App;