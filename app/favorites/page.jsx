'use client'
import { collection, getDocs,  doc, deleteDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfing'
import styles from './favorites.module.css'
import { useState, useEffect } from 'react'; 
import Link from "next/link";
import Image from "next/image";
import LogoImg from '../../public/RecipeE-Book-Logo.png'
export default function Page() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true); 

    const db = getFirestore(app);
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "favoriteFoods"));
            const data = querySnapshot.docs.map(doc => doc.data());
            setDataList(data);
            setLoading(false); 
        }

        fetchData();
    }, []);
    async function removeDoc(docId) {
        deleteDoc(doc(db, "favoriteFoods", `${docId}`));
        const querySnapshot = await getDocs(collection(db, "favoriteFoods"));
        const updatedData = querySnapshot.docs.map(doc => doc.data());
        setDataList(updatedData);
    }
    return (
        <div className={styles.favorites_page_container}>
            <div className={styles.categoryList_page__nav}>
                <Link href={'./'}>
                    <Image alt='LogoImg' width={100} height={100} src={LogoImg}></Image>
                </Link>
                <h2>Favorites Recipies</h2>
            </div>
            {loading ? ( 
                <p>Loading recipes...</p>
            ) : (
                dataList.length >= 0 ?
                <div className={styles.ListOfFavs_container}>
                    {dataList.map((element) => (
                        <div className={styles.FavoriteRecipe_container} key={element.idMeal}>
                            <Link href={`/${element.strCategory}/${element.idMeal}`} key={element.idMeal}>
                                    <Image width={100} height={100} src={element.strMealThumb} alt="categoy-box" />
                                    <h4>{element.strMeal}</h4>
                            </Link>
                            
                            <button onClick={()=> removeDoc(element.idMeal)}>
                                <svg xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                    : <div>
                        <h2>There isnt any recipe saved.</h2>
                    </div>
            )}
        </div >
    )
}