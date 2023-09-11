import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.css'

async function getData() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function FoodTypeContainer() {
    const data = await getData()
    const dataList = data.categories
    // console.log(data.categories);
    return(
        <div className={styles.category_list_container}>
            <h2>CATEGORIAS</h2>
            <div className={styles.category_list_grid}>
                
                {dataList.map((category:any) => (
                    <Link href={`/${category.strCategory}`} className={styles.category_box} key={category}>
                        <Image width={100} height={100} src={category.strCategoryThumb} alt="categoy-box" />
                        <h4>{category.strCategory}</h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}
