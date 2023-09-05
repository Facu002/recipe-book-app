import Image from 'next/image'
import styles from './categoyList.module.css'
import LogoImg from '../../public/RecipeE-Book-Logo.png'
import Link from 'next/link'
async function getData(props:string) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function page({params}:any) {
    const data = await getData(params.category[0])
    let dataList = data.meals
    return(
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
                    <Link href={`./${food.idMeal}`} className={styles.category_box} key={food.idMeal}>
                        <Image width={100} height={100} src={food.strMealThumb} alt="categoy-box" />
                        <div className={styles.box_text_container}>
                            <h4>{food.strMeal}</h4>
                            <div className={styles.favBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </>
    )
};
