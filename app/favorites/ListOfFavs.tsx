// 'use client'
import Link from "next/link";
import Image from "next/image";
export default function RenderList(props:any) {
    const elements = props.props;
    console.log(elements);

    return(
        <div>
            {elements.map((element:any, index:any) => (
                <>
                {/* <h3 key={index}>{element.strMeal}</h3> */}
                <Link href={`/${element.strCategory}/${element.idMeal}`} key={index}>
                        <Image width={100} height={100} src={element.strMealThumb} alt="categoy-box" />
                        <h4>{element.strMeal}</h4>
                </Link>
                </>
            ))}
        </div>
    );
}