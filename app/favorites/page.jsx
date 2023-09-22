'use client'
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfing'
import ListOfFavs from "./ListOfFavs";
import { useState, useEffect } from 'react'; // Uncomment if you want to use state
export default function Page() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "favoriteFoods"));
            const data = querySnapshot.docs.map(doc => doc.data());
            setDataList(data);
            setLoading(false); // Set loading to false when data is fetched
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>HOLAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
            {loading ? ( // Show a loading indicator while data is being fetched
                <p>Loading...</p>
            ) : (
                dataList.length >= 0 ?
                    <ListOfFavs props={dataList} />
                    : <ListOfFavs props={'caca'} />
            )}
        </div>
    )
}