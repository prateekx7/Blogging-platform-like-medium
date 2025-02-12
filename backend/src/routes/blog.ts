import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {Hono} from "hono";
import {verify} from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@prateekx7/common";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId: string;
    }
}>();




blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header;
    const response = await verify(token,c.env.JWT_SECRET);
    if(response){
        c.set("userId",String(response.id));
        await next();
    }
    else {
      c.status(403);
      return c.json({message: "unauthorized you are not logged in."});
    }
});




blogRouter.post('/',async (c)=>{
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input not correct"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
    });
    return c.json({id: blog.id});
});
    



blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input not correct"});
    }

    const blog = await prisma.post.update({
        where : { id: body.id },
        data: {
            title: body.title,
            content: body.content,
        },
    });
    return c.json({id: blog.id});
});
    



// to add pagination that is render only certain number of blogs on the main page later on
blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
    return c.json({blog}); 
    
});




blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try{
        const blog = await prisma.post.findFirst({
        where : { id: id },select :{
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }

        }
        });
        return c.json({blog});
    }
    catch(e){
        c.status(403);
        return c.json({error: "error while fetching blog"});
    } 
    
});




      