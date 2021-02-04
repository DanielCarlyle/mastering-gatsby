import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-tempate-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white:
      padding: 2px 5px;
    }
    &.active{
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  //console.log(pizzas);
  //return the pizzas with counts
  const counts = pizzas
  .map((pizza) => pizza.toppings)
  .flat()
  .reduce((acc, topping) => {
    // check if this is an existing topping
    const existingTopping = acc[topping.id];
    if(existingTopping) {
      //if it is, increment by 1
      existingTopping.count += 1;
    } else {
      //otherwise create a new entry in our acc and set it to components
      acc[topping.id] = {
        id: topping.id,
        name: topping.name,
        count: 1,
      };
    }
    return acc;
  }, {});
  //Sort Pizzas descending based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  //Get a list of all the Toppings
  //Get a list of all the Pizzas with their Toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
   toppings: allSanityTopping {
     nodes {
       name
       id
       vegetarian
     }
   }
  pizzas: allSanityPizza {
  nodes {
    toppings {
      name
      id
      }
     }
    }
 }
 `);
 console.clear();
 //console.log({toppings, pizzas});
 //Get a list of all the Pizzas with their Toppings
 //Count how many Pizzas are in each Topping
 const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
 //console.log(toppingsWithCounts);
 return  (
   <ToppingsStyles>
   <Link to="/pizzas">
   <span className="name">All</span>
   <span className="count">{pizzas.nodes.length}</span>
   </Link>
  {toppingsWithCounts.map((topping)  => (
    <Link to={`/topping/${topping.name}`} key={topping.id} className={topping.name
      === activeTopping ? 'active' : ''}>
    <span className="name">{topping.name}</span>
    <span className="count">{topping.count}</span>
    </Link>
  ))}
   </ToppingsStyles>
 );
}
