// C O N S T A N T S
import constants from '../constants/constants';
import ProductType from '../types/Product.type';

// I N S T A N C E
import axiosInstance from './instance';

/**
 * Fetches list (segment/page) of products
 * @param {number} skip Skip to a given ID
 * @param {number} limit Limit for maximum number of items to be fetched at once
 * @returns {Promise}
 */

async function fetchProducts(
  skip: number = 0,
  limit: number = constants.PRODUCT_API_LIMIT,
): Promise<{
  data: {
    products: ProductType[];
    total: number;
    skip: number;
    limit: number;
  };
}> {
  const url = new URL('/products');
  url.searchParams.append('limit', `${limit}`);
  if (skip) {
    url.searchParams.append('skip', `${skip}`);
  }
  return axiosInstance.get(`${url}`);
}

/**
 * Fetches details for a given product ID
 * @param {number | string | undefined} id Product ID
 * @returns {Promise}
 */
async function fetchProductById(
  id: number | string | undefined,
): Promise<{data: ProductType}> {
  if (id === undefined || id === null) {
    throw new Error('Product ID is invalid');
  }
  return axiosInstance.get(`/products/${id}`);
}

const apis = {
  fetchProducts,
  fetchProductById,
};

export default apis;
