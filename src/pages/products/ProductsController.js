import React from "react";
import { useState } from "react";
import ProductsView from "./ProductsView";

export default function ProductsController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    return(
        <ProductsView 
            showProcessing={showProcessing}
            message={message}
        />
    )
}