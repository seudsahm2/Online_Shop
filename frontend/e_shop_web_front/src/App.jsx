import React, { Component } from 'react';
import ProductDetail from './products/productdetail';
import ProductForm from './products/productform';
import ProductList from './products/productslist';
import ProductUpdate from './products/productupdate';
import StoreDetail from './stores/storedetail';
import StoreForm from './stores/storeform';
import StoreList from './stores/storeslist';
import StoreUpdate from './stores/storeupdate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEntity: 'store', // Default to 'store'
      activeAction: 'list', // Default to 'list'
      selectedItem: null,
      parentItem: null, // For nested resources
      entityConfig: this.getEntityConfig(),
    };
  }

  getEntityConfig = () => ({
    store: {
      list: StoreList,
      detail: StoreDetail,
      create: StoreForm,
      update: StoreUpdate,
      getUrl: (action, params = {}) => {
        const baseUrl = import.meta.env.VITE_APP_URL; // From .env
        if (!baseUrl) {
          console.error("VITE_APP_URL is not defined in environment variables.");
          return null;
        }
        switch (action) {
          case 'list':
            return `${baseUrl}`;
          case 'detail':
            return `${baseUrl}${params.pk}/`;
          case 'create':
            return `${baseUrl}`; // POST to list endpoint
          case 'update':
            return `${baseUrl}${params.pk}/`;
          default:
            return null;
        }
      },
    },
    product: {
      list: ProductList,
      detail: ProductDetail,
      create: ProductForm,
      update: ProductUpdate,
      parent: 'store',
      getUrl: (action, params = {}) => {
        const storeBase = import.meta.env.VITE_APP_URL;
        if (!storeBase) {
          console.error("VITE_APP_URL is not defined in environment variables.");
          return null;
        }
        const baseUrl = `${storeBase}${params.store_pk}/products/`;

        switch (action) {
          case 'list':
            return baseUrl;
          case 'detail':
            return `${baseUrl}${params.pk}/`;
          case 'create':
            return baseUrl; // POST to list endpoint
          case 'update':
            return `${baseUrl}${params.pk}/`;
          default:
            return null;
        }
      },
    },
  });

  // Navigation handler
  navigateTo = (entityType, action = 'list', item = null, parentItem = null) => {
    if (!this.getEntityConfig()[entityType]) {
      console.error(`Invalid entity type: ${entityType}`);
      return;
    }

    this.setState({
      activeEntity: entityType,
      activeAction: action,
      selectedItem: item,
      parentItem: parentItem,
    });
  };

  // Handle back navigation
  handleBack = () => {
    const { activeEntity, parentItem } = this.state;

    if (parentItem) {
      this.navigateTo(this.getEntityConfig()[activeEntity].parent, 'list', null, null);
    } else {
      this.navigateTo('store', 'list'); // Default fallback to store list
    }
  };

  // Render the appropriate component based on state
  renderComponent() {
    const { activeEntity, activeAction, selectedItem, parentItem, entityConfig } =
      this.state;

    // Debugging log for current state
    console.log('Current State:', {
      activeEntity,
      activeAction,
      selectedItem,
      parentItem,
    });

    const config = entityConfig[activeEntity] || {};
    const Component = config[activeAction];

    if (!Component) {
      console.warn(
        `No component found for entity: ${activeEntity}, action: ${activeAction}`
      );
      return <div>Loading...</div>;
    }

    const urlBuilder = (action, params = {}) => {
      const baseParams =
        config.parent && parentItem
          ? { ...params, [`${config.parent}_pk`]: parentItem?.id }
          : params;
      const url = config.getUrl(action, baseParams);

      if (!url) {
        console.error(
          `Failed to generate URL for entity: ${activeEntity}, action: ${activeAction}, params:`,
          params
        );
      }

      return url;
    };

    const commonProps = {
      urlBuilder,
      parentItem,
      onBack: this.handleBack,
      onUpdate: (item) =>
        this.navigateTo(activeEntity, 'update', item, parentItem),
      onDelete: () => this.navigateTo(activeEntity, 'list', null, parentItem),
    };

    switch (activeAction) {
      case 'list':
        return (
          <Component
            {...commonProps}
            onItemClick={(item) => this.navigateTo(activeEntity, 'detail', item, parentItem)}
            onAddClick={() => this.navigateTo(activeEntity, 'create', null, parentItem)}
          />
        );

      case 'detail':
        const childEntities = {
          onShowProducts: (store) => this.navigateTo('product', 'list', null, store),
          onShowCategories: (store) =>
            this.navigateTo('category', 'list', null, store),
        };

        return (
          <Component
            {...commonProps}
            item={selectedItem}
            childEntities={childEntities}
          />
        );

      case 'create':
        return (
          <Component
            {...commonProps}
            onSuccess={(newItem) => {
              if (config.parent) {
                this.navigateTo(activeEntity, 'list', null, parentItem);
              } else {
                this.navigateTo(activeEntity, 'detail', newItem);
              }
            }}
          />
        );

      case 'update':
        return (
          <Component
            {...commonProps}
            item={selectedItem}
            onSuccess={(updatedItem) =>
              this.navigateTo(activeEntity, 'detail', updatedItem, parentItem)
            }
          />
        );

      default:
        console.error(`Invalid action: ${activeAction}`);
        return <div>Invalid view</div>;
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {this.renderComponent()}
      </div>
    );
  }
}

// Styles
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
};

export default App;