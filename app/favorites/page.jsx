'use client'
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfing'
import ListOfFavs from "./ListOfFavs";
import styles from './favorites.module.css'
import { useState, useEffect } from 'react'; 
import Link from "next/link";
import Image from "next/image";
import LogoImg from '../../public/RecipeE-Book-Logo.png'
export default function Page() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "favoriteFoods"));
            const data = querySnapshot.docs.map(doc => doc.data());
            setDataList(data);
            setLoading(false); 
        }

        fetchData();
    }, []);

    return (
        <div className={styles.favorites_page_container}>
            <div className={styles.categoryList_page__nav}>
                <Link href={'./'}>
                    <Image alt='LogoImg' width={100} height={100} src={LogoImg}></Image>
                </Link>
                <h2>Favorites Recipies</h2>
            </div>
            {loading ? ( 
                <p>Loading...</p>
            ) : (
                dataList.length >= 0 ?
                    <ListOfFavs props={dataList} />
                    : null
            )}
        </div >
    )
}