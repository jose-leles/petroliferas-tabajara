import React from 'react';


const Container = (props) => {
  return <div className="flex flex-row w-full">
      <div className="w-1/6 " />
      <div className="w-4/6 "> 
        {props.children}
      </div>
      <div className="w-1/6 " />
  </div>;
}

export default Container;