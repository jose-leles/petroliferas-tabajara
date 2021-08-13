import React from 'react';


const Container = (props) => {
  return <div className="flex flex-row w-full">
      {props.fullSize ? <></> : <div className="w-1/6 " /> }
      <div className={props.fullSize? "w-full" : "w-4/6"}> 
        {props.children}
      </div>
      {props.fullSize ? <></> : <div className="w-1/6 " />  }
  </div>;
}

export default Container;