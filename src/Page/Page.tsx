import React, { useState } from 'react'
import Display from "../Components/Display/Display";
import Search from "../Components/Search/Search";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";


function Page() {
    const [input, setInput] = useState("");
    // console.log(input);
    return (
        <div className='d-flex justify-content-center flex-column'>
            <Header />
            <Search setInput={setInput} />
            <Display input={input} />
            <Footer />
        </div>
    )
}

export default Page
