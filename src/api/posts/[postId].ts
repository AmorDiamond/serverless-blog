import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client';
import { Redis } from "@upstash/redis/with-fetch";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case 'GET':
      try {
        // const redis = Redis.fromEnv();
        // let post = await redis.get('post-' + req.params.postId);
        // if (post) {
        //   res.status(200).json(post);
        //   return;
        // }
        // console.log('post', post);
        let post = ''
        if (!post) {
          prisma = new PrismaClient();
          post = await prisma.post.findUnique({
            where: { id: +req.params.postId },
            include: { author: true }
          });
          if (post) {
            res.status(200).json(post);
          } else {
            res.status(404).json({ error: 'Post not found.' });
          }
          // await redis.set('post-' + req.params.postId, JSON.stringify(post));
          await prisma.$disconnect();
        }
      } catch (error) {
        console.log('error', error);
        
        res.status(500).json({ error: '系统出错' })
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' })
  }
}