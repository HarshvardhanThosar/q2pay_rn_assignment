import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import apis from '../apis/apis';
import constants from '../constants/constants';

function useProductListing() {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['product-isting'],
    queryFn: async function ({pageParam}) {
      const {data: responseData} = await apis.fetchProducts(pageParam);
      return responseData;
    },
    getNextPageParam: lastPage => {
      const _newSkip = lastPage.skip + constants.PRODUCT_API_LIMIT;
      if (_newSkip > lastPage.total) {
        return false;
      }
      return _newSkip;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });
  return {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
  };
}

function useProductDetails(id: number | string | undefined) {
  const {isLoading, isFetching, isError, data, error, refetch, isRefetching} =
    useQuery({
      queryKey: [`product-details-${id}`],
      queryFn: async function () {
        const {data: responseData} = await apis.fetchProductById(id);
        return responseData;
      },
      staleTime: Infinity,
    });
  return {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    refetch,
    isRefetching,
  };
}

export {useProductListing, useProductDetails};
