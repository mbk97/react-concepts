import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComponent = ({ items, hasMore, fetchData }) => {
  const containerRef = useRef(null);

  return (
    <div
      className="h-[150px] w-[100%] bg-[#e5e5e5] overflow-scroll"
      ref={containerRef}
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollThreshold={0.7}
        scrollableTarget="scrollableDiv"
        // !**  The scrollThreshold prop in the InfiniteScroll component is used to determine when the next function should be called while scrolling. It specifies the percentage of the height of the scrollable element at which the next function should trigger.For example, if scrollThreshold is set to 0.9, it means that the next function will be called when the user scrolls to within 90% of the bottom of the scrollable element.
        endMessage={
          !hasMore ? (
            <p className="my-5 text-center">This is the end of the list!!!</p>
          ) : null
        }
      >
        {items.map((item, index) => {
          return <h1 key={index}>{item.title}</h1>;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
