import './index.css'
import {ItemForm} from "./components/ItemForm.jsx";
import {ItemList} from "./components/ItemList.jsx";
import React, {useEffect} from "react";

function App() {
    useEffect (() => {
        document.title = "Items"
    }, []);

  return (
    <div className="container mx-auto">
		<ItemForm />
		<ItemList />
    </div>
  )
}

export default App;
