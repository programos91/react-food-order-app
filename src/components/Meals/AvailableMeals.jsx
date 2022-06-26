import React, { useEffect, useState } from 'react';
import axios from 'axios';

import classes from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_FIREBASE_URL}meals.json`).then(response => {
            const responseData = response.data;
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    ...responseData[key],
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        })
        .catch( (err) => {
          setIsLoading(false)
          setHttpError(err.message)
          // throw new Error('Something went wrong')
        })
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if(httpError){
      return <section className={classes.MealsError}>
        <p> {httpError} </p>
      </section>
    }

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
