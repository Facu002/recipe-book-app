// 'use client'
import Link from "next/link";
import Image from "next/image";
import styles from './favorites.module.css'
export default function RenderList(props:any) {
    const elements = props.props;
    console.log(elements);

    return(
        <div className={styles.ListOfFavs_container}>
            {elements.map((element:any) => (
                <div className={styles.FavoriteRecipe_container}>
                {/* <h3 key={index}>{element.strMeal}</h3> */}
                <Link href={`/${element.strCategory}/${element.idMeal}`} key={element.idMeal}>
                        <Image width={100} height={100} src={element.strMealThumb} alt="categoy-box" />
                        <h4>{element.strMeal}</h4>
                </Link>
                </div>
            ))}
        </div>
    );
}