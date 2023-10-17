import { useEffect, useRef, useState } from "react";
import ProductService from "../../service/product";
import Table from "../../components/Table";
import { PAGINATE } from "../../constant";
import CategoryService from "../../service/category";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [pagination, setPagination] = useState({
    limit: PAGINATE.limit,
    page: 1,
    totalDocs: 0,
    totalPages: 0,
  });

  const params = {
    skip: pagination.page == 1 ? 0 : pagination.page * pagination.limit,
    limit: PAGINATE.limit,
  };

  const paginationSetup = async (count, skip) => {
    const pageRemainders = count % pagination.limit;
    const total = (count - pageRemainders) / pagination.limit;
    const totalPages = pageRemainders != 0 ? total + 1 : total;
    const paginationNew = {
      ...pagination,
      totalPages: totalPages,
      totalDocs: count,
      page: 1,
    };
    if (skip != 0) {
      paginationNew.page = skip / PAGINATE.limit + 1;
    }
    await setPagination(() => {
      return paginationNew;
    });
  };

  const fetchData = async (params, skip) => {
    setIsLoading(true);
    try {
      if (category?.value) {
        params.skip = 0;
      }
      const response = category?.value
        ? await CategoryService.getProductsByCategory(params, category.value)
        : await ProductService.getAll(params);
      const { data } = response;
      if (data) {
        setProducts(data.products);
        paginationSetup(data.summary.count, skip);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(params, 0);
  }, [category]);
  return (
    <Table
      data={products}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      fetchData={fetchData}
      params={params}
      pagination={pagination}
      category={category}
      setCategory={setCategory}
    />
  );
}
