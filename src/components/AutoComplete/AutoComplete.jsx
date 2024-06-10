import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InfiniteScrollComponent from "../InfiniteScroll/InfiniteScrollComponent";
import axios from "axios";

const AutoCompleteComponent = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSizeLimit = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
      );
      setItems((prevItems) => [...prevItems, ...response.data]);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        if (nextPage > pageSizeLimit) {
          setHasMore(false);
        }
        return nextPage;
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-[400px]">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={items}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Posts" />}
        ListboxComponent={(props) => (
          <div {...props}>
            <InfiniteScrollComponent
              items={items}
              hasMore={hasMore}
              fetchData={fetchData}
            />
          </div>
        )}
      />
    </div>
  );
};

export default AutoCompleteComponent;
