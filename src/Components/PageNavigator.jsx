import React from "react";

function PageNavigator({ totalPages, setCurrentPages, currentPage }) {
  function renderBtn() {
    const btn = [];
    for (let i = 1; i <= totalPages; i++) {
      btn.push(
        <button onClick={()=>{
            setCurrentPages(i)
        }} className={`bg-blue-400 px-4 py-2 text-white rounded-lg ${i==currentPage ? 'bg-blue-600' : 'bg-blue-400'}`} key={i}>
          {i}
        </button>
      );
    }
    return btn;
  }

  return (
    <div className="flex items-center gap-4">
      <button 
      disabled={currentPage == 1}
      onClick={()=>{
        setCurrentPages((prev)=>{
            return prev > 1 ? currentPage - 1 : 1; 
        })
      }} className="bg-blue-400 px-4 py-2 rounded-lg disabled:opacity-50 text-white">
        ⏮️ Prev{" "}
      </button>
      {renderBtn()}
      <button disabled={currentPage == totalPages} onClick={()=>{
        setCurrentPages((prev)=>{
            return prev < totalPages ? currentPage + 1 : totalPages
        })
      }} className="bg-blue-400 px-4 py-2 rounded-lg disabled:opacity-50 text-white">
        Next ⏭️{" "}
      </button>
    </div>
  );
}

export default PageNavigator;
