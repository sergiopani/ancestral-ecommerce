import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import products from '../../utils/data/products';
import { env } from 'process';

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  //Hacer fetch a la api de printful para recuperar los productos
  console.log("Haciendo la request a la api de printful")
  const API_KEY = env.PRINTFUL_API_KEY;

  const url = 'https://api.printful.com/store/products';

  const options = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${API_KEY}`
      }
  };
  
  fetch(url, options)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Productos obtenidos:', data);
          const finalProducts = data.result.map(product => {
            return {
              id: product.id,
              name: product.name,
              price: 119.99,
              discount: 30,
              quantityAvailable: 2,
              category: 'T-shirt',
              currentPrice: 89.99,
              sizes: ['xl', 'l'], 
              colors: ['#000', '6F3E18', '#D4BE8D', '#FFF'],
              images: [
                product.thumbnail_url,
              ],
              punctuation: {
                countOpinions: 81,
                punctuation: 4.5,
                votes: [
                  {
                    value: 1,
                    count: 1
                  },
                  {
                    value: 2,
                    count: 10
                  },
                  {
                    value: 3,
                    count: 10
                  },
                  {
                    value: 4,
                    count: 20
                  },
                  {
                    value: 5,
                    count: 40
                  },
                ]
              },
              reviews: [
                {
                  name: 'John Doe',
                  avatar: '/images/featured-1.jpg',
                  description: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>',
                  punctuation: 2
                },
                {
                  name: 'John Doe',
                  avatar: '/images/featured-1.jpg',
                  description: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>',
                  punctuation: 4
                },
                {
                  name: 'John Doe',
                  avatar: '/images/featured-1.jpg',
                  description: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</p>',
                  punctuation: 5
                },
              ]
            }
          })
          res.status(200).json(finalProducts);
      })
      .catch(error => {
          console.error('Error al obtener productos:', error);
      });


  // // fake loading time
  // setTimeout(() => {
  //   res.status(200).json(products);
  // }, 800);
}
