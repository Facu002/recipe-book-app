'use client'
import Image from 'next/image'
import styles from './categoyList.module.css'
import LogoImg from '../../public/RecipeE-Book-Logo.png'
import Link from 'next/link'
import { app } from '../firebase/firebaseConfing'
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

import swal from 'sweetalert';


async function getCategoryData(props:string) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props}`)
    
    if (!res.ok) {
    throw new Error('Failed to fetch data')
    }
    return res.json()
}

async function getRecipeData(props:string) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props}`)
    
    if (!res.ok) {
    throw new Error('Failed to fetch data')
    }
    return res.json()
}



export default async function page({params}:any) {
    const selectedRecipe = params.category[1]

    const RecipeData = await getRecipeData(selectedRecipe)
    const recipeList = RecipeData.meals
    
    const data = await getCategoryData(params.category[0])
    const dataList = data.meals
    
    const db = getFirestore(app);


    async function addToFavorites(food:any, id:any) {
        
        // setDoc(doc(db, "favoriteFoods", `${id}`), food);
        const docRef = doc(db, "favoriteFoods", `${id}`);
    
        const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // swal("This item is already in your favorites!", "error");
                swal("This item is already in your favorites!","" ,"error");

            } else {
                await setDoc(docRef, food);
                // alert('This item has been added to your favorites!');
                swal("This item has been added to your favorites!","", "success");
            }
    }
    return(
        <>
        {
            selectedRecipe ? 
            
            <>
                <div className={styles.categoryList_page__nav}>
                    <Link href={'../'}>
                        <Image alt='LogoImg' width={100} height={100} src={LogoImg}></Image>
                    </Link>

                    <Link href={'../favorites'} className={styles.toFavorites}>Favorites</Link>
                </div>

                <div className={styles.selectedRecipe_page}>
                
                    <div className={styles.selectedRecipe_box} key={recipeList[0].idMeal}>
                        <div className={styles.recipeInformation}>

                        <div className={styles.recipeTitle}>
                            <Image width={100} height={100} src={recipeList[0].strMealThumb} alt="categoy-box" />

                            <h4>{recipeList[0].strMeal}</h4>

                            <div className={styles.favBtn} onClick={() => addToFavorites(recipeList[0], recipeList[0].idMeal)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.ingredients_container}>
                            <h3>Ingredients</h3>
                            <ul>
                            {Array.from({ length: 20 }, (_, index) => {
                                const ingredient = recipeList[0][`strIngredient${index + 1}`];
                                const qnt = recipeList[0][`strMeasure${index + 1}`]
                                if (ingredient) {
                                    return <li key={index}>{ingredient} - {qnt}</li>;
                                }
                                return null;
                            })}
                            </ul>
                        </div>

                        </div>

                        <div className={styles.instruction_container}>
                            <h3>Recipe</h3>
                            {recipeList[0]?.strInstructions.split('\r\n').map((instruction:any, index:any) => (
                                <p key={index}>{instruction}</p>
                            ))}
                        </div>
                    </div>
                
                </div>
            </>

            :

            <>
                <div className={styles.categoryList_page__nav}>
                    <Link href={'./'}>
                        <Image alt='LogoImg' width={100} height={100} src={LogoImg}></Image>
                    </Link>
                    <h2>{params.category[0]} Recipies</h2>
                </div>

                <div className={styles.categoyList_page}>
                    
                    <div className={styles.categoyList_page_grid}>
                        {dataList.map((food:any) => (
                            <Link href={`./${params.category[0]}/${food.idMeal}`} className={styles.category_box} key={food.idMeal}>
                                <Image width={100} height={100} src={food.strMealThumb} alt="categoy-box" />
                                <div className={styles.box_text_container}>
                                    <h4>{food.strMeal}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>

        }
        </>

    )
}
