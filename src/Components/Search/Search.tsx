import React, { useState } from 'react'
import "./Search.css";
import { KeyboardEvent } from "react";

function Search(props: any) {

    const [input, setInput] = useState("");

    const keyPressed = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            sendData();

        }
    }

    const sendData = () => {
        props.setInput(input);
    }

    return (
        <>
            <div className='outer-div d-flex justify-content-center flex-wrap'>
                <div className="search-div form-floating">
                    <input className="form-control" id="floatingInput" onKeyPress={keyPressed} onChange={(e) => { setInput(e.target.value) }} />
                    <label htmlFor="floatingInput">Seacrh by City</label>
                </div>
                <button className='btn btn-dark search_button' onClick={sendData}>Search</button>
            </div>
        </>
    )
}

export default Search
