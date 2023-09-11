import FoodTypeContainer from './FoodTypeContainer'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/RecipeE-Book-Logo.png"
          alt="Next.js Logo"
          width={100}
          height={100}
          priority
        />
        <Link href={'/favorites'} className={styles.favBtn_container}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-filled" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFF8E3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" strokeWidth="0" fill="#FFF8E3" />
            </svg>
            <h2>Favorites</h2>
          </Link>
      </div>

      <FoodTypeContainer/>
      
    </main>
  )
}
