import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const pageSizeLimit = 10;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      );
      // Append new data to existing items
      setItems((prevItems) => [...prevItems, ...response.data]);
      setPage((page) => page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight &&
        page <= pageSizeLimit
      ) {
        fetchData();
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div
        className="h-[150px] w-[200px] bg-[#e5e5e5] overflow-scroll"
        ref={containerRef}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          //   hasMore={true}
          loader={<p>Loading...</p>}
          scrollThreshold={0.7}
          // !**  The scrollThreshold prop in the InfiniteScroll component is used to determine when the next function should be called while scrolling. It specifies the percentage of the height of the scrollable element at which the next function should trigger.For example, if scrollThreshold is set to 0.9, it means that the next function will be called when the user scrolls to within 90% of the bottom of the scrollable element.
          endMessage={
            <p className="my-5 text-center">This is the end of the list!!!</p>
          }
        >
          {items.map((item) => {
            return <h1 key={item.id}>{item.title}</h1>;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrollComponent;
