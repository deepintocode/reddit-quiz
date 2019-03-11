import fetch from 'node-fetch';

export const random = (array) => {
  Math.random() * array.length
}