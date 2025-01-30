// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Product
 * @dev Stores multiple Product records with the specified fields.
 */
contract ProductContract {
    struct Product {
        string bizStep;        
        string disposition;
        string bizTransaction;        
        string readPoint;
        string epc;
        string eventTime; 
        string eventTimeZoneOffset;
    }

    Product[] private products;

    event ProductCreated(
        uint256 indexed index,
        string bizStep,
        string disposition,
        string bizTransaction,
        string readPoint,
        string epc,
        string eventTime,
        string eventTimeZoneOffset
    );

    /**
     * @dev Adds a new product to the contract.
     * @param _bizStep The bizStep (e.g., "commissioning")
     * @param _disposition The product's disposition (e.g., "active")
     * @param _bizTransaction The business transaction info
     * @param _readPoint A reference to a read point (e.g., location)
     * @param _epc The product's EPC (e.g., "urn:epc:id:sgtin:...")
     * @param _eventTime A unix timestamp for when the event happened
     * @param _eventTimeZoneOffset A string describing the time zone offset (e.g. "+02:00")
     */
    function addProduct(
        string memory _bizStep,
        string memory _disposition,
        string memory _bizTransaction,
        string memory _readPoint,
        string memory _epc,
        string memory _eventTime,
        string memory _eventTimeZoneOffset
    ) public {
        Product memory newProduct = Product({
            bizStep: _bizStep,
            disposition: _disposition,
            bizTransaction: _bizTransaction,
            readPoint: _readPoint,
            epc: _epc,
            eventTime: _eventTime,
            eventTimeZoneOffset: _eventTimeZoneOffset
        });

        products.push(newProduct);

        emit ProductCreated(
            products.length - 1,
            _bizStep,
            _disposition,
            _bizTransaction,
            _readPoint,
            _epc,
            _eventTime,
            _eventTimeZoneOffset
        );
    }

    /**
     * @dev Gets a product by index.
     * @param index The array index of the product (0-based)
     */
    function getProduct(uint256 index) public view returns (Product memory) {
        require(index < products.length, "Invalid product index");
        return products[index];
    }

    /**
     * @dev Returns the entire array of products.
     */
    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    /**
     * @dev Returns the current count of products stored.
     */
    function getProductsCount() public view returns (uint256) {
        return products.length;
    }
}