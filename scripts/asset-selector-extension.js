/**
 * Function to extend the configurationsMap Map with additional block configurations.
 *
 * @param {Map} configurationsMap - The Map object that holds the block configurations.
 */
const extendBlocksNameConfig = (configurationsMap) => {
    // Add or modify block configurations as needed
    configurationsMap.set('video', 'Core Embed (vanilla)');
};

/**
 * Function to handle asset selection.
 *
 * This function is called when assets are selected in the AEM Assets Selector.
 *
 * @param {Array} selection - The array of selected assets.
 */
const extendHandleAssetSelection = (selection) => {
     if (selection.length) {
        if (selection.length > 1) {
            console.log('Selected multiple assets:', JSON.stringify(selection));
        } else {
            console.log('Selected single asset:', JSON.stringify(selection));
        }
    }
};

/**
 * Function to register the extension with the AEM Assets Selector library.
 * Checks if the library namespace exists and the registerExtension method is available,
 * then calls the library's registerExtension method to extend configurationsMap.
 * Logs a warning if the library namespace or method is not found.
 */
const registerAssetSelectorExtension = () => {
    // Check if the library namespace exists and the registerExtension method is available
    const { library: assetLibrary } = window?.aem?.assetsselector || {};
    if (assetLibrary?.registerExtension) {
        // Call the library's registerExtension method to extend configurationsMap
        assetLibrary.registerExtension(extendBlocksNameConfig, 'blocksNameConfig');

        // this is just for an illustration, it will not work. This extension is not implemented in the library.
        assetLibrary.registerExtension(extendHandleAssetSelection, 'onAssetSelected');
    } else {
        // Log a warning if the library namespace or method is not found
        console.warn('AEM Assets Selector extension library or registerExtension method not found. Extension registration skipped.');
    }
};

// Register the asset selector extension
registerAssetSelectorExtension();
