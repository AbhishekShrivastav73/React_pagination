import axios from "axios";
import React, { useEffect, useState } from "react";
import PageNavigator from "./Components/PageNavigator";

function App() {
  const [data, setData] = useState([]);
  const [currentPage,setCurrentPages] = useState(1);
  const [currentData,setCurrentData] = useState([])


  let dataPerPages = 4;
  let totalPages =  Math.ceil(data.length / dataPerPages);

  console.log(totalPages);
  console.log('currenct' , currentPage);

  let lastIndex = dataPerPages * currentPage; 
  let fisrtIndex = lastIndex - dataPerPages;

  let content = data.slice(fisrtIndex,lastIndex)
  console.log(content);
  
  
  useEffect(()=>{
    setCurrentData(()=>data.slice(fisrtIndex,lastIndex))
  },[currentPage])

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`).then((res) => {
      console.log(res.data.products);
      setData(res.data.products)
    });
    data && setCurrentData(()=>data.slice(fisrtIndex,lastIndex))
  }, []);

  return <div className="flex p-4 flex-col items-center justify-center w-full">
      <h1 className="font-medium tracking-tight">React Pagination</h1>
      <h2 className="tracking-tight italic">E-commerce Cards</h2>
      <div className="w-full my-8 flex gap-3 justify-center items-center flex-wrap">
          {
            currentData.map((product,idx)=>{
              return (
                <div className="w-[24%] rounded-lg p-4 bg-zinc-200">
                  <img src={product.thumbnail} alt="" />
                  <h6 className="font-medium text-sm">{product.title}</h6>
                </div>
              )
            })
          }
      </div>
      {totalPages && <PageNavigator currentPage={currentPage} setCurrentPages={setCurrentPages} totalPages={totalPages} />}
  </div>;
}

export default App;
