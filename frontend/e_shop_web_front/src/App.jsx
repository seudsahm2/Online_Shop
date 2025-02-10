// App.jsx
import React, { Component } from 'react';

// Import all the components for CRUD operations for each entity
import ProductDetail from './products/productdetail';
import ProductForm from './products/productform';
import ProductList from './products/productslist';
import ProductUpdate from './products/productupdate';
import StoreDetail from './stores/storedetail';
import StoreForm from './stores/storeform';
import StoreList from './stores/storeslist';
import StoreUpdate from './stores/storeupdate';
import Header from './Header';
import axios from 'axios'; // Import axios for API calls

class App extends Component {
  constructor(props) {
    super(props);
    // Set initial state: default to store list view
    this.state = {
      activeEntity: 'store',    // e.g. "store", "product", etc.
      activeAction: 'list',     // e.g. "list", "detail", "create", "update",
      item:null,
      selectedItem: null,       // The currently selected item (for detail/update)
      parentItem: null,         // For nested resources, like product inside a store
      // Pre-build the entity configuration mapping
      entityConfig: this.getEntityConfig(),
    };
    console.log("App initialized with state:", this.state);
  }

  // Define the configuration for each entity.
  // Each entity maps actions (list, detail, create, update) to components
  // and provides a helper function to build API URLs.
  getEntityConfig = () => ({
    store: {
      list: StoreList,
      detail: StoreDetail,
      create: StoreForm,
      update: StoreUpdate,
      // Function to build URLs dynamically for the store entity
      getUrl: (action, params = {}) => {
        const baseUrl = import.meta.env.VITE_APP_URL;
        if (!baseUrl) {
          console.error("VITE_APP_URL is not defined in environment variables.");
          return null;
        }
        switch (action) {
          case 'list':
            return `${baseUrl}`;
          case 'create':
            return `${baseUrl}`;
          case 'detail':
            return `${baseUrl}${params.pk}/`;
          case 'delete':
            return `${baseUrl}${params.pk}/`;
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
      // Indicates that product is nested under store
      parent: 'store',
      getUrl: (action, params) => {
        const storeBase = import.meta.env.VITE_APP_URL;
        if (!storeBase) {
          console.error("VITE_APP_URL is not defined in environment variables.");
          return null;
        }
        // Build URL based on parent store_pk and product id (pk)
        const baseUrl = `${storeBase}${params.id}/products/`;
        switch (action) {
          case 'list':
            return baseUrl;
          case 'create':
            return baseUrl;
          case 'detail':
            return `${baseUrl}${params.pk}/`;
          case 'delete':
            return `${baseUrl}${params.pk}/`;
          case 'update':
            return `${baseUrl}${params.pk}/`;
          default:
            return null;
        }
      },
    },
  });

  // Generic navigation handler that updates the parent state.
  // It receives the entity type, action, selected item, and optionally a parent item.
  navigateTo = (entityType, action = 'list', item = null, parentItem = null) => {
    console.log(`Navigating to ${entityType} ${action}`, { item, parentItem });
    if (!this.getEntityConfig()[entityType]) {
      console.error(`Invalid entity type: ${entityType}`);
      return;
    }
    this.setState(
      {
        activeEntity: entityType,
        activeAction: action,
        selectedItem: item,
        parentItem: parentItem,
        item: item
      },
      () => {
        console.log("State updated to:", this.state);
      }
    );
  };

  // Handler to go back in the navigation.
  // If there is a parent item (for nested resources), we navigate to the parent's list.
  // Otherwise, we default to the store list view.
  handleBack = () => {
    const { activeEntity, parentItem } = this.state;
    console.log("Handling back navigation:", { activeEntity, parentItem });
    if (parentItem && this.getEntityConfig()[activeEntity].parent) {
      this.navigateTo(this.getEntityConfig()[activeEntity].parent, 'list', null, null);
    } else {
      this.navigateTo('store', 'list');
    }
  };

  handleCreate = (url,formData) => {
    const {activeEntity, entityConfig} = this.state;
    const config = entityConfig[activeEntity];
    if (!config) {
      console.error("No configuration found for entity:", activeEntity);
      return;
    }
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        this.setState({
          selectedItem: response.data,
          activeAction: 'list',
          // parentItem: parentItem,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleList = async(entiyToOpen,parent) => {
    const { activeEntity,entityConfig, parentItem } = this.state;
    const config = entityConfig[entiyToOpen];
    console.log("config is : ",config)
    if (!config) {
      console.error("No configuration found for entity:", activeEntity);
      return;
    }
    
    const url = config.getUrl('list',parent)
    console.log(url)
    await axios.get(url)
    .then((response)=>{
      console.log("list function called and response received")
      this.navigateTo(entiyToOpen,'list',response.data,parentItem)

    })
    .catch((error)=>{
      console.log(error)
    })

  }

  // Generic function to fetch detail data for the current entity using axios.
  // It uses the entity's getUrl function (for 'detail') to build the API URL.
  handleItemClick = (item, parentItem = null) => {
    const { activeEntity, entityConfig } = this.state;
    const config = entityConfig[activeEntity];
    if (!config) {
      console.error("No configuration found for entity:", activeEntity);
      return;
    }
    // Build parameters for the URL. We assume the unique identifier is in item.id.
    const params = { pk: item.id };
    if (config.parent && parentItem) {
      params[`${config.parent}_pk`] = parentItem.id;
    }
    const url = config.getUrl('detail', params);
    if (!url) {
      console.error("Could not build detail URL for", item);
      return;
    }
    // Use axios to fetch the detail data from the backend.
    axios
      .get(url)
      .then((response) => {
        // Once data is received, update the state to show the detail view.
        this.setState({
          selectedItem: response.data,
          activeAction: 'detail',
          parentItem: parentItem,
        });
      })
      .catch((error) => {
        console.error("Error fetching detail data:", error);
      });
  };

  handleUpdateClick = (item, parentItem = null) => {
    const { activeEntity, entityConfig } = this.state;
    const config = entityConfig[activeEntity];
    if (!config) {
      console.error("No configuration found for entity:", activeEntity);
      return;
    }
    // Build parameters for the URL. We assume the unique identifier is in item.id.
    const params = { pk: item.id };
    if (config.parent && parentItem) {
      params[`${config.parent}_pk`] = parentItem.id;
    }
    const url = config.getUrl('update', params);
    if (!url) {
      console.error("Could not build update URL for", item);
      return;
    }
    // Use axios to fetch the detail data from the backend.
    axios
      .get(url)
      .then((response) => {
        // Once data is received, update the state to show the detail view.
        this.setState({
          selectedItem: response.data,
          activeAction: 'update',
          parentItem: parentItem,
        });
      })
      .catch((error) => {
        console.error("Error fetching update data:", error);
      });
  };

  handleUpdate(obj_to_update,formData,parentItem){
    console.log("url : ",obj_to_update.update)
    axios.patch(obj_to_update.update, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((response) => {
      console.log("the patch axios is called and response is received")
      this.setState({
        selectedItem:response.data,
        activeAction:'list',
        parentItem:parentItem
      })
    })
    .catch(error => console.log(error));
  }

  handleDeleteClick = (item, parentItem = null) => {
    const { activeEntity, entityConfig } = this.state;
    const config = entityConfig[activeEntity];
    if (!config) {
      console.error("No configuration found for entity:", activeEntity);
      return;
    }
    // Build parameters for the URL. We assume the unique identifier is in item.id.
    const params = { pk: item.id };
    if (config.parent && parentItem) {
      params[`${config.parent}_pk`] = parentItem.id;
    }
    const url = config.getUrl('delete', params);
    if (!url) {
      console.error("Could not build delete URL for", item);
      return;
    }
    // Use axios to fetch the detail data from the backend.
    axios
      .delete(url)
      .then((response) => {
        // Once data is received, update the state to show the detail view.
        this.setState({
          selectedItem: response.data,
          activeAction: 'list',
          parentItem: parentItem,
        });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };


  // The renderComponent method dynamically determines which component to display
  // based on the current activeEntity and activeAction.
  renderComponent() {
    const { activeEntity, activeAction, selectedItem, parentItem, entityConfig,item } = this.state;
    console.log('Current State in renderComponent:', { activeEntity, activeAction, selectedItem, parentItem });
    const config = entityConfig[activeEntity] || {};
    const Component = config[activeAction];
    if (!Component) {
      console.warn(`No component found for entity: ${activeEntity}, action: ${activeAction}`);
      return <div>Loading...</div>;
    }
    // Helper function to build URLs for API calls
    const urlBuilder = (action, params = {}) => {
      const baseParams =
        config.parent && parentItem
          ? { ...params, [`${config.parent}_pk`]: parentItem?.id }
          : params;
      const url = config.getUrl(action, baseParams);
      if (!url) {
        console.error(`Failed to generate URL for entity: ${activeEntity}, action: ${activeAction}`, params);
      }
      return url;
    };
    // Common props passed to every child component
    const commonProps = {
      item:this.state.item,
      urlBuilder,
      parentItem,
      onBack: this.handleBack,   
      onSuccess:(newItem) => {
        if (config.parent) {
          this.navigateTo(activeEntity, 'list', this.selectedItem, parentItem);
        } else {
          this.navigateTo(activeEntity, 'detail', newItem);
        }
      },
      onCancel:()=>{
        if (config.parent) {
          this.navigateTo(activeEntity, 'list', this.selectedItem, parentItem);
        } else {
          this.navigateTo(activeEntity, 'list',this.selectedItem);
        }
      },
      onAddClick:() => this.navigateTo(activeEntity, 'create', null, parentItem),
      onCreate:(url,formData)=>{
        this.handleCreate(url,formData)
      },
      onListClick:(entiyToOpen,parent=null) => {
        console.log("item listed")
        this.handleList(entiyToOpen,parent)
      },
      onItemClick:(item) => {
        console.log("List item clicked:", item);
        this.handleItemClick(item, parentItem);
      },
      onUpdateClick : (item)=>{
        console.log("update button is clickd")
        this.handleUpdateClick(item,parentItem)
      },
      onUpdate:(obj_to_update,formData,parent)=>{
        console.log("inside app.js")
        this.handleUpdate(obj_to_update,formData,parent);
      },
      onDeleteClick:(deletedItem)=>{
        console.log("delete item",deletedItem);
        this.handleDeleteClick(deletedItem,parentItem)
      },
      onDelete: () => this.navigateTo(activeEntity, 'list', null, parentItem),
      onLoad:()=> this.navigateTo(activeEntity,"list",null,null)
    };
    // Render based on activeAction
    switch (activeAction) {
      case 'list':
        return (
          <Component
            {...commonProps}
          />
        );
      case 'detail': {
        const childEntities = {
          onShowProducts: (store) => this.navigateTo('product', 'list', null, store),
          onShowCategories: (store) => this.navigateTo('category', 'list', null, store),
        };
        return (
          <Component
            {...commonProps}
            item={selectedItem}
            childEntities={childEntities}
          />

        );
      }
      case 'create':
        return (
          <Component
            {...commonProps}
          />
        );
      case 'update':
        console.log("Rendering update component for:", selectedItem);
        return (
          <Component
            {...commonProps}
            item={selectedItem}
            onSuccess={(updatedItem) => {
              console.log("Update success with item:", updatedItem);
              this.navigateTo(activeEntity, 'detail', updatedItem, parentItem);
            }}
            onCancel={()=>{
              if (config.parent) {
                this.navigateTo(activeEntity, 'list', this.selectedItem, parentItem);
              } else {
                this.navigateTo(activeEntity, 'list',this.selectedItem);
              }
            }}
          />
        );
      default:
        console.error(`Invalid action: ${activeAction}`);
        return <div>Invalid view</div>;
    }
  }

  // Main render method displays the currently active component
  render() {
    return (
      <div style={styles.container}>
        <Header />
        {this.renderComponent()}
      </div>
    );
  }
}

// Inline styles for the App container
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
