import Image from 'next/image'
import { client, urlFor } from './lib/Sanity';
import { simpleBlogCard } from './lib/Interface';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from "next/link";
async function getData(){
  const query= `
    *[_type == 'blog'] | order(_createdAt desc){
      title,
        smallDescription,
        "currentSlug":slug.current,
        titleImage
    }`;

    const data= await client.fetch(query);
    return data;
}

export default async function Home() {
  const data: simpleBlogCard[]=await getData();
  console.log(data);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5'>
      {data.map((post,idx)=>(
        <Card key={idx}>
          <Image 
          src={urlFor(post.titleImage).url()} 
          alt=" " 
          width={500} 
          height={500}
          className='rounded-t-lg h-[200px] object-cover'
        />

        <CardContent className='mt-5'>
          <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
          <p className='line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300'>{post.smallDescription}</p>
          <Button asChild className='w-full mt-7'>
            <Link href={`/Blog/${post.currentSlug}`}>Read More</Link>
          </Button> 
        </CardContent>

        </Card>
      ))}
    </div>
    
  )
}
