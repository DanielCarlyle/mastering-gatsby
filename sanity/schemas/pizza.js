//React Material Design Icon Set Built in
import { MdLocalPizza as icon } from 'react-icons/md';

import PriceInput from '../components/PriceInput';

export default {
  //Computer name
  name: 'pizza',
 //visible type
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'name',
    maxLength: 100,
   },
  },
{
  name: 'image',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
 },
 {
  name: 'price',
  title: 'Price',
  type: 'number',
  description: 'Price of the pizza in cents',
  validation: Rule => Rule.min(1000),
  inputComponent: PriceInput,
},
{
  name: 'toppings',
  title: 'Toppings',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'topping' }] }],
},
],
preview: {
  select: {
    title: 'name',
    media: 'image',
    topping0: 'toppings.0.name',
    topping1: 'toppings.1.name',
    topping2: 'toppings.2.name',
    topping3: 'toppings.3.name',
  },
  //Destructure the variables
  //Use .. to capture the rest of the arguments - anything destructured, add after
  prepare: ({ title, media, ...toppings}) => {
    //1. Filter undefined toppings out
    const tops = Object.values(toppings).filter(Boolean);
    //2. Return the preview object for the Pizza
    //console.log(fields);
    return {
      title,
      media,
      subtitle: tops.join(', '),
    };
  },
},
};