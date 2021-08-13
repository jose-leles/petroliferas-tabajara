import React from 'react';


const Footer = (props) => {
  return <footer className={"flex bg-gray-700 h-16 w-full p-1 shadow items-center" + (props.absolute? "absolute bottom-0": "")}>
        <div className="text-center text-gray-50 mx-auto">Copyright © Tabajara Companies - {new Date().getFullYear()} </div>
    </footer>;
}

export default Footer;