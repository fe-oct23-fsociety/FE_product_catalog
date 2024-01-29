/* eslint-disable consistent-return */
import axios from 'axios';
import { apiRoutes } from './const/routes';

const getProductNameById = async (id: string | number) => {
  try {
    const response = await (await axios.get(`${apiRoutes.SHOW_PRODUCTS}/${id}`)).data;

    const productName = response.name;

    return productName;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return 'ok';
};

export const getRoutes = async (array: string[]) => {
  if (!array.length || !array) {
    return array;
  }

  const category = array[0];
  const normalizedCategory = category[0].toUpperCase() + category.slice(1);

  if (array.length === 1) {
    return [normalizedCategory];
  }

  const id = array[1];
  const productName = await getProductNameById(id);

  return [normalizedCategory, productName];
};
