import Image from 'next/image'
import { client } from './lib/Sanity';

async function getData(){
  const query= `
    *[_type == 'blog'] | order(_createdAt desc){
      title,
        smallDescription,
        "currentSlug":slug.current
    }`;

    const data= await client.fetch(query);
    return data;
}

export default async function Home() {
  const data=await getData();
  console.log(data);
  return (
    <div>
      hello
    </div>
    
  )
}
