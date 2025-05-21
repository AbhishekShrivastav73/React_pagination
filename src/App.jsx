import axios from "axios";
import React, { useEffect, useState } from "react";
import PageNavigator from "./Components/PageNavigator";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const dataPerPage = 4;
  const totalPages = Math.ceil(data.length / dataPerPage);

  useEffect(() => {
    // Fetch data once
    axios.get(`https://dummyjson.com/products`)
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  useEffect(() => {
    // Recalculate sliced data whenever page or data changes
    const lastIndex = dataPerPage * currentPage;
    const firstIndex = lastIndex - dataPerPage;
    const slicedData = data.slice(firstIndex, lastIndex);
    setCurrentData(slicedData);
  }, [currentPage, data]);

  return (
    <div className="flex p-4 flex-col items-center justify-center w-full">
      <h1 className="font-medium tracking-tight">React Pagination</h1>
      <h2 className="tracking-tight italic">E-commerce Cards</h2>
      
      <div className="w-full my-8 flex gap-3 justify-center items-center flex-wrap">
        {
          currentData.map((product) => (
            <div key={product.id} className="w-[24%] rounded-lg p-4 bg-zinc-200">
              <img src={product.thumbnail} alt={product.title} />
              <h6 className="font-medium text-sm">{product.title}</h6>
            </div>
          ))
        }
      </div>

      {
        totalPages > 1 && (
          <PageNavigator
            currentPage={currentPage}
            setCurrentPages={setCurrentPage}
            totalPages={totalPages}
          />
        )
      }
    </div>
  );
}

export default App;
